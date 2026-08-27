# Server

Data scrapers and (currently disabled) chatbot backend for the Beech F Fantasy site.

## Contents

- `scrape_matchups.py` / `scrape_standings.py` / `scrape_teams.py` — pull league history from the ESPN API into `data/`. See [docs/UPDATING_DATA.md](../docs/UPDATING_DATA.md) for the full data-update walkthrough (cookies, season range, merge, deploy).
- `Untitled1.ipynb` — merges the scraped CSVs into `data/all_data.json`, the file the site serves.
- `app.py` / `main.py` / `prompts.py` — FastAPI + LlamaIndex ReAct agent chatbot. Not deployed; the site runs in static mode with the chat endpoint disabled in `client/src/apiEndpoints.js`.
- `ff/` — Python venv with `espn_api`, `pandas`, `python-dotenv`, and the llama-index stack installed (`source ff/bin/activate`).

## Environment

Create `server/.env` with:

```
SWID={...}          # ESPN auth cookie (scrapers)
ESPN_S2=...         # ESPN auth cookie (scrapers)
OPENAI_API_KEY=...  # only needed for the chatbot
```

## Running the chatbot locally

```bash
source ff/bin/activate
uvicorn app:app --port 8000
```

Endpoints: `GET /get_data`, `POST /ask_agent` (`{"query": "..."}`). CORS is locked to `https://beechf-fantasy.com`.

## TODO

- Add streak information back to standings
