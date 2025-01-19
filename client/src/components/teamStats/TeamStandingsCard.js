import React from "react";
import { Card } from "react-bootstrap";
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const TeamStandingsCard = ({ standings, selectedTeam }) => {
    // Filter data for the selected team
    const filteredData = standings.filter((team) => team.displayName === selectedTeam);

    // Prepare chart data
    const chartData = filteredData.map((team) => ({
        season: team.season,
        pointsFor: team.points_for,
        pointsAgainst: team.points_against,
        wins: team.wins,
        losses: team.losses,
    }));

    return (
        <Card className="mb-3 shadow-lg">
            <Card.Header >
                <h4 className="text-center"> {selectedTeam} Team Performance</h4>
            </Card.Header>
            <Card.Body>
                {selectedTeam ? (
                    <ResponsiveContainer width="100%" height={450}>
                        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 70 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="season"
                                label={{ value: "Season", position: "bottom", offset: 20 }}
                                angle={90}
                                textAnchor="start"
                                interval={0}
                            />
                            <YAxis
                                yAxisId="left"
                                orientation="left"
                                label={{
                                    value: "Points",
                                    angle: -90,
                                    position: "insideLeft",
                                }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                label={{
                                    value: "Wins / Losses",
                                    angle: -90,
                                    position: "insideRight",
                                }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: 40 }} />

                            {/* Line Graph for Points */}
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="pointsFor"
                                stroke="#82ca9d"
                                name="Points For"
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="pointsAgainst"
                                stroke="#ff7f7f"
                                name="Points Against"
                            />

                            {/* Bar Chart for Wins and Losses */}
                            <Bar
                                yAxisId="right"
                                dataKey="wins"
                                fill="#8884d8"
                                name="Wins"
                                barSize={40}
                            />
                            <Bar
                                yAxisId="right"
                                dataKey="losses"
                                fill="#ffc658"
                                name="Losses"
                                barSize={40}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-muted">Please select a team to view the chart.</p>
                )}
            </Card.Body>
        </Card>
    );
};

export default TeamStandingsCard;
