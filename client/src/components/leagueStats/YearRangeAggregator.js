import React, { useState } from "react";
import { useDataContext } from "../../DataContext";
import { Table, Form, Card, Container, Row, Col} from "react-bootstrap";

const YearRangeAggregator = () => {
    const { data } = useDataContext();

    // Determine min and max years
    const minYear = Math.min(...data.standings.map((team) => team.season));
    const maxYear = Math.max(...data.standings.map((team) => team.season));
    console.log("minYear", minYear, "maxYear", maxYear)
    // Dropdown state for year range
    const [startYear, setStartYear] = useState(2009);
    const [endYear, setEndYear] = useState(2024);

    // State for sorting
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    // Filter data by the selected year range
    const filteredData = data.standings.filter(
        (team) => team.season >= startYear && team.season <= endYear
    );

    // Aggregate metrics by displayName
    const aggregatedData = filteredData.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = {
                displayName: team.displayName,
                totalPointsFor: 0,
                totalPointsAgainst: 0,
                totalRanking: 0,
                totalChampionships: 0,
                totalWins: 0,
                totalLosses: 0,
                count: 0,
            };
        }

        acc[team.displayName].totalPointsFor += team.points_for;
        acc[team.displayName].totalPointsAgainst += team.points_against;
        acc[team.displayName].totalRanking += team.final_standing;
        acc[team.displayName].totalChampionships += team.champion ? 1 : 0;
        acc[team.displayName].totalWins += team.wins;
        acc[team.displayName].totalLosses += team.losses;
        acc[team.displayName].count += 1;

        return acc;
    }, {});

    // Convert aggregated data to array for display
    const displayData = Object.values(aggregatedData).map((team) => ({
        ...team,
        averagePointsFor: team.count ? (team.totalPointsFor / team.count).toFixed(2) : 0,
        averagePointsAgainst: team.count ? (team.totalPointsAgainst / team.count).toFixed(2) : 0,
        averageRanking: team.count ? (team.totalRanking / team.count).toFixed(2) : 0,
        averageWins: team.count ? (team.totalWins / team.count).toFixed(2) : 0,
        averageLosses: team.count ? (team.totalLosses / team.count).toFixed(2) : 0,
    }));

    // Sorting logic
    const sortedData = [...displayData].sort((a, b) => {
        const key = sortConfig.key;
        if (!key) return 0;

        if (key === "displayName") {
            return sortConfig.direction === "asc"
                ? a.displayName.localeCompare(b.displayName)
                : b.displayName.localeCompare(a.displayName);
        }

        return sortConfig.direction === "asc"
            ? parseFloat(a[key]) - parseFloat(b[key])
            : parseFloat(b[key]) - parseFloat(a[key]);
    });

    const handleSort = (key) => {
        setSortConfig((prevConfig) => ({
            key,
            direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
        }));
    };

    return (
        <Card className="mb-3 shadow-lg">
            <Card.Header >
                <h4 className="text-center">Multiple Seasons</h4>
            </Card.Header>
            <Card.Body>
                <Container>
                    <Row>
                        <Col md={6}>
                        <Form.Group style={{ flex: 1 }}>
                            <Form.Label>From</Form.Label>
                                <Form.Select
                                    value={startYear}
                                    onChange={(e) => setStartYear(Number(e.target.value))}
                                >
                                    {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(
                                        (year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        )
                                    )}
                                </Form.Select>
                        </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group style={{ flex: 1 }}>
                    <Form.Label>To</Form.Label>
                    <Form.Select
                        value={endYear}
                        onChange={(e) => setEndYear(Number(e.target.value))}
                    >
                        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(
                            (year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            )
                        )}
                    </Form.Select>
                </Form.Group>
                        </Col>
                    </Row>
                </Container>

            {/* Aggregated Data Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("displayName")} style={{ cursor: "pointer" }}>
                            Team {sortConfig.key === "displayName" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("averagePointsFor")} style={{ cursor: "pointer" }}>
                            Avg Points For {sortConfig.key === "averagePointsFor" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("averagePointsAgainst")} style={{ cursor: "pointer" }}>
                            Avg Points Against {sortConfig.key === "averagePointsAgainst" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalPointsFor")} style={{ cursor: "pointer" }}>
                            Total Points For {sortConfig.key === "totalPointsFor" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalPointsAgainst")} style={{ cursor: "pointer" }}>
                            Total Points Against {sortConfig.key === "totalPointsAgainst" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("averageRanking")} style={{ cursor: "pointer" }}>
                            Avg Ranking {sortConfig.key === "averageRanking" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalWins")} style={{ cursor: "pointer" }}>
                            Total Wins {sortConfig.key === "totalWins" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalLosses")} style={{ cursor: "pointer" }}>
                            Total Losses {sortConfig.key === "totalLosses" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("averageWins")} style={{ cursor: "pointer" }}>
                            Avg Wins {sortConfig.key === "averageWins" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("averageLosses")} style={{ cursor: "pointer" }}>
                            Avg Losses {sortConfig.key === "averageLosses" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                        <th onClick={() => handleSort("totalChampionships")} style={{ cursor: "pointer" }}>
                            Championships {sortConfig.key === "totalChampionships" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((team, index) => (
                        <tr key={index}>
                            <td>{team.displayName}</td>
                            <td>{team.averagePointsFor}</td>
                            <td>{team.averagePointsAgainst}</td>
                            <td>{team.totalPointsFor}</td>
                            <td>{team.totalPointsAgainst}</td>
                            <td>{team.averageRanking}</td>
                            <td>{team.totalWins}</td>
                            <td>{team.totalLosses}</td>
                            <td>{team.averageWins}</td>
                            <td>{team.averageLosses}</td>
                            <td>{team.totalChampionships}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </Card.Body>
            </Card>
    );
};

export default YearRangeAggregator;
