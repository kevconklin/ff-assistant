import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const LargestSingleGameScoreCard = () => {
    const { data } = useDataContext();

    // Sort by highest single-game score
    const highestGameScores = [...data.matchups]
        .flatMap((matchup) => [
            { team: matchup.home_owner_displayName, points: matchup.home_score, season: matchup.season },
            { team: matchup.away_owner_displayName, points: matchup.away_score, season: matchup.season },
        ])
        .sort((a, b) => b.points - a.points)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Most Points (Single Game)</h4>
            </Card.Header>
            <Card.Body>
                {highestGameScores.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-success">Highest Single Game</h5>
                        <h3 className="text-center">
                            <strong>{highestGameScores[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{highestGameScores[0].points} points</strong> (
                            {highestGameScores[0].season})
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {highestGameScores.slice(1).map((score, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{score.team}</strong> ({score.season})
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {score.points} points
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default LargestSingleGameScoreCard;
