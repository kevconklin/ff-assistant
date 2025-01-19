import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const WorstPointDifferentialCard = () => {
    const { data } = useDataContext();

    // Calculate point differentials for each team
    const pointDifferentials = data.standings.map((team) => ({
        team: team.displayName,
        differential: team.points_for - team.points_against,
        season: team.season,
    }));

    const sortedDifferentials = pointDifferentials.sort((a, b) => a.differential - b.differential).slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Worst Point Differential</h4>
            </Card.Header>
            <Card.Body>
                {sortedDifferentials.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-danger">Worst Season</h5>
                        <h3 className="text-center">
                            <strong>{sortedDifferentials[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{sortedDifferentials[0].differential} points</strong> (
                            {sortedDifferentials[0].season})
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {sortedDifferentials.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.team}</strong> ({team.season})
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {team.differential} points
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default WorstPointDifferentialCard;
