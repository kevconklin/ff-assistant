import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const Top5SeasonsCard = () => {
    const { data } = useDataContext();

    // Sort by highest points_for and get the top 5
    const top5Seasons = [...data.standings]
        .sort((a, b) => b.points_for - a.points_for)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Top Points Total</h4>
            </Card.Header>
            <Card.Body>
                {/* Highlight the top season */}
                {top5Seasons.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-success">Top Season</h5>
                        <h3 className="text-center">
                            <strong>{top5Seasons[0].displayName}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{top5Seasons[0].points_for} points</strong> (
                            {top5Seasons[0].season})
                        </p>
                    </div>
                )}

                {/* List of remaining seasons */}
                <ul className="list-group">
                    {top5Seasons.slice(1).map((team, index) => (
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

export default Top5SeasonsCard;
