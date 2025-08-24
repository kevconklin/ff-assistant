import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import TeamFilter from "./TeamFilter";
import TeamStandingsCard from "./TeamStandingsCard";
import TeamMatchupsTable from "./TeamMatchupsTable";
import TeamSummaryCard from "./TeamSummaryCard";
import TeamTimelineCard from "./TeamTimelineCard";

const TeamDashboard = () => {
    const { data, loading } = useDataContext();
    const [selectedTeam, setSelectedTeam] = useState("");

    if (loading || !data?.standings) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
                    <div className="space-y-8">
                        <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Get unique team names for the filter dropdown
    const uniqueTeams = Array.from(new Set(data.standings.map((team) => team.displayName)));

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    🏈 Team Performance Analysis
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Individual team deep-dive with historical performance, matchup analysis, and key statistics
                </p>
            </div>

            {/* Team Filter */}
            <div className="mb-8">
                <TeamFilter teams={uniqueTeams} selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        📈 Performance Timeline
                    </h2>
                    <TeamTimelineCard standings={data.standings} selectedTeam={selectedTeam} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        📊 Key Statistics
                    </h2>
                    <TeamSummaryCard
                        standings={data.standings}
                        matchups={data.matchups}
                        selectedTeam={selectedTeam}
                    />
                </div>
            </div>

            {/* Season Standings */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    🏆 Historical Standings
                </h2>
                <TeamStandingsCard standings={data.standings} selectedTeam={selectedTeam} />
            </div>

            {/* Matchups Analysis */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    ⚔️ Head-to-Head Analysis
                </h2>
                <TeamMatchupsTable uniqueTeams={uniqueTeams} matchups={data.matchups} selectedTeam={selectedTeam} />
            </div>
        </div>
    );
};

export default TeamDashboard;
