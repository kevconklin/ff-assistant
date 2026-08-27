import React from "react";
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
        <div className="card">
            <div className="p-6">
                {selectedTeam ? (
                    <div className="bg-white dark:bg-gray-900 rounded-lg">
                        <ResponsiveContainer width="100%" height={450}>
                            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="season"
                                    label={{ value: "Season", position: "bottom", offset: -5 }}
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <YAxis
                                    yAxisId="left"
                                    orientation="left"
                                    label={{
                                        value: "Points",
                                        angle: -90,
                                        position: "insideLeft",
                                        style: { textAnchor: 'middle', fill: '#6b7280' }
                                    }}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    label={{
                                        value: "Wins / Losses",
                                        angle: -90,
                                        position: "insideRight",
                                        style: { textAnchor: 'middle', fill: '#6b7280' }
                                    }}
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                />
                                <Tooltip 
                                    contentStyle={{
                                        backgroundColor: '#f9fafb',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                                <Legend 
                                    verticalAlign="top" 
                                    height={36}
                                    wrapperStyle={{ paddingBottom: '20px' }}
                                />

                                {/* Line Graph for Points */}
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="pointsFor"
                                    stroke="#1B6A52"
                                    strokeWidth={3}
                                    dot={{ fill: '#1B6A52', strokeWidth: 2, r: 4 }}
                                    name="Points For"
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="pointsAgainst"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                                    name="Points Against"
                                />

                                {/* Bar Chart for Wins and Losses */}
                                <Bar
                                    yAxisId="right"
                                    dataKey="wins"
                                    fill="#1B6A52"
                                    name="Wins"
                                    barSize={30}
                                    radius={[2, 2, 0, 0]}
                                />
                                <Bar
                                    yAxisId="right"
                                    dataKey="losses"
                                    fill="#D9A441"
                                    name="Losses"
                                    barSize={30}
                                    radius={[2, 2, 0, 0]}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <span className="text-xl">📈</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Select a Team
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Choose a team to view their performance chart with points and win-loss data.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamStandingsCard;
