import React from "react";

const TeamTimelineCard = ({ standings = [], selectedTeam }) => {
    if (!selectedTeam) {
        return (
            <div className="card h-full">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Team Timeline
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Timeline
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Visual timeline of championships, playoff appearances, and achievements
                    </p>
                </div>
                <div className="p-6 flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                            <span className="text-xl">📈</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Select a Team
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Choose a team to view their performance timeline across all seasons.
                        </p>
                    </div>
                </div>
            </div>
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
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedTeam} Timeline
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Historical
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Season-by-season performance with championships, playoffs, and achievements
                </p>
            </div>
            
            <div className="p-6">
                {/* Legend */}
                <div className="flex justify-center gap-6 mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center">
                        <span className="text-lg mr-2">🏆</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Champion</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-lg mr-2">🥈</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Runner-Up</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-lg mr-2">⭐</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Made Playoffs</span>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-purple-300 dark:bg-purple-600 transform -translate-y-1/2 z-0"></div>
                    
                    {/* Timeline items */}
                    <div className="flex justify-between items-center relative z-10 overflow-x-auto pb-4">
                        {timelineData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0 mx-2">
                                {/* Timeline dot */}
                                <div className={`w-4 h-4 rounded-full border-2 ${
                                    data.isChampion 
                                        ? 'bg-yellow-400 border-yellow-500' 
                                        : data.isRunnerUp 
                                        ? 'bg-gray-300 border-gray-400' 
                                        : data.madePlayoffs 
                                        ? 'bg-blue-400 border-blue-500' 
                                        : 'bg-gray-200 border-gray-300 dark:bg-gray-600 dark:border-gray-500'
                                } mb-3 transition-all hover:scale-110`}></div>
                                
                                {/* Season label */}
                                <div className="text-center">
                                    <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                                        {data.season}
                                    </div>
                                    
                                    {/* Achievement icons */}
                                    <div className="flex justify-center space-x-1">
                                        {data.isChampion && (
                                            <span className="text-lg" title="Champion">🏆</span>
                                        )}
                                        {data.isRunnerUp && (
                                            <span className="text-lg" title="Runner-Up">🥈</span>
                                        )}
                                        {data.madePlayoffs && !data.isChampion && !data.isRunnerUp && (
                                            <span className="text-lg" title="Made Playoffs">⭐</span>
                                        )}
                                    </div>
                                    
                                    {/* Achievement text */}
                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {data.isChampion ? 'Champion' : 
                                         data.isRunnerUp ? 'Runner-Up' : 
                                         data.madePlayoffs ? 'Playoffs' : 'Regular'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Championships</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {timelineData.filter(d => d.isChampion).length}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Finals</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {timelineData.filter(d => d.isRunnerUp || d.isChampion).length}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Playoff Years</div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                                {timelineData.filter(d => d.madePlayoffs).length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamTimelineCard;
