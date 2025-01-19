import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const MostPlayoffAppearancesCard = () => {
    const { data } = useDataContext();

    // Calculate playoff appearances for each team
    const playoffAppearances = data.standings.reduce((acc, team) => {
        if (team.final_standing <= 6) {
            acc[team.displayName] = (acc[team.displayName] || 0) + 1;
        }
        return acc;
    }, {});

    // Convert to array and sort by most playoff appearances
    const sortedPlayoffTeams = Object.entries(playoffAppearances)
        .map(([team, count]) => ({ team, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Most Playoff Appearances</h4>
            </Card.Header>
            <Card.Body>
                {sortedPlayoffTeams.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-info">Top Playoff Team</h5>
                        <h3 className="text-center">
                            <strong>{sortedPlayoffTeams[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{sortedPlayoffTeams[0].count} playoff seasons</strong>
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {sortedPlayoffTeams.slice(1).map((team, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{team.team}</strong>
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {team.count} seasons
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default MostPlayoffAppearancesCard;
