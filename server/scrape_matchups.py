from espn_api.football import League
from dotenv import load_dotenv
import pandas as pd
import os
import uuid

load_dotenv() 

# Replace with your league ID and season year
league_id = 400776

season_years = [year for year in range(2009, 2025)]

# Replace with your SWID and espn_s2 values
swid = os.getenv('SWID')
espn_s2 = os.getenv('ESPN_S2')
matchups = []

for year in season_years:
    print(f"working on {year}...")
    league = League(league_id=league_id, year=year, espn_s2=espn_s2, swid=swid)
    for week in range(1,20):
        print(f"working on week {str(week)}")
        # game_id = uuid4()
        try:
            scoreboard = league.scoreboard(week)
            for matchup in scoreboard:
                try:
                    data = {attr: getattr(matchup, attr) for attr in dir(matchup) if not attr.startswith('__') and not callable(getattr(matchup, attr))}
                    data['game_id'] = str(uuid.uuid4())
                    # print(data['game_id'])
                    data['home_owner_displayName'] = data['home_team'].owners[0]['displayName']
                    data['home_owner_id'] = data['home_team'].owners[0]['id']
                    data['week'] = week
                    data['season'] = year
                    data['is_tie'] = False
                    data['is_bye'] = False
                    home_score = data['home_score']
                    away_score = data['away_score']
                    try:
                        data['away_owner_displayName'] = data['away_team'].owners[0]['displayName']
                        data['away_owner_id'] = data['away_team'].owners[0]['id']
                    except:
                        print("here in this except...")
                        # print(data)
                        data['away_owner_displayName'] = None
                        data['away_owner_id'] = None
                        data['is_bye'] = True
                        data['point_difference'] = 0
                    if data['is_bye']:
                        data['point_difference'] = 0
                    elif home_score > away_score:
                        data['winner'] = data['home_owner_displayName']
                        data['loser'] = data['away_owner_displayName']
                        data['point_difference'] = home_score - away_score
                    elif home_score < away_score:
                        data['winner'] = data['away_owner_displayName']
                        data['loser'] = data['home_owner_displayName']
                        data['point_difference'] = away_score - home_score
                    else:
                        data['winner'] = None
                        data['loser'] = None
                        data['is_tie'] = True
                        data['point_difference'] = 0
                    matchups.append(data)
                except Exception as e:
                    print("error!", e)
        except Exception as e:
            print(e)
            print(f"No matchups for {year} week {str(week)}")
            pass
            
df = pd.DataFrame(matchups)
df.to_csv(f'data/matchups/matchups_all.csv')
