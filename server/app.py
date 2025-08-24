from fastapi import FastAPI, HTTPException, Request
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
import json
from main import ask_agent
from pydantic import BaseModel


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://beechf-fantasy.com'],  # Replace "*" with a specific domain for production (e.g., "http://localhost:3000")
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Path to the JSON file
DATA_FILE = Path("data/all_data.json")

def load_json_data():
    """Load JSON data from the file."""
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"File not found: {DATA_FILE}")
    with open(DATA_FILE, "r") as file:
        return json.load(file)


@app.get("/get_data")
async def get_data():
    """
    GET endpoint to retrieve data from the JSON file.
    """
    try:
        data = load_json_data()
        return data
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail="Error decoding JSON file.")

# Define the request body model
class QueryRequest(BaseModel):
    query: str
    
@app.post("/ask_agent")
async def ask_agent_path(request: Request):
    try:
        data = await request.json()
        query = dict(data)['query']
        # Call  the ask_agent function
        response = ask_agent(str(query))
        return {"response": response}
    except Exception as e:
        # Handle errors and return a 500 response if needed
        raise HTTPException(status_code=500, detail=str(e))
    