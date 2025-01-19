import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import { Table, Form, Card } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";

const StandingsTable = () => {
    const { data } = useDataContext();
    const [selectedSeason, setSelectedSeason] = useState(2023);

    // Get unique seasons for the dropdown
    const seasons = Array.from(new Set(data.standings.map((item) => item.season)));

    // Filter standings by the selected season
    const filteredStandings = data.standings.filter(
        (team) => team.season === Number(selectedSeason)
    );

    return (
        <Card className="mb-3 shadow-lg">
            <Card.Header >
                <h4 className="text-center">Individual Season</h4>
            </Card.Header>
            <Card.Body>
            {/* Season Filter */}
            <Form.Group className="mb-3" controlId="seasonSelect">
                <Form.Label>Select Year</Form.Label>
                <Form.Select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                >
                    {seasons.map((season) => (
                        <option key={season} value={season}>
                            {season}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* Standings Table */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Final Standing</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Season</th>
                        <th>Display Name</th>
                        <th>Points For</th>
                        <th>Points Against</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStandings.map((team, index) => (
                        <tr key={index}>
                            <td>{team.final_standing}</td>
                            <td>{team.wins}</td>
                            <td>{team.losses}</td>
                            <td>{team.season}</td>
                            <td>
                                {team.displayName}{" "}
                                {team.champion && (
                                    <FaTrophy style={{ color: "gold", marginLeft: "5px" }} />
                                )}
                            </td>
                            <td>{team.points_for}</td>
                            <td>{team.points_against}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Card.Body>
            </Card>    );
};

export default StandingsTable;

