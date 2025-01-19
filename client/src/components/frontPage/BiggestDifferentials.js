import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const BiggestDifferentialsCard = () => {
    const { data } = useDataContext();

    // Sort matchups by the largest point difference and take the top 20
    const topDifferentials = [...data.matchups]
        .sort((a, b) => b.point_difference - a.point_difference)
        .slice(0, 5);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Biggest Blowouts</h4>
            </Card.Header>
            <Card.Body>
                <ul className="list-group">
                    {topDifferentials.map((matchup, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex flex-column align-items-start"
                        >
                            <div>
                                <span className="fw-bold">
                                    Season {matchup.season}:
                                </span>{" "}
                                {matchup.winner === matchup.home_owner_displayName ? (
                                    <>
                                        <span className="text-success fw-bold">{matchup.home_owner_displayName}</span>{" "}
                                        (Home: {matchup.home_score}) defeated{" "}
                                        <span>{matchup.away_owner_displayName}</span>{" "}
                                        (Away: {matchup.away_score})
                                    </>
                                ) : (
                                    <>
                                        <span className="text-success fw-bold">{matchup.away_owner_displayName}</span>{" "}
                                        (Away: {matchup.away_score}) defeated{" "}
                                        <span>{matchup.home_owner_displayName}</span>{" "}
                                        (Home: {matchup.home_score})
                                    </>
                                )}
                            </div>
                            <div>
                                <span className="text-muted">Point Difference: </span>
                                <span className="fw-bold">{matchup.point_difference}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default BiggestDifferentialsCard;
