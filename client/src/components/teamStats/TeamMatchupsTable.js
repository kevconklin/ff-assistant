import React, { useState } from "react";
import {
    tableClass,
    theadRowClass,
    thLeft,
    tbodyClass,
    trClass,
    tdLeft,
    tdRight,
    rankClass,
    SortableTh,
} from "../layout/LedgerTable";

const TeamMatchupsTable = ({ matchups, selectedTeam }) => {
    const [opponentFilter, setOpponentFilter] = useState(""); // Filter state
    const [sortConfig, setSortConfig] = useState({ key: "wins", direction: "desc" }); // Sorting state

    if (!selectedTeam) return null;

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
                ties: 0,
                totalWinMargin: 0,
                totalLossMargin: 0,
                games: 0,
            };
        }

        // winner is null when the game ended level on starter points — count
        // it as a tie, not a loss
        if (matchup.winner === selectedTeam) {
            acc[opponent].wins += 1;
            acc[opponent].totalWinMargin += Math.abs(matchup.point_difference);
        } else if (matchup.loser === selectedTeam) {
            acc[opponent].losses += 1;
            acc[opponent].totalLossMargin += Math.abs(matchup.point_difference);
        } else {
            acc[opponent].ties += 1;
        }

        acc[opponent].games += 1;

        return acc;
    }, {});

    // Prepare table data
    const tableData = Object.values(matchupStats).map((opponent) => ({
        opponent: opponent.opponent,
        wins: opponent.wins,
        losses: opponent.losses,
        ties: opponent.ties,
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


    return (
        <div>
            {/* Opponent Filter */}
            <div className="mb-4 max-w-xs">
                <label htmlFor="opponent-filter" className="sr-only">
                    Filter by opponent
                </label>
                <input
                    id="opponent-filter"
                    type="text"
                    placeholder="Filter opponents"
                    value={opponentFilter}
                    onChange={(e) => setOpponentFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
            </div>

            <div className="card p-6">
                {/* Matchups Table */}
                <div className="overflow-x-auto">
                    <table className={tableClass}>
                        <thead>
                            <tr className={theadRowClass}>
                                <th className={thLeft}>Opponent</th>
                                <SortableTh label="Wins" columnKey="wins" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Losses" columnKey="losses" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Games" columnKey="games" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Avg Win Margin" columnKey="avgWinMargin" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Avg Loss Margin" columnKey="avgLossMargin" sortConfig={sortConfig} onSort={handleSort} />
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {sortedTableData.length > 0 ? (
                                sortedTableData.map((row, index) => {
                                    const winPercentage = ((row.wins / row.games) * 100).toFixed(1);
                                    return (
                                        <tr key={row.opponent} className={trClass}>
                                            <td className={tdLeft}>
                                                <span className={rankClass}>{index + 1}</span>
                                                <span className="font-medium">{row.opponent}</span>
                                            </td>
                                            <td className={`${tdRight} font-medium text-green-600 dark:text-green-400`}>
                                                {row.wins}
                                            </td>
                                            <td className={`${tdRight} font-medium text-red-600 dark:text-red-400`}>
                                                {row.losses}
                                            </td>
                                            <td className={tdRight}>
                                                {row.games}
                                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                                    {winPercentage}% win rate
                                                    {row.ties > 0 && ` · ${row.ties} tie${row.ties > 1 ? "s" : ""}`}
                                                </span>
                                            </td>
                                            <td className={`${tdRight} ${
                                                row.avgWinMargin !== "N/A"
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-gray-400"
                                            }`}>
                                                {row.avgWinMargin !== "N/A" ? `+${row.avgWinMargin}` : "—"}
                                            </td>
                                            <td className={`${tdRight} ${
                                                row.avgLossMargin !== "N/A"
                                                    ? "text-red-600 dark:text-red-400"
                                                    : "text-gray-400"
                                            }`}>
                                                {row.avgLossMargin !== "N/A" ? `-${row.avgLossMargin}` : "—"}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-4 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No opponents match the current filter. Clear it to see every matchup.
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
