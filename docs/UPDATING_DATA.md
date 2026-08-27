# Updating League Data

How to pull a new season (or refresh existing seasons) from ESPN and get it onto the deployed site.

The site is static: everything it displays comes from `client/public/data/all_data.json`. Updating data means regenerating that file in `server/` and copying it into the client.

## Overview

```
ESPN API ──(scrape scripts)──▶ server/data/*/ CSVs ──(merge)──▶ server/data/all_data.json
                                                                        │
                                                     copy to client/public/data/ ──▶ push to main ──▶ GitHub Pages
```

## 1. Prerequisites

**ESPN cookies** — the league is private, so the ESPN API needs two auth cookies. To get fresh ones:

1. Log in at [fantasy.espn.com](https://fantasy.espn.com) in your browser.
2. Open DevTools → Application (Chrome) / Storage (Firefox) → Cookies → `https://fantasy.espn.com`.
3. Copy the values of `SWID` (including the curly braces) and `espn_s2`.

Put them in `server/.env`:

```
SWID={XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}
ESPN_S2=AEB...   # long URL-encoded string
```

Cookies expire periodically — if the scrapers fail with auth/401-style errors, grab fresh ones.

**Python environment** — the repo has a venv checked in at `server/ff` with `espn_api`, `pandas`, and `python-dotenv` already installed:

```bash
cd server
source ff/bin/activate
```

## 2. Set the season range

All three scrape scripts hardcode the season range near the top:

```python
season_years = [year for year in range(2009, 2025)]   # = 2009–2024
```

`range` excludes the end value, so **to add the 2025 season, change `2025` → `2026`** in each of:

- `server/scrape_matchups.py`
- `server/scrape_standings.py`
- `server/scrape_teams.py`

The scripts re-scrape every season from scratch and overwrite the output CSVs — there is no incremental mode, so a full run refreshes history and appends the new season in one go.

## 3. Run the scrapers

From `server/` (paths are relative — the scripts must be run from this directory):

```bash
python scrape_matchups.py    # → data/matchups/matchups_all.csv (all weeks, ~16 seasons; takes a few minutes)
python scrape_standings.py   # → data/standings/standings_all.csv
python scrape_teams.py       # → data/teams/teams_all.csv
```

Notes:

- `scrape_matchups.py` tries weeks 1–19 per season; "No matchups for <year> week <n>" messages for late weeks are normal, not errors.
- `scrape_standings.py` derives `champion` / `runner_up` from final standings rank, so only run it **after the season is complete** — mid-season standings would crown the wrong champion.
- Sanity-check the output: the new season should appear at the bottom of the CSVs with the right number of teams/games.

## 4. Merge into all_data.json

The merge step lives in the notebook `server/Untitled1.ipynb`. Either run that notebook top to bottom, or run this equivalent snippet from `server/`:

```python
import pandas as pd, json

df_matchups = pd.read_csv("data/matchups/matchups_all.csv", index_col=False).drop("Unnamed: 0", axis=1).dropna()
matchups_data = df_matchups.to_dict(orient="records")
json.dump(matchups_data, open("data/matchups/matchups_all.json", "w", encoding="utf-8"), ensure_ascii=False, indent=4)

df_standings = pd.read_csv("data/standings/standings_all.csv", index_col=False).drop("Unnamed: 0", axis=1)
del df_standings["logo_url"]
standings_data = df_standings.to_dict(orient="records")
json.dump(standings_data, open("data/standings/standings_all.json", "w", encoding="utf-8"), ensure_ascii=False, indent=4)

all_data = {"matchups": matchups_data, "standings": standings_data}
json.dump(all_data, open("data/all_data.json", "w", encoding="utf-8"), ensure_ascii=False, indent=4)
```

Only `matchups` and `standings` go into `all_data.json` — teams data is scraped but not currently used by the site.

## 5. Copy into the client

The deployed site serves from `client/public/data/`:

```bash
# from the repo root
cp server/data/all_data.json client/public/data/all_data.json

# optional, keeps the copies in sync (site only reads all_data.json)
cp server/data/matchups/matchups_all.* client/public/data/matchups/
cp server/data/standings/standings_all.* client/public/data/standings/
```

## 6. Verify locally, then deploy

```bash
cd client
PORT=3001 npm start
# open http://localhost:3001/ff-assistant/home — check the new season shows in
# the championship timeline, "Years Active", and Team Stats standings
```

Then commit and push to `main`. The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages automatically.

Also update the chatbot's season references if re-enabling it: the tool descriptions in `server/main.py` say "from 2009 to 2024".
