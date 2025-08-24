import React, { useState } from "react";
import { useDataContext } from "../../DataContext";

const YearRangeAggregator = () => {
    const { data } = useDataContext();
    
    // State hooks must be called before any early returns
    const [startYear, setStartYear] = useState(2009);
    const [endYear, setEndYear] = useState(2024);
    const [sortConfig, setSortConfig] = useState({ key: 'totalPointsFor', direction: "desc" });

    if (!data?.standings) {
        return (
            <div className="card p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="flex gap-4 mb-4">
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Determine min and max years
    const minYear = Math.min(...data.standings.map((team) => team.season));
    const maxYear = Math.max(...data.standings.map((team) => team.season));

    // Filter data by the selected year range
    const filteredData = data.standings.filter(
        (team) => team.season >= startYear && team.season <= endYear
    );

    // Aggregate metrics by displayName
    const aggregatedData = filteredData.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = {
                displayName: team.displayName,
                totalPointsFor: 0,
                totalPointsAgainst: 0,
                totalRanking: 0,
                totalChampionships: 0,
                totalWins: 0,
                totalLosses: 0,
                count: 0,
            };
        }

        acc[team.displayName].totalPointsFor += team.points_for;
        acc[team.displayName].totalPointsAgainst += team.points_against;
        acc[team.displayName].totalRanking += team.final_standing;
        acc[team.displayName].totalChampionships += team.champion ? 1 : 0;
        acc[team.displayName].totalWins += team.wins;
        acc[team.displayName].totalLosses += team.losses;
        acc[team.displayName].count += 1;

        return acc;
    }, {});

    // Convert aggregated data to array for display
    const displayData = Object.values(aggregatedData).map((team) => ({
        ...team,
        averagePointsFor: team.count ? (team.totalPointsFor / team.count).toFixed(1) : 0,
        averagePointsAgainst: team.count ? (team.totalPointsAgainst / team.count).toFixed(1) : 0,
        averageRanking: team.count ? (team.totalRanking / team.count).toFixed(1) : 0,
        winPercentage: team.count ? ((team.totalWins / (team.totalWins + team.totalLosses)) * 100).toFixed(1) : 0,
        pointDifferential: team.totalPointsFor - team.totalPointsAgainst
    }));

    // Sorting logic
    const sortedData = [...displayData].sort((a, b) => {
        const key = sortConfig.key;
        if (!key) return 0;

        if (key === "displayName") {
            return sortConfig.direction === "asc"
                ? a.displayName.localeCompare(b.displayName)
                : b.displayName.localeCompare(a.displayName);
        }

        return sortConfig.direction === "asc"
            ? parseFloat(a[key]) - parseFloat(b[key])
            : parseFloat(b[key]) - parseFloat(a[key]);
    });

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
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Multi-Season Analysis
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        Aggregated Stats
                    </span>
                </div>

                {/* Year Range Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            From Season
                        </label>
                        <select
                            value={startYear}
                            onChange={(e) => setStartYear(Number(e.target.value))}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(
                                (year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            To Season
                        </label>
                        <select
                            value={endYear}
                            onChange={(e) => setEndYear(Number(e.target.value))}
                            className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(
                                (year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            )}
                        </select>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Seasons</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {endYear - startYear + 1}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Teams</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {sortedData.length}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total Games</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {sortedData.reduce((sum, team) => sum + team.totalWins + team.totalLosses, 0)}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Championships</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {sortedData.reduce((sum, team) => sum + team.totalChampionships, 0)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th 
                                    onClick={() => handleSort("displayName")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Team</span>
                                        {getSortIcon("displayName")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("totalPointsFor")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Total PF</span>
                                        {getSortIcon("totalPointsFor")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("averagePointsFor")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Avg PF</span>
                                        {getSortIcon("averagePointsFor")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("pointDifferential")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Differential</span>
                                        {getSortIcon("pointDifferential")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("totalWins")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Wins</span>
                                        {getSortIcon("totalWins")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("winPercentage")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Win %</span>
                                        {getSortIcon("winPercentage")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("averageRanking")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Avg Rank</span>
                                        {getSortIcon("averageRanking")}
                                    </div>
                                </th>
                                <th 
                                    onClick={() => handleSort("totalChampionships")} 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Titles</span>
                                        {getSortIcon("totalChampionships")}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {sortedData.map((team, index) => (
                                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full mr-3">
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                    {index + 1}
                                                </span>
                                            </div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {team.displayName}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white font-medium">
                                        {Math.round(team.totalPointsFor).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {team.averagePointsFor}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-medium ${
                                            team.pointDifferential > 0 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-red-600 dark:text-red-400'
                                        }`}>
                                            {team.pointDifferential > 0 ? '+' : ''}
                                            {Math.round(team.pointDifferential).toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            {team.totalWins}-{team.totalLosses}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            {team.winPercentage}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        {team.averageRanking}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {team.totalChampionships > 0 && (
                                                <span className="text-lg mr-1">🏆</span>
                                            )}
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                {team.totalChampionships}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default YearRangeAggregator;