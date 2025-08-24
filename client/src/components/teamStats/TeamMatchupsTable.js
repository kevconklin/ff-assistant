import React, { useState } from "react";

const TeamMatchupsTable = ({ matchups, selectedTeam }) => {
    const [opponentFilter, setOpponentFilter] = useState(""); // Filter state
    const [sortConfig, setSortConfig] = useState({ key: "wins", direction: "desc" }); // Sorting state

    if (!selectedTeam) {
        return (
            <div className="card">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Head-to-Head Matchups
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Analysis
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Win-loss records and margins against each opponent
                    </p>
                </div>
                <div className="p-6 text-center py-12">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                        <span className="text-xl">⚔️</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Select a Team
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Choose a team to view their head-to-head matchup statistics.
                    </p>
                </div>
            </div>
        );
    }

    // Filter matchups for the selected team
    const filteredMatchups = matchups.filter(
        (matchup) =>
            matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam
    );

    // Aggregate data by opponent
    const matchupStats = filteredMatchups.reduce((acc, matchup) => {
        const opponent =
            matchup.home_owner_displayName === selectedTeam
                ? matchup.away_owner_displayName
                : matchup.home_owner_displayName;

        if (!acc[opponent]) {
            acc[opponent] = {
                opponent,
                wins: 0,
                losses: 0,
                totalWinMargin: 0,
                totalLossMargin: 0,
                games: 0,
            };
        }

        const isWin = matchup.winner === selectedTeam;

        if (isWin) {
            acc[opponent].wins += 1;
            acc[opponent].totalWinMargin += Math.abs(matchup.point_difference);
        } else {
            acc[opponent].losses += 1;
            acc[opponent].totalLossMargin += Math.abs(matchup.point_difference);
        }

        acc[opponent].games += 1;

        return acc;
    }, {});

    // Prepare table data
    const tableData = Object.values(matchupStats).map((opponent) => ({
        opponent: opponent.opponent,
        wins: opponent.wins,
        losses: opponent.losses,
        games: opponent.games,
        avgWinMargin: opponent.wins > 0 ? (opponent.totalWinMargin / opponent.wins).toFixed(2) : "N/A",
        avgLossMargin: opponent.losses > 0 ? (opponent.totalLossMargin / opponent.losses).toFixed(2) : "N/A",
    }));

    // Filter rows based on opponentFilter
    const filteredTableData = tableData.filter((row) =>
        row.opponent && row.opponent.toLowerCase().includes(opponentFilter.toLowerCase())
);

    // Handle sorting
    const sortedTableData = [...filteredTableData].sort((a, b) => {
        if (sortConfig.direction === "asc") {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    // Update sort configuration
    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey) {
            return <span className="text-gray-400">⇅</span>;
        }
        return sortConfig.direction === 'asc' ? (
            <span className="text-blue-500">↑</span>
        ) : (
            <span className="text-blue-500">↓</span>
        );
    };

    return (
        <div className="card">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedTeam} Head-to-Head Analysis
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                        Matchups
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Historical performance against each opponent with win-loss records and scoring margins
                </p>
            </div>
            
            <div className="p-6">
                {/* Opponent Filter */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Filter by Opponent
                    </label>
                    <input
                        type="text"
                        placeholder="Enter opponent name..."
                        value={opponentFilter}
                        onChange={(e) => setOpponentFilter(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                </div>

                {/* Matchups Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Opponent
                                </th>
                                <th 
                                    onClick={() => handleSort("wins")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Wins</span>
                                        {getSortIcon("wins")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("losses")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Losses</span>
                                        {getSortIcon("losses")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("games")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Total Games</span>
                                        {getSortIcon("games")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("avgWinMargin")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Avg Win Margin</span>
                                        {getSortIcon("avgWinMargin")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("avgLossMargin")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Avg Loss Margin</span>
                                        {getSortIcon("avgLossMargin")}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {sortedTableData.length > 0 ? (
                                sortedTableData.map((row, index) => {
                                    const winPercentage = ((row.wins / row.games) * 100).toFixed(1);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full mr-3">
                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {row.opponent}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                                    {row.wins}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                                    {row.losses}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-white">
                                                    {row.games}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {winPercentage}% win rate
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${
                                                    row.avgWinMargin !== "N/A" 
                                                        ? 'text-green-600 dark:text-green-400' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {row.avgWinMargin !== "N/A" ? `+${row.avgWinMargin}` : row.avgWinMargin}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${
                                                    row.avgLossMargin !== "N/A" 
                                                        ? 'text-red-600 dark:text-red-400' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                }`}>
                                                    {row.avgLossMargin !== "N/A" ? `-${row.avgLossMargin}` : row.avgLossMargin}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                                            <span className="text-xl">🔍</span>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            No matches found
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            No opponents match the current filter.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {sortedTableData.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Total opponents analyzed</span>
                            <span className="font-medium">{sortedTableData.length}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamMatchupsTable;
