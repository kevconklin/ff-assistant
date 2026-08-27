# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A fantasy football league stats site ("Beech F Fantasy") for an ESPN league (league_id 400776, seasons 2009–2024). Two parts:

- `client/` — Create React App (React 19, react-router 7, Tailwind + react-bootstrap, recharts). This is the deployed product.
- `server/` — FastAPI + LlamaIndex chatbot backend and ESPN data scrapers. **Not deployed currently** — the site runs in static mode.

## Commands

All client work happens in `client/`:

```bash
cd client
npm start                        # dev server on :3000
npm run build                    # production build
npm test                         # jest watch mode
npm test -- --watchAll=false     # single run
npm test -- App.test.js          # single test file
```

There is no lint script; CRA surfaces eslint (react-app config) warnings during start/build.

Server (only needed for chatbot work):

```bash
cd server
source ff/bin/activate           # venv checked into server/ff
uvicorn app:app --port 8000
```

Requires a `server/.env` with `OPENAI_API_KEY` (agent), and `SWID` + `ESPN_S2` (scrapers).

## Architecture

### Static-data mode (current production setup)

The client does **not** call the backend. `client/src/apiEndpoints.js` points `GET_DATA_ENDPOINT` at `PUBLIC_URL + "/data/all_data.json"`, a static file in `client/public/data/`. The chat endpoint is commented out there, so `components/chatBot/ChatBot.js` is effectively disabled. If re-enabling the backend, that file is the switch.

Data flow in the client: `FetchData.js` fetches `all_data.json` once at mount and stores it in a global React context (`DataContext.js`). All page components read `{ matchups, standings }` from `useDataContext()` — there is no other data fetching. Pages: `components/frontPage/` (stat cards), `components/leagueStats/`, `components/teamStats/`.

### Deployment: GitHub Pages + custom domain

The site deploys to GitHub Pages at **https://chadhines.app** (custom domain, site served at the domain root). The pieces that must stay in sync:

- `homepage: "https://chadhines.app"` in `client/package.json` — CRA derives `PUBLIC_URL` from this (the workflow sets no PUBLIC_URL override)
- `<Router>` in `client/src/App.js` has **no basename** — the app lives at the root
- The custom domain is set in the repo's GitHub Pages settings (API `cname` field), and DNS (four `185.199.x.153` A records + `www` CNAME) is managed in Vercel DNS, where the domain is registered

The workflow builds and deploys on push to `main` (and `feature/refactor`). `kevconklin.github.io/ff-assistant` redirects to the custom domain. Docker/nginx files in `client/` and `server/` are from an earlier self-hosted setup and are not part of the Pages deployment.

### Data pipeline (updating league data)

Full walkthrough in `docs/UPDATING_DATA.md`. In short:

1. `server/scrape_matchups.py` / `scrape_standings.py` / `scrape_teams.py` pull from the ESPN API (`espn_api` package, needs SWID/ESPN_S2 cookies) and write CSVs to `server/data/{matchups,standings,teams}/`. The season range is hardcoded in each script (`range(2009, N)`) — bump it to add a season.
2. The notebook `server/Untitled1.ipynb` merges matchups + standings into `server/data/all_data.json`.
3. Copy `all_data.json` into `client/public/data/` — that's what the deployed site actually serves — and push to `main` to deploy.

### Chatbot backend (server/)

`app.py` (FastAPI) exposes `/get_data` and `/ask_agent`. `main.py` builds a LlamaIndex `ReActAgent` (OpenAI gpt-4o) with two `PandasQueryEngine` tools over `data/matchups/matchups_all.csv` and `data/standings/standings_all.csv`; prompts live in `prompts.py`. CORS is locked to `https://beechf-fantasy.com`.
