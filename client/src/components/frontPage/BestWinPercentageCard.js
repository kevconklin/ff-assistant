import React from "react";
import { useDataContext } from "../../DataContext";

const BestWinPercentageCard = () => {
    const { data, loading } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('best-win-percentage-scroll');
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

    // Calculate win percentage for each team
    const teamsWithWinPercentage = data.standings.map((team) => ({
        displayName: team.displayName,
        winPercentage: (team.wins / (team.wins + team.losses + team.ties)) * 100,
        season: team.season,
    }));

    // Sort by highest win percentage
    const bestWinPercentageTeams = [...teamsWithWinPercentage]
        .sort((a, b) => b.winPercentage - a.winPercentage)
        .slice(0, 10);

    return (
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Best Win Percentage
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Season
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Single season win percentage leaders across all years
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
                    id="best-win-percentage-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                {bestWinPercentageTeams.length > 0 && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Top Win Percentage</span>
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {bestWinPercentageTeams[0].displayName}
                            </h4>
                            <p className="text-green-600 dark:text-green-400 font-semibold">
                                {bestWinPercentageTeams[0].winPercentage.toFixed(1)}% win rate
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {bestWinPercentageTeams[0].season} season
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {bestWinPercentageTeams.slice(1).map((team, index) => (
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
                                        {team.displayName}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        ({team.season})
                                    </span>
                                </div>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                {team.winPercentage.toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Average win percentage</span>
                        <span className="font-medium">
                            {(bestWinPercentageTeams.reduce((sum, team) => sum + team.winPercentage, 0) / bestWinPercentageTeams.length).toFixed(1)}%
                        </span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default BestWinPercentageCard;
