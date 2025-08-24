import React from "react";
import YearRangeAggregator from "./YearRangeAggregator";
import StandingsTable from "./StandingsTable";
import { useDataContext } from "../../DataContext";

const LeagueStats = () => {
    const { data } = useDataContext();

    if (!data) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
                    <div className="space-y-8">
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    📊 League Statistics Analysis
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Detailed performance analytics across seasons with historical comparisons and rankings
                </p>
            </div>

            {/* Multi-Season Analysis */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    📈 Historical Performance Analysis
                </h2>
                <YearRangeAggregator />
            </div>

            {/* Single Season View */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    🏆 Season-by-Season Breakdown
                </h2>
                <StandingsTable />
            </div>
        </div>
    );
};

export default LeagueStats;
