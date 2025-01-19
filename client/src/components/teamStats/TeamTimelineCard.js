import React from "react";
import { Card } from "react-bootstrap";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const TeamTimelineCard = ({ standings = [], selectedTeam }) => {
    if (!selectedTeam) {
        return (
            <Card >
                <Card.Header>
                    <h4 className="text-center">Team Timeline</h4>
                </Card.Header>
                <Card.Body>
                    <p className="text-center text-muted">Please select a team to view the timeline.</p>
                </Card.Body>
            </Card>
        );
    }

    // Filter standings for the selected team
    const teamStandings = standings.filter((team) => team.displayName === selectedTeam);

    // Prepare timeline data
    const timelineData = teamStandings.map((seasonData) => ({
        season: seasonData.season,
        isChampion: seasonData.champion,
        isRunnerUp: seasonData.runner_up,
        madePlayoffs: seasonData.final_standing <= 6, // Playoff participation logic
    }));

    return (
        <Card className="h-80 mb-3 shadow-lg">
            <Card.Header>
                <h4 className="text-center">{selectedTeam} Team Timeline</h4>
            </Card.Header>
            <Card.Body>
                {/* Legend */}
                <div className="timeline-legend mb-3">
                    <span>
                        <span className="icon">🏆</span> Champion
                    </span>
                    <span>
                        <span className="icon">🥈</span> Runner-Up
                    </span>
                    <span>
                        <span className="icon">⭐</span> Made Playoffs
                    </span>
                </div>

                <div className="timeline-container">
                    {/* Horizontal Line */}
                    {/* Timeline Notches */}
                    {timelineData.map((data, index) => (
                        <OverlayTrigger
                            key={index}
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-${index}`}>
                                    <div>
                                        <strong>Season:</strong> {data.season}
                                    </div>
                                    {data.isChampion && <div>🏆 Champion</div>}
                                    {data.isRunnerUp && <div>🥈 Runner-Up</div>}
                                    {data.madePlayoffs && <div>⭐ Made Playoffs</div>}
                                </Tooltip>
                            }
                        >
                            <div className="timeline-item">
                                <div className="timeline-notch" />
                                <div className="timeline-label">
                                    <strong>{data.season}</strong>
                                    <div>
                                        {data.isChampion && <span title="Champion">🏆</span>}
                                        {data.isRunnerUp && <span title="Runner-Up">🥈</span>}
                                        {data.madePlayoffs && <span title="Made Playoffs">⭐</span>}
                                    </div>
                                </div>
                            </div>
                        </OverlayTrigger>
                    ))}
                </div>
            </Card.Body>

            {/* Timeline CSS */}
            <style jsx="true">{`
                .timeline-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    padding: 25px 0;
                    overflow-x: auto;
                }

                .timeline-line {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background-color: #8884d8;
                    z-index: 0;
                }

                .timeline-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 1;
                }

                .timeline-notch {
                    width: 12px;
                    height: 12px;
                    background-color: #8884d8;
                    border-radius: 50%;
                    position: relative;
                }

                .timeline-label {
                    margin-top: 10px;
                    text-align: center;
                }

                .timeline-label strong {
                    display: block;
                    margin-bottom: 5px;
                }

                .timeline-container::-webkit-scrollbar {
                    height: 5px;
                }

                .timeline-container::-webkit-scrollbar-thumb {
                    background: #8884d8;
                    border-radius: 10px;
                }

                .timeline-legend {
                    display: flex;
                    justify-content: space-around;
                    font-size: 0.9rem;
                    color: #555;
                }

                .icon {
                    margin-right: 5px;
                }
            `}</style>
        </Card>
    );
};

export default TeamTimelineCard;
