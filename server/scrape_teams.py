from espn_api.football import League
from dotenv import load_dotenv
import pandas as pd
import os

load_dotenv() 

# Replace with your league ID and season year
league_id = 400776

season_years = [year for year in range(2009, 2025)]

# Replace with your SWID and espn_s2 values
swid = os.getenv('SWID')
espn_s2 = os.getenv('ESPN_S2')
owners = []

for year in season_years:
    print(f"working on {year}...")
    league = League(league_id=league_id, year=year, espn_s2=espn_s2, swid=swid)

    teams = league.teams
    for team in teams:
        data = {attr: getattr(team, attr) for attr in dir(team) if not attr.startswith('__') and not callable(getattr(team, attr))}
        data['season'] = year
        owners.append(data)
        # print(data)
        
df = pd.DataFrame(owners)
df.to_csv(f'data/teams/teams_all.csv')
