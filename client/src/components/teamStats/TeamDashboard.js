import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDataContext } from "../../DataContext";
import TeamFilter from "./TeamFilter";
import TeamStandingsCard from "./TeamStandingsCard";
import TeamMatchupsTable from "./TeamMatchupsTable";
import TeamSummaryCard from "./TeamSummaryCard";
import TeamTimelineCard from "./TeamTimelineCard";

const TeamDashboard = () => {
    const { data } = useDataContext();
    const [selectedTeam, setSelectedTeam] = useState("");

    // Get unique team names for the filter dropdown
    const uniqueTeams = Array.from(new Set(data.standings.map((team) => team.displayName)));

    return (
        <>
            <Container fluid className="p-3">
                {/* Top Row: Top5SeasonsCard and Empty Placeholder */}
            {/* Team Filter */}
            <Row className="mb-4">
                <Col>
                    <TeamFilter teams={uniqueTeams} selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
                </Col>
            </Row>

            {/* Dashboard Cards */}
            <Row className="mb-4 align-items-stretch">
                <Col md={8}>
                    <TeamTimelineCard standings={data.standings} selectedTeam={selectedTeam} />
                </Col>
                <Col md={4}>
                    <TeamSummaryCard
                        standings={data.standings}
                        matchups={data.matchups}
                        selectedTeam={selectedTeam}
                    />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <TeamStandingsCard standings={data.standings} selectedTeam={selectedTeam} />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <TeamMatchupsTable uniqueTeams={uniqueTeams} matchups={data.matchups} selectedTeam={selectedTeam} />

                </Col>
            </Row>
            </Container>
        </>
    );
};

export default TeamDashboard;
