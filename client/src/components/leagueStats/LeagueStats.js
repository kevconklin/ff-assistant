import React from "react";
import YearRangeAggregator from "./YearRangeAggregator";
import StandingsTable from "./StandingsTable";
import { PageHeader, SectionHeader } from "../layout/PageChrome";
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
            <PageHeader
                eyebrow="Across the seasons"
                title="League Stats"
                subtitle="Compare any stretch of seasons, then drill into a single year's standings."
            />

            {/* Multi-Season Analysis */}
            <div className="mb-8">
                <SectionHeader title="Historical Performance" />
                <YearRangeAggregator />
            </div>

            {/* Single Season View */}
            <div className="mb-8">
                <SectionHeader title="Season by Season" />
                <StandingsTable />
            </div>
        </div>
    );
};

export default LeagueStats;
