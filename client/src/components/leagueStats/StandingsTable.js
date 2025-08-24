import React, { useState } from "react";
import { useDataContext } from "../../DataContext";

const StandingsTable = () => {
    const { data } = useDataContext();
    const [selectedSeason, setSelectedSeason] = useState(2023);

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

    // Get unique seasons for the dropdown
    const seasons = Array.from(new Set(data.standings.map((item) => item.season))).sort((a, b) => b - a);

    // Filter standings by the selected season and sort by final standing
    const filteredStandings = data.standings
        .filter((team) => team.season === Number(selectedSeason))
        .sort((a, b) => a.final_standing - b.final_standing);

    return (
        <div className="card">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Season Standings
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Individual Season
                    </span>
                </div>
                
                {/* Season Filter */}
                <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Season
                    </label>
                    <select
                        value={selectedSeason}
                        onChange={(e) => setSelectedSeason(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        {seasons.map((season) => (
                            <option key={season} value={season}>
                                {season} Season
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                {filteredStandings.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Team
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Record
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Points For
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Points Against
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Differential
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredStandings.map((team, index) => (
                                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {team.final_standing === 1 ? (
                                                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                                        <span className="text-lg">🏆</span>
                                                    </div>
                                                ) : team.final_standing <= 3 ? (
                                                    <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full">
                                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                                            {team.final_standing}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm font-medium text-gray-900 dark:text-white px-3">
                                                        {team.final_standing}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {team.displayName}
                                                    </div>
                                                    {team.champion && (
                                                        <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                                            League Champion
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {team.wins}-{team.losses}
                                            </span>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {((team.wins / (team.wins + team.losses)) * 100).toFixed(1)}% win rate
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {Math.round(team.points_for).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {Math.round(team.points_against).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`text-sm font-medium ${
                                                (team.points_for - team.points_against) > 0 
                                                    ? 'text-green-600 dark:text-green-400' 
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}>
                                                {(team.points_for - team.points_against) > 0 ? '+' : ''}
                                                {Math.round(team.points_for - team.points_against).toLocaleString()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <span className="text-xl">📊</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No data available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            No standings data found for the {selectedSeason} season.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StandingsTable;