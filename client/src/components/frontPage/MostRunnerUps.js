import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const MostRunnerUpsCard = () => {
    const { data } = useDataContext();

    // Aggregate runner-ups by team
    const runnerUpsByTeam = data.standings.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = {
                displayName: team.displayName,
                runnerUps: 0,
            };
        }

        if (team.runner_up) {
            acc[team.displayName].runnerUps += 1;
        }

        return acc;
    }, {});

    // Convert to an array and sort by runner-ups
    const sortedTeams = Object.values(runnerUpsByTeam).sort(
        (a, b) => b.runnerUps - a.runnerUps
    );

    // Get the top 5 teams
    const top5Teams = sortedTeams.slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Most Runner-Ups</h4>
            </Card.Header>
            <Card.Body>
                {/* Highlight the top team */}
                {top5Teams.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-danger">Top Runner-Up</h5>
                        <h3 className="text-center">
                            <strong>{top5Teams[0].displayName}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{top5Teams[0].runnerUps} Runner-Ups</strong>
                        </p>
                    </div>
                )}

                {/* List of remaining top teams */}
                <ul className="list-group">
                    {top5Teams.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.displayName}</strong>
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {team.runnerUps} Runner-Ups
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default MostRunnerUpsCard;
