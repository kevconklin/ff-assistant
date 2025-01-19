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

all_standings = []
for year in season_years:
    print(f"working on {year}...")
    league = League(league_id=league_id, year=year, espn_s2=espn_s2, swid=swid)

    standings = league.standings()
    for rank, team in enumerate(standings, start=1):
        # rank = rank+1
        data = {attr: getattr(team, attr) for attr in dir(team) if not attr.startswith('__') and not callable(getattr(team, attr))}
        # print(data)
        display_name = data['owners'][0]['displayName']
        data['season'] = year
        data['rank'] = rank
        print(rank)
        if data['rank'] == 1:
            print("champ:", data)
            data['champion'] = True
        else:
            data['champion'] = False
            
        if data['rank'] == 2:
            data['runner_up'] = True
        else: 
            data['runner_up'] = False
        data['displayName'] = display_name
        all_standings.append(data)
        
df = pd.DataFrame(all_standings)
df.to_csv(f'data/standings/standings_all.csv')
