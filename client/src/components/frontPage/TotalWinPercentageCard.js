import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const TotalWinPercentageCard = () => {
    const { data } = useDataContext();

    // Calculate win percentage across all seasons
    const winPercentages = data.standings.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = { wins: 0, games: 0 };
        }
        acc[team.displayName].wins += team.wins;
        acc[team.displayName].games += team.wins + team.losses + team.ties;
        return acc;
    }, {});

    const sortedTeams = Object.entries(winPercentages)
        .map(([team, stats]) => ({
            team,
            winPercentage: (stats.wins / stats.games) * 100,
        }))
        .sort((a, b) => b.winPercentage - a.winPercentage)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Total Win Percentage</h4>
            </Card.Header>
            <Card.Body>
                {sortedTeams.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-success">Top Team</h5>
                        <h3 className="text-center">
                            <strong>{sortedTeams[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{sortedTeams[0].winPercentage.toFixed(2)}%</strong> win rate
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {sortedTeams.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.team}</strong>
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {team.winPercentage.toFixed(2)}%
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default TotalWinPercentageCard;
