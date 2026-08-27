import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import {
    tableClass,
    theadRowClass,
    tbodyClass,
    trClass,
    tdLeft,
    tdRight,
    rankClass,
    SortableTh,
} from "../layout/LedgerTable";

const YearRangeAggregator = () => {
    const { data } = useDataContext();
    
    // State hooks must be called before any early returns
    const [startYear, setStartYear] = useState(2009);
    const [endYear, setEndYear] = useState(null); // null = latest season in the data
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
    const effectiveEndYear = endYear ?? maxYear;

    // Filter data by the selected year range
    const filteredData = data.standings.filter(
        (team) => team.season >= startYear && team.season <= effectiveEndYear
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


    const yearOptions = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    // Count games from matchups (one row per game, playoffs included) —
    // summing standings wins+losses would count every game twice.
    const totalGames = (data.matchups || []).filter(
        (m) => m.season >= startYear && m.season <= effectiveEndYear
    ).length;
    const totalChampionships = sortedData.reduce((sum, team) => sum + team.totalChampionships, 0);

    const selectClass =
        "pl-3 pr-9 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white";

    return (
        <div>
            {/* Toolbar: season range + a one-line summary of what's selected */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
                <div className="flex items-center gap-3">
                    <label
                        htmlFor="from-season"
                        className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400"
                    >
                        From
                    </label>
                    <select
                        id="from-season"
                        value={startYear}
                        onChange={(e) => setStartYear(Number(e.target.value))}
                        className={selectClass}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <label
                        htmlFor="to-season"
                        className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400"
                    >
                        To
                    </label>
                    <select
                        id="to-season"
                        value={effectiveEndYear}
                        onChange={(e) => setEndYear(Number(e.target.value))}
                        className={selectClass}
                    >
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {effectiveEndYear - startYear + 1} seasons · {sortedData.length} teams · {totalGames.toLocaleString()} games · {totalChampionships} championships
                </p>
            </div>

            {/* Content */}
            <div className="card p-6">
                <div className="overflow-x-auto">
                    <table className={tableClass}>
                        <thead>
                            <tr className={theadRowClass}>
                                <SortableTh label="Team" columnKey="displayName" sortConfig={sortConfig} onSort={handleSort} align="left" />
                                <SortableTh label="Total PF" columnKey="totalPointsFor" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Avg PF" columnKey="averagePointsFor" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Differential" columnKey="pointDifferential" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Record" columnKey="totalWins" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Win %" columnKey="winPercentage" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Avg Rank" columnKey="averageRanking" sortConfig={sortConfig} onSort={handleSort} />
                                <SortableTh label="Titles" columnKey="totalChampionships" sortConfig={sortConfig} onSort={handleSort} />
                            </tr>
                        </thead>
                        <tbody className={tbodyClass}>
                            {sortedData.map((team, index) => (
                                <tr key={team.displayName} className={trClass}>
                                    <td className={tdLeft}>
                                        <span className={rankClass}>{index + 1}</span>
                                        <span className="font-medium">{team.displayName}</span>
                                    </td>
                                    <td className={`${tdRight} font-medium`}>
                                        {Math.round(team.totalPointsFor).toLocaleString()}
                                    </td>
                                    <td className={tdRight}>{team.averagePointsFor}</td>
                                    <td className={`${tdRight} font-medium ${
                                        team.pointDifferential > 0
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-600 dark:text-red-400"
                                    }`}>
                                        {team.pointDifferential > 0 ? "+" : ""}
                                        {Math.round(team.pointDifferential).toLocaleString()}
                                    </td>
                                    <td className={tdRight}>
                                        {team.totalWins}–{team.totalLosses}
                                    </td>
                                    <td className={tdRight}>{team.winPercentage}%</td>
                                    <td className={tdRight}>{team.averageRanking}</td>
                                    <td className={tdRight}>
                                        {team.totalChampionships > 0 ? (
                                            <span className="text-gold-600 dark:text-gold-400 font-medium">
                                                ★ {team.totalChampionships}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">0</span>
                                        )}
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