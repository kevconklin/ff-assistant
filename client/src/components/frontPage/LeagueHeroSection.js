import React, { useState } from "react";
import { useDataContext } from "../../DataContext";

const LeagueHeroSection = () => {
    const { data, loading } = useDataContext();
    const [isExpanded, setIsExpanded] = useState(true);

    if (loading) {
        return (
            <div className="card rounded-2xl mb-8 animate-pulse overflow-hidden">
                {/* Loading Header */}
                <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>
                            <div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                            </div>
                        </div>
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
                
                {/* Loading Content */}
                <div className="p-8 bg-gray-50 dark:bg-gray-800/50">
                    <div className="mb-8">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
                                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data?.standings || !data?.matchups) return null;

    // Calculate league statistics
    const totalSeasons = [...new Set(data.standings.map(team => team.season))].length;
    const totalMatchups = data.matchups.length;
    const totalPointsScored = data.standings.reduce((sum, team) => sum + team.points_for, 0);
    const firstSeason = Math.min(...data.standings.map(team => team.season));
    const currentSeason = Math.max(...data.standings.map(team => team.season));

    // Get championship data
    const champions = data.standings.filter(team => team.champion);
    const championsByYear = champions.reduce((acc, champion) => {
        acc[champion.season] = champion.displayName;
        return acc;
    }, {});

    // Get current/most recent champion
    const currentChampion = champions.find(champ => champ.season === currentSeason);

    // Calculate league competitive metrics
    const avgPointsPerGame = (totalPointsScored / totalMatchups).toFixed(1);
    const uniqueChampions = [...new Set(champions.map(champ => champ.displayName))].length;

    return (
        <div className="card rounded-2xl mb-8 overflow-hidden">
            {/* Collapsible Header */}
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg p-2 -m-2 transition-colors"
                >
                    <div className="flex items-center">
                        <svg className="w-8 h-8 mr-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <div>
                            <h2 className="text-2xl font-bold text-left text-gray-900 dark:text-white">League History Dashboard</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Championship timeline and key statistics</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {currentChampion && (
                            <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full font-bold text-xs flex items-center">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                {currentChampion.displayName}
                            </div>
                        )}
                        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}>
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </button>
            </div>

            {/* Collapsible Content */}
            <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="p-8 bg-gray-50 dark:bg-gray-800/50">
                    {/* Championship Timeline */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                            <svg className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            Championship Journey
                        </h3>

                        {/* Championship Timeline Journey */}
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute top-8 left-8 right-8 h-0.5 bg-gradient-to-r from-gray-300 via-yellow-300 to-green-300 dark:from-gray-600 dark:via-yellow-500 dark:to-green-500 opacity-60"></div>
                            
                            {/* Scrollable Timeline Container */}
                            <div className="overflow-x-auto scrollbar-hide pb-4">
                                <div className="flex gap-6 min-w-max px-2">
                                    {Object.entries(championsByYear)
                                        .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Earliest to latest
                                        .map(([year, champion], index, array) => (
                                        <div key={year} className="relative flex flex-col items-center min-w-0">
                                            {/* Timeline Dot */}
                                            <div className={`relative z-10 w-4 h-4 rounded-full mb-3 ${
                                                year === currentSeason.toString() 
                                                    ? 'bg-yellow-500 ring-4 ring-yellow-400/30 animate-pulse dark:bg-yellow-400' 
                                                    : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400 transition-colors'
                                            }`}>
                                                {year === currentSeason.toString() && (
                                                    <div className="absolute -top-1 -left-1 w-6 h-6 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
                                                )}
                                            </div>
                                            
                                            {/* Championship Card */}
                                            <div className={`bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 group cursor-pointer transform hover:scale-105 min-w-[120px] border border-gray-200 dark:border-gray-600 ${
                                                year === currentSeason.toString() 
                                                    ? 'ring-2 ring-yellow-400/50 bg-yellow-50 dark:bg-yellow-900/20' 
                                                    : ''
                                            }`}>
                                                <div className="text-center">
                                                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">{year}</div>
                                                    <div className={`font-bold text-sm group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors ${
                                                        year === currentSeason.toString() ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
                                                    }`}>
                                                        {champion}
                                                    </div>
                                                    {year === currentSeason.toString() && (
                                                        <div className="flex justify-center mt-2">
                                                            <svg className="w-4 h-4 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Era Labels */}
                                            {index === 0 && (
                                                <div className="absolute -bottom-8 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                                    League Founded
                                                </div>
                                            )}
                                            {index === array.length - 1 && (
                                                <div className="absolute -bottom-8 text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                                                    Present Day
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Scroll Indicator */}
                            <div className="flex justify-center mt-4">
                                <div className="text-xs text-gray-500 dark:text-gray-400 opacity-60 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                    </svg>
                                    Scroll to explore timeline
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* League Stats Grid */}
                    <div>
                        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-900 dark:text-white">
                            <svg className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            League Statistics
                        </h2>
                        
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Years Active</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {firstSeason} - {currentSeason}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">({totalSeasons} seasons)</div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Total Matchups</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{totalMatchups.toLocaleString()}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Games played</div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Points Scored</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{totalPointsScored.toLocaleString()}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Avg: {avgPointsPerGame}/game</div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">Unique Champions</div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">{uniqueChampions}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Different winners</div>
                            </div>

                            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600">
                                <div className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center">
                                    <svg className="w-4 h-4 mr-1 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                    Dynasty Leader
                                </div>
                                <div className="text-xl font-bold text-gray-900 dark:text-white">
                                    {(() => {
                                        const champCounts = champions.reduce((acc, champ) => {
                                            acc[champ.displayName] = (acc[champ.displayName] || 0) + 1;
                                            return acc;
                                        }, {});
                                        const topChamp = Object.entries(champCounts).sort(([,a], [,b]) => b - a)[0];
                                        return topChamp ? topChamp[0] : "N/A";
                                    })()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {(() => {
                                        const champCounts = champions.reduce((acc, champ) => {
                                            acc[champ.displayName] = (acc[champ.displayName] || 0) + 1;
                                            return acc;
                                        }, {});
                                        const topChamp = Object.entries(champCounts).sort(([,a], [,b]) => b - a)[0];
                                        return topChamp ? `${topChamp[1]} championships` : "No data";
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeagueHeroSection;