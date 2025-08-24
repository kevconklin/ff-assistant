import React from "react";
import { useDataContext } from "../../DataContext";

const MostPlayoffAppearancesCard = () => {
    const { data, loading } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('playoff-appearances-scroll');
        if (scrollContainer) {
            const scrollAmount = direction === 'up' ? -100 : 100;
            scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    };

    if (loading) {
        return (
            <div className="card h-full animate-pulse">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
                </div>
                <div className="p-6">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mx-auto mb-2"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
                    </div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center py-2">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!data?.standings) return null;

    // Calculate playoff appearances for each team
    const playoffAppearances = data.standings.reduce((acc, team) => {
        if (team.final_standing <= 6) {
            acc[team.displayName] = (acc[team.displayName] || 0) + 1;
        }
        return acc;
    }, {});

    // Convert to array and sort by most playoff appearances
    const sortedPlayoffTeams = Object.entries(playoffAppearances)
        .map(([team, count]) => ({ team, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

    return (
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Most Playoff Appearances
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        Playoffs
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Teams with the most playoff berths throughout league history
                </p>
            </div>
            
            <div className="relative flex-1">
                {/* Scroll buttons */}
                <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                    <button 
                        onClick={() => scrollContent('up')}
                        className="p-1 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        aria-label="Scroll up"
                    >
                        <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => scrollContent('down')}
                        className="p-1 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
                        aria-label="Scroll down"
                    >
                        <svg className="w-3 h-3 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                
                <div 
                    id="playoff-appearances-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                    {sortedPlayoffTeams.length > 0 && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center justify-center mb-2">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Top Playoff Team</span>
                            </div>
                            <div className="text-center">
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {sortedPlayoffTeams[0].team}
                                </h4>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                    {sortedPlayoffTeams[0].count} playoff appearances
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Most consistent playoff contender
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        {sortedPlayoffTeams.slice(1).map((team, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 px-4 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div className="flex items-center">
                                    <span className="flex items-center justify-center w-6 h-6 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium mr-3">
                                        {index + 2}
                                    </span>
                                    <div>
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            {team.team}
                                        </span>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                    {team.count} seasons
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Teams in playoffs</span>
                            <span className="font-medium">{sortedPlayoffTeams.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MostPlayoffAppearancesCard;