import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const BestWinPercentageCard = () => {
    const { data } = useDataContext();

    // Calculate win percentage for each team
    const teamsWithWinPercentage = data.standings.map((team) => ({
        displayName: team.displayName,
        winPercentage: (team.wins / (team.wins + team.losses + team.ties)) * 100,
        season: team.season,
    }));

    // Sort by highest win percentage
    const bestWinPercentageTeams = [...teamsWithWinPercentage]
        .sort((a, b) => b.winPercentage - a.winPercentage)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Best Win % (Season)</h4>
            </Card.Header>
            <Card.Body>
                {bestWinPercentageTeams.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-success">Top Win Percentage</h5>
                        <h3 className="text-center">
                            <strong>{bestWinPercentageTeams[0].displayName}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{bestWinPercentageTeams[0].winPercentage.toFixed(2)}%</strong> (
                            {bestWinPercentageTeams[0].season})
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {bestWinPercentageTeams.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.displayName}</strong> ({team.season})
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

export default BestWinPercentageCard;
