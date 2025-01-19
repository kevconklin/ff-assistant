import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const MostPointsTotalCard = () => {
    const { data } = useDataContext();

    // Calculate total points for each team
    const totalPoints = data.standings.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = 0;
        }
        acc[team.displayName] += team.points_for;
        return acc;
    }, {});

    const sortedTeams = Object.entries(totalPoints)
        .map(([team, points]) => ({ team, points }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Most Points (All Time)</h4>
            </Card.Header>
            <Card.Body>
                {sortedTeams.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-info">Top Scorer</h5>
                        <h3 className="text-center">
                            <strong>{sortedTeams[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{sortedTeams[0].points} points</strong> total
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
                                {team.points} points
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default MostPointsTotalCard;
