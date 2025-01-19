import React from "react";
import { Card } from "react-bootstrap";

const TeamSummaryCard = ({ standings, matchups, selectedTeam }) => {
    if (!selectedTeam) {
        return (
            <Card >
                <Card.Header >
                    <h4 className="text-center">Team Summary</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-center text-muted">Please select a team to view the summary.</p>
                </Card.Body>
            </Card>
        );
    }

    // Filter standings and matchups for the selected team
    const teamStandings = standings.filter((team) => team.displayName === selectedTeam);
    const teamMatchups = matchups.filter(
        (matchup) =>
            matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam
    );

    // Calculate statistics
    const totalTrades = teamStandings.reduce((sum, team) => sum + team.trades, 0);
    const averageTrades = (totalTrades / teamStandings.length).toFixed(2);

    const totalAcquisitions = teamStandings.reduce((sum, team) => sum + team.acquisitions, 0);
    const averageAcquisitions = (totalAcquisitions / teamStandings.length).toFixed(2);

    const totalDrops = teamStandings.reduce((sum, team) => sum + team.drops, 0);
    const averageDrops = (totalDrops / teamStandings.length).toFixed(2);

    const winStreaks = teamStandings
        .filter((team) => team.streak_type === "WIN")
        .map((team) => ({ streak: team.streak_length, season: team.season }));

    const longestWinStreak = winStreaks.reduce(
        (max, streak) => (streak.streak > max.streak ? streak : max),
        { streak: 0, season: "N/A" }
    );

    // Count of Winner's Bracket Playoff Games
    const winnersBracketGames = teamMatchups.filter(
        (matchup) =>
            (matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam) &&
            matchup.matchup_type === "WINNERS_BRACKET"
    ).length;

    // Count of Playoff Appearances (1 per season)
    const playoffSeasons = new Set(
        teamMatchups
            .filter(
                (matchup) =>
                    (matchup.home_owner_displayName === selectedTeam ||
                        matchup.away_owner_displayName === selectedTeam) &&
                    matchup.matchup_type === "WINNERS_BRACKET"
            )
            .map((matchup) => matchup.season)
    );
    const playoffAppearances = playoffSeasons.size;

    return (
        <Card className="h-80 mb-3 shadow-lg">
            <Card.Header>
                <h4 className="text-center"> {selectedTeam} Team Summary</h4>
            </Card.Header>
            <Card.Body>
                <ul className="list-unstyled">
                    <li>
                        <strong>Average Trades:</strong> {averageTrades}
                    </li>
                    <li>
                        <strong>Longest Win Streak:</strong> {longestWinStreak.streak} (Season: {longestWinStreak.season})
                    </li>
                    <li>
                        <strong>Average Acquisitions per Season:</strong> {averageAcquisitions}
                    </li>
                    <li>
                        <strong>Average Drops per Season:</strong> {averageDrops}
                    </li>
                    <li>
                        <strong>Number of Winner's Bracket Playoff Games:</strong> {winnersBracketGames}
                    </li>
                    <li>
                        <strong>Playoff Appearances:</strong> {playoffAppearances}
                    </li>
                </ul>
            </Card.Body>
        </Card>
    );
};

export default TeamSummaryCard;
