import pandas as pd
import os
from llama_index.experimental.query_engine import PandasQueryEngine
from prompts import instruction_str, new_prompt_matching, new_prompt_standings, new_prompt_teams, context
from dotenv import load_dotenv
from llama_index.core.tools import QueryEngineTool, ToolMetadata
from llama_index.core.agent import ReActAgent
from llama_index.core.llms import ChatMessage


load_dotenv()

from llama_index.llms.openai import OpenAI

llm = OpenAI(
    model="gpt-4o",
)

matchups_path = os.path.join("data/matchups", "matchups_all.csv")
matchups_df = pd.read_csv(matchups_path)

matchups_query_engine = PandasQueryEngine(
    df=matchups_df, verbose=True, instruction_str=instruction_str, synthesize_response=True, head=20)

matchups_query_engine.update_prompts({"pandas_prompt": new_prompt_matching})
# matchups_query_engine.query("Give me the top 10 teams in wins after the 2015 season")

standings_path = os.path.join("data/standings", "standings_all.csv")
standings_df = pd.read_csv(standings_path)

standings_query_engine = PandasQueryEngine(
    df=standings_df, verbose=True, instruction_str=instruction_str, synthesize_response=True, head=20)

standings_query_engine.update_prompts({"pandas_prompt": new_prompt_standings})

tools = [
    QueryEngineTool(
        query_engine=standings_query_engine,
        metadata=ToolMetadata(
            name="standings_data",
            description=(
                "this gives information about all standings at the end of a given season from 2009 to 2024. "
                "This is where win/loss totals can be found")
        ),
    ),
    QueryEngineTool(
        query_engine=matchups_query_engine,
        metadata=ToolMetadata(
            name="matchups_data",
            description=(
                "this gives detailed information individual matchups in each season from 2009 to 2024."
                "This is where head to head information can be found.")
        ),
    )
]

# llm = OpenAI(model="gpt-3.5-turbo-0613")
agent = ReActAgent.from_tools(
    tools,
    llm=llm,
    context=context,
    max_function_calls=15)

def ask_agent(prompt):
    print("HERE IS THE PROMPT: ", prompt)
    result = agent.chat(prompt)
    return result
# while (prompt := input("Enter a prompt (q to quit): ")) != "q":
#     result = agent.chat(prompt)
#     print(result)



