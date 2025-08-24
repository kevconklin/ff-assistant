import React from "react";

const TeamSummaryCard = ({ standings, matchups, selectedTeam }) => {
    if (!selectedTeam) {
        return (
            <div className="card h-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Team Summary
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Statistics
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Key performance metrics and achievements
                    </p>
                </div>
                <div className="p-6 flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <span className="text-xl">🏈</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Select a Team
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Choose a team to view their detailed statistics and performance summary.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Filter standings and matchups for the selected team
    const teamStandings = standings.filter((team) => team.displayName === selectedTeam);
    const teamMatchups = matchups.filter(
        (matchup) =>
            matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam
    );

    // Calculate statistics
    const totalTrades = teamStandings.reduce((sum, team) => sum + team.trades, 0);
    const averageTrades = (totalTrades / teamStandings.length).toFixed(2);

    const totalAcquisitions = teamStandings.reduce((sum, team) => sum + team.acquisitions, 0);
    const averageAcquisitions = (totalAcquisitions / teamStandings.length).toFixed(2);

    const totalDrops = teamStandings.reduce((sum, team) => sum + team.drops, 0);
    const averageDrops = (totalDrops / teamStandings.length).toFixed(2);

    const winStreaks = teamStandings
        .filter((team) => team.streak_type === "WIN")
        .map((team) => ({ streak: team.streak_length, season: team.season }));

    const longestWinStreak = winStreaks.reduce(
        (max, streak) => (streak.streak > max.streak ? streak : max),
        { streak: 0, season: "N/A" }
    );

    // Count of Winner's Bracket Playoff Games
    const winnersBracketGames = teamMatchups.filter(
        (matchup) =>
            (matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam) &&
            matchup.matchup_type === "WINNERS_BRACKET"
    ).length;

    // Count of Playoff Appearances (1 per season)
    const playoffSeasons = new Set(
        teamMatchups
            .filter(
                (matchup) =>
                    (matchup.home_owner_displayName === selectedTeam ||
                        matchup.away_owner_displayName === selectedTeam) &&
                    matchup.matchup_type === "WINNERS_BRACKET"
            )
            .map((matchup) => matchup.season)
    );
    const playoffAppearances = playoffSeasons.size;

    return (
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedTeam} Summary
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Key Stats
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Historical performance metrics and achievements
                </p>
            </div>
            
            <div className="p-6">
                <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                </svg>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Longest Win Streak</span>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {longestWinStreak.streak} games
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    Season {longestWinStreak.season}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Trades</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {averageTrades}
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <svg className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Acquisitions</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {averageAcquisitions}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <svg className="w-4 h-4 text-red-600 dark:text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Drops</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {averageDrops}
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                            <div className="flex items-center mb-2">
                                <svg className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Playoff Apps</span>
                            </div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {playoffAppearances}
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Winner's Bracket Games</span>
                            </div>
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                {winnersBracketGames}
                            </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Total playoff games in winner's bracket
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSummaryCard;
