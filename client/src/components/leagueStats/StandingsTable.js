import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import {
    tableClass,
    theadRowClass,
    thLeft,
    thRight,
    tbodyClass,
    trClass,
    tdLeft,
    tdRight,
    rankClass,
} from "../layout/LedgerTable";

const StandingsTable = () => {
    const { data } = useDataContext();
    const [selectedSeason, setSelectedSeason] = useState(null); // null = latest season

    if (!data?.standings) {
        return (
            <div className="card p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Newest first; default to the latest season
    const seasons = Array.from(new Set(data.standings.map((item) => item.season))).sort((a, b) => b - a);
    const effectiveSeason = selectedSeason ?? seasons[0];

    const filteredStandings = data.standings
        .filter((team) => team.season === Number(effectiveSeason))
        .sort((a, b) => a.final_standing - b.final_standing);

    return (
        <div>
            {/* Toolbar: season picker */}
            <div className="flex items-center gap-3 mb-4">
                <label
                    htmlFor="standings-season"
                    className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400"
                >
                    Season
                </label>
                <select
                    id="standings-season"
                    value={effectiveSeason}
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="pl-3 pr-9 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                    {seasons.map((season) => (
                        <option key={season} value={season}>
                            {season}
                        </option>
                    ))}
                </select>
            </div>

            <div className="card p-6">
                {filteredStandings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className={tableClass}>
                            <thead>
                                <tr className={theadRowClass}>
                                    <th className={thLeft}>Team</th>
                                    <th className={thRight}>Record</th>
                                    <th className={thRight}>Win %</th>
                                    <th className={thRight}>Points For</th>
                                    <th className={thRight}>Points Against</th>
                                    <th className={thRight}>Differential</th>
                                </tr>
                            </thead>
                            <tbody className={tbodyClass}>
                                {filteredStandings.map((team) => {
                                    const diff = team.points_for - team.points_against;
                                    return (
                                        <tr
                                            key={team.displayName}
                                            className={`${trClass} ${team.champion ? "bg-gold-500/10" : ""}`}
                                        >
                                            <td className={tdLeft}>
                                                <span className={rankClass}>{team.final_standing}</span>
                                                <span className="font-medium">{team.displayName}</span>
                                                {team.champion && (
                                                    <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
                                                        ★ Champion
                                                    </span>
                                                )}
                                                {team.runner_up && (
                                                    <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                                        Finalist
                                                    </span>
                                                )}
                                            </td>
                                            <td className={tdRight}>
                                                {team.wins}–{team.losses}
                                                {team.ties > 0 && `–${team.ties}`}
                                            </td>
                                            <td className={tdRight}>
                                                {((team.wins / (team.wins + team.losses + team.ties)) * 100).toFixed(1)}%
                                            </td>
                                            <td className={tdRight}>
                                                {Math.round(team.points_for).toLocaleString()}
                                            </td>
                                            <td className={tdRight}>
                                                {Math.round(team.points_against).toLocaleString()}
                                            </td>
                                            <td className={`${tdRight} font-medium ${
                                                diff > 0
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-red-600 dark:text-red-400"
                                            }`}>
                                                {diff > 0 ? "+" : ""}
                                                {Math.round(diff).toLocaleString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="py-12 text-center text-gray-500 dark:text-gray-400">
                        No standings recorded for the {effectiveSeason} season. Pick another year above.
                    </p>
                )}
            </div>
        </div>
    );
};

export default StandingsTable;
