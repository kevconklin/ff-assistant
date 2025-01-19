import React from "react";
import { Form } from "react-bootstrap";
import { useDataContext } from "../../DataContext";

const TeamFilter = ({ teams, selectedTeam, onSelectTeam }) => {
    const { data } = useDataContext();
    return (
        <Form.Group className="mb-3">
            <Form.Label>Select Team</Form.Label>
            <Form.Select value={selectedTeam} onChange={(e) => onSelectTeam(e.target.value)}>
                <option value="">-- Select a Team --</option>
                {teams.map((team, index) => (
                    <option key={index} value={team}>
                        {team}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
};

export default TeamFilter;
