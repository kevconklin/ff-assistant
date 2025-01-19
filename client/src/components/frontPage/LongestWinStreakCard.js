import React from "react";
import { Card } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const LongestWinningStreakCard = () => {
    const { data } = useDataContext();

    // Find the longest streak for each team
    const longestStreaks = data.standings.map((team) => ({
        team: team.displayName,
        streak: team.streak_type === "WIN" ? team.streak_length : 0,
        season: team.season,
    }));

    const sortedStreaks = longestStreaks.sort((a, b) => b.streak - a.streak).slice(0, 10);

    return (
        <Card className="h-100 mb-3 shadow-lg">
            <Card.Header style={{ color: "black" }}>
                <h4 className="text-center">Longest Winning Streak</h4>
            </Card.Header>
            <Card.Body>
                {sortedStreaks.length > 0 && (
                    <div className="top-season mb-4 p-3 rounded bg-light">
                        <h5 className="text-center text-warning">Longest Streak</h5>
                        <h3 className="text-center">
                            <strong>{sortedStreaks[0].team}</strong>
                        </h3>
                        <p className="text-center mb-0">
                            <strong>{sortedStreaks[0].streak} games</strong> (
                            {sortedStreaks[0].season})
                        </p>
                    </div>
                )}

                <ul className="list-group">
                    {sortedStreaks.slice(1).map((streak, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <span>
                                <strong>{streak.team}</strong> ({streak.season})
                            </span>
                            <span className="badge bg-secondary rounded-pill">
                                {streak.streak} games
                            </span>
                        </li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
    );
};

export default LongestWinningStreakCard;
