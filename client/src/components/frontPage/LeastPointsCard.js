import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const LeastPointsCard = () => {
    const { data } = useDataContext();

    // Sort by lowest points_for and get the bottom 10
    const leastPointsSeasons = [...data.standings]
        .sort((a, b) => a.points_for - b.points_for)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Least Points in a Season</h4>
            </Card.Header>
            <Card.Body>
                {/* Highlight the lowest season */}
                {leastPointsSeasons.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-danger">Lowest Scoring Season</h5>
                        <h3 className="text-center">
                            <strong>{leastPointsSeasons[0].displayName}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{leastPointsSeasons[0].points_for} points</strong> (
                            {leastPointsSeasons[0].season})
                        </p>
                    </div>
                )}

                {/* List of remaining seasons */}
                <ul className="list-group">
                    {leastPointsSeasons.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.displayName}</strong> ({team.season})
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {team.points_for} points
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default LeastPointsCard;
