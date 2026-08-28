"""Merge scraped CSVs into the JSON files the site serves.

Replaces the old Untitled1.ipynb merge. Key difference: only bye rows are
dropped. Tie games (equal scores, winner/loser null) are kept — the old
blanket dropna() silently deleted 14 real games. Null winner means the
matchup ended level on starter points; official W/L for those games lives
in the standings (ESPN breaks regular-season ties by tiebreaker in modern
seasons; 2009/2011/2013 recorded true ties).
"""
import json

import numpy as np
import pandas as pd


def write_json(records, path):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=4)


def to_records(df):
    # NaN -> None so the output is valid JSON (json.dump would emit bare NaN)
    return df.replace({np.nan: None}).to_dict(orient="records")


def main():
    matchups = pd.read_csv("data/matchups/matchups_all.csv", index_col=False).drop("Unnamed: 0", axis=1)
    before = len(matchups)
    matchups = matchups[~matchups["is_bye"]]
    print(f"matchups: {before} rows -> {len(matchups)} after dropping byes "
          f"({int(matchups['winner'].isna().sum())} tie/no-decision games kept)")
    matchups_data = to_records(matchups)
    write_json(matchups_data, "data/matchups/matchups_all.json")

    standings = pd.read_csv("data/standings/standings_all.csv", index_col=False).drop("Unnamed: 0", axis=1)
    del standings["logo_url"]
    standings_data = to_records(standings)
    write_json(standings_data, "data/standings/standings_all.json")

    teams = pd.read_csv("data/teams/teams_all.csv", index_col=False)
    write_json(to_records(teams), "data/teams/teams_all.json")

    write_json({"matchups": matchups_data, "standings": standings_data}, "data/all_data.json")
    print(f"all_data.json: {len(matchups_data)} matchups, {len(standings_data)} standings rows")


if __name__ == "__main__":
    main()
