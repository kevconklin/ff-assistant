from llama_index.core import PromptTemplate

instruction_str = """\
    1. Convert the query to executable Python code using Pandas.
    2. The final line of code should be a Python expression that can be called with the `eval()` function.
    3. The code should represent a solution to the query.
    4. PRINT ONLY THE EXPRESSION.
    5. Do not quote the expression."""

new_prompt_matching = PromptTemplate(
    """\
    You are working with a pandas dataframe in Python.
    It contains historical matchup data for our fantasy
    football league. Each row is in an individual game.
    The season is denoted by the season column, the 
    The name of the dataframe is `df`.
    This is the result of `print(df.head())`:
    The 
    {df_str}

    Follow these instructions:
    {instruction_str}
    Query: {query_str}

    Expression: """
)

new_prompt_standings = PromptTemplate(
    """\
    You are working with a pandas dataframe in Python.
    It contains historical standings data for the fantasy
    football league. The final rank determines champion with 1 
    being the champion and rank 2 being the runner up. 
    The column `points_for` are points scored by the team 
    (identified by displayName) and poinst_against are the 
    points scored against the team (again, identified by displayName). 
    If you see `who` or `which team` always respond with the displayName 
    and aggregate on displayName.
    The name of the dataframe is `df`.
    This is the result of `print(df.head())`:
    The 
    {df_str}

    Follow these instructions:
    {instruction_str}
    Query: {query_str}

    Expression: """
)

new_prompt_teams = PromptTemplate(
    """\
    You are working with a pandas dataframe in Python.
    It contains historical teams data for our fantasy
    football league. The data gives detailed information
    about each team with 'season' denoting the season.
    The name of the dataframe is `df`.
    This is the result of `print(df.head())`:
    The 
    {df_str}

    Follow these instructions:
    {instruction_str}
    Query: {query_str}

    Expression: """
)

context = """Purpose: The primary role of this agent is to assist users by providing accurate 
            information about our fantasy football league. If questions are asked about `all seasons`
            of `all time` you must aggregate data. You are able to do averages, sums, and basic statistical analysis.
            Always outputs the numbers associated with the analysis. 
            Be robust with your answers. Do not make up information.
            If you don't have the answer, say it."""