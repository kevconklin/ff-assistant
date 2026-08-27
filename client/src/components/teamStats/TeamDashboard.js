import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import { PageHeader, SectionHeader } from "../layout/PageChrome";
import { computeTeamProfile, computeSeasonStrip, computeRoster } from "../../lib/teamProfile";
import TeamFilter from "./TeamFilter";
import TeamHero from "./TeamHero";
import ScoutingReport from "./ScoutingReport";
import SeasonStrip from "./SeasonStrip";
import RosterGrid from "./RosterGrid";
import TeamStandingsCard from "./TeamStandingsCard";
import TeamMatchupsTable from "./TeamMatchupsTable";

const TeamDashboard = () => {
    const { data, loading } = useDataContext();
    const [selectedTeam, setSelectedTeam] = useState("");

    if (loading || !data?.standings?.length) {
        return (
            <div className="max-w-7xl mx-auto">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-8"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const roster = computeRoster(data.standings);
    const profile = selectedTeam
        ? computeTeamProfile(data.standings, data.matchups, selectedTeam)
        : null;

    return (
        <div className="max-w-7xl mx-auto">
            <PageHeader
                eyebrow="One team at a time"
                title="Team Stats"
                subtitle={
                    selectedTeam
                        ? `${selectedTeam}'s full history — seasons, results, and head-to-head records.`
                        : "Pick an owner to see their full history — seasons, results, and head-to-head records."
                }
            />

            <div className="mb-8">
                <TeamFilter
                    teams={roster.map((t) => t.name)}
                    selectedTeam={selectedTeam}
                    onSelectTeam={setSelectedTeam}
                />
            </div>

            {!profile ? (
                /* The locker room: picking a team is the page */
                <section className="mb-8">
                    <SectionHeader title="The Locker Room" />
                    <RosterGrid roster={roster} onSelectTeam={setSelectedTeam} />
                </section>
            ) : (
                <>
                    <TeamHero profile={profile} />

                    <ScoutingReport teamName={selectedTeam} />

                    <section className="mb-10">
                        <SectionHeader title="Season by Season" />
                        <SeasonStrip seasons={computeSeasonStrip(data.standings, selectedTeam)} />
                    </section>

                    <section className="mb-10">
                        <SectionHeader title="Scoring & Results" />
                        <TeamStandingsCard standings={data.standings} selectedTeam={selectedTeam} />
                    </section>

                    <section className="mb-10">
                        <SectionHeader title="Head to Head" />
                        <TeamMatchupsTable matchups={data.matchups} selectedTeam={selectedTeam} />
                    </section>
                </>
            )}
        </div>
    );
};

export default TeamDashboard;
