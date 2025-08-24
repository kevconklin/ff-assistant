import React from "react";
import { useDataContext } from "../../DataContext";

const TotalWinPercentageCard = () => {
    const { data } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('win-percentage-scroll');
        if (scrollContainer) {
            const scrollAmount = direction === 'up' ? -100 : 100;
            scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!data?.standings) {
        return (
            <div className="card h-full p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                </div>
            </div>
        );
    }

    // Calculate win percentage across all seasons
    const winPercentages = data.standings.reduce((acc, team) => {
        if (!acc[team.displayName]) {
            acc[team.displayName] = { wins: 0, games: 0, losses: 0 };
        }
        acc[team.displayName].wins += team.wins;
        acc[team.displayName].losses += team.losses;
        acc[team.displayName].games += team.wins + team.losses + team.ties;
        return acc;
    }, {});

    const sortedTeams = Object.entries(winPercentages)
        .map(([team, stats]) => ({
            displayName: team,
            winPercentage: (stats.wins / stats.games) * 100,
            totalWins: stats.wins,
            totalLosses: stats.losses
        }))
        .sort((a, b) => b.winPercentage - a.winPercentage)
        .slice(0, 5);

    return (
        <div className="card h-full">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Overall Win Rate
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400">
                        Success Rate
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Career win percentages across all seasons
                </p>
            </div>

            {/* Content with scroll */}
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
                    id="win-percentage-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                    {/* Top Win Rate Highlight */}
                    {sortedTeams.length > 0 && (
                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-lg p-3 mb-4 border border-teal-200 dark:border-teal-800">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 dark:bg-teal-900/30 rounded-full mb-1">
                                    <span className="text-sm">📈</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                    {sortedTeams[0].displayName}
                                </h4>
                                <p className="text-lg font-bold text-teal-600 dark:text-teal-400">
                                    {sortedTeams[0].winPercentage.toFixed(1)}%
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {sortedTeams[0].totalWins}-{sortedTeams[0].totalLosses} record
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Other Win Rates */}
                    <div className="space-y-2">
                        {sortedTeams.slice(1).map((team, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="flex items-center justify-center w-5 h-5 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-full">
                                        {index + 2}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {team.displayName}
                                    </span>
                                </div>
                                <div className="text-right">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
                                        {team.winPercentage.toFixed(1)}%
                                    </span>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                        {team.totalWins}-{team.totalLosses}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Stats */}
                    {sortedTeams.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>League Average:</span>
                                <span className="font-medium">
                                    {(sortedTeams.reduce((sum, team) => sum + team.winPercentage, 0) / sortedTeams.length).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TotalWinPercentageCard;
