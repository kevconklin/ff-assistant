import React, { useState } from "react";
import { Card, Table, Form } from "react-bootstrap";

const TeamMatchupsTable = ({ matchups, selectedTeam }) => {
    const [opponentFilter, setOpponentFilter] = useState(""); // Filter state
    const [sortConfig, setSortConfig] = useState({ key: "wins", direction: "desc" }); // Sorting state

    if (!selectedTeam) {
        return (
            <Card className="mb-3 shadow-lg">
                <Card.Header>
                    <h4 className="text-center">{selectedTeam }Matchups Performance</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-center text-muted">Please select a team to view the table.</p>
                </Card.Body>
            </Card>
        );
    }

    // Filter matchups for the selected team
    const filteredMatchups = matchups.filter(
        (matchup) =>
            matchup.home_owner_displayName === selectedTeam || matchup.away_owner_displayName === selectedTeam
    );

    // Aggregate data by opponent
    const matchupStats = filteredMatchups.reduce((acc, matchup) => {
        const opponent =
            matchup.home_owner_displayName === selectedTeam
                ? matchup.away_owner_displayName
                : matchup.home_owner_displayName;

        if (!acc[opponent]) {
            acc[opponent] = {
                opponent,
                wins: 0,
                losses: 0,
                totalWinMargin: 0,
                totalLossMargin: 0,
                games: 0,
            };
        }

        const isWin = matchup.winner === selectedTeam;

        if (isWin) {
            acc[opponent].wins += 1;
            acc[opponent].totalWinMargin += Math.abs(matchup.point_difference);
        } else {
            acc[opponent].losses += 1;
            acc[opponent].totalLossMargin += Math.abs(matchup.point_difference);
        }

        acc[opponent].games += 1;

        return acc;
    }, {});

    // Prepare table data
    const tableData = Object.values(matchupStats).map((opponent) => ({
        opponent: opponent.opponent,
        wins: opponent.wins,
        losses: opponent.losses,
        games: opponent.games,
        avgWinMargin: opponent.wins > 0 ? (opponent.totalWinMargin / opponent.wins).toFixed(2) : "N/A",
        avgLossMargin: opponent.losses > 0 ? (opponent.totalLossMargin / opponent.losses).toFixed(2) : "N/A",
    }));

    // Filter rows based on opponentFilter
    const filteredTableData = tableData.filter((row) =>
        row.opponent && row.opponent.toLowerCase().includes(opponentFilter.toLowerCase())
);

    // Handle sorting
    const sortedTableData = [...filteredTableData].sort((a, b) => {
        if (sortConfig.direction === "asc") {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    // Update sort configuration
    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <Card className="mb-3 shadow-lg">
            <Card.Header >
                <h4 className="text-center"> {selectedTeam} Historical Matchups </h4>
            </Card.Header>
            <Card.Body>
                {/* Opponent Filter */}
                <Form.Group className="mb-3">
                    <Form.Label>Filter by Opponent</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter opponent name..."
                        value={opponentFilter}
                        onChange={(e) => setOpponentFilter(e.target.value)}
                    />
                </Form.Group>

                {/* Matchups Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Opponent</th>
                            <th onClick={() => handleSort("wins")} style={{ cursor: "pointer" }}>
                                Wins {sortConfig.key === "wins" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th onClick={() => handleSort("losses")} style={{ cursor: "pointer" }}>
                                Losses {sortConfig.key === "losses" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th onClick={() => handleSort("games")} style={{ cursor: "pointer" }}>
                                Games Played{" "}
                                {sortConfig.key === "games" && (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th onClick={() => handleSort("avgWinMargin")} style={{ cursor: "pointer" }}>
                                Average Margin of Victory{" "}
                                {sortConfig.key === "avgWinMargin" &&
                                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th onClick={() => handleSort("avgLossMargin")} style={{ cursor: "pointer" }}>
                                Average Margin of Loss{" "}
                                {sortConfig.key === "avgLossMargin" &&
                                    (sortConfig.direction === "asc" ? "🔼" : "🔽")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTableData.length > 0 ? (
                            sortedTableData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.opponent}</td>
                                    <td>{row.wins}</td>
                                    <td>{row.losses}</td>
                                    <td>{row.games}</td>
                                    <td>{row.avgWinMargin}</td>
                                    <td>{row.avgLossMargin}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No opponents match the filter.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default TeamMatchupsTable;
