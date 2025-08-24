import React from "react";
import { useDataContext } from "../../DataContext";

const LargestSingleGameScoreCard = () => {
    const { data } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('single-game-scroll');
        if (scrollContainer) {
            const scrollAmount = direction === 'up' ? -100 : 100;
            scrollContainer.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!data?.matchups) {
        return (
            <div className="card h-full p-6">
                <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                </div>
            </div>
        );
    }

    // Sort by highest single-game score
    const highestGameScores = [...data.matchups]
        .flatMap((matchup) => [
            { team: matchup.home_owner_displayName, points: Math.round(matchup.home_score), season: matchup.season },
            { team: matchup.away_owner_displayName, points: Math.round(matchup.away_score), season: matchup.season },
        ])
        .sort((a, b) => b.points - a.points)
        .slice(0, 5);

    return (
        <div className="card h-full">
            {/* Header */}
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Single Game Records
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        Weekly High
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Highest single-week performances
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
                    id="single-game-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                    {/* Record Game Highlight */}
                    {highestGameScores.length > 0 && (
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-3 mb-4 border border-red-200 dark:border-red-800">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full mb-1">
                                    <span className="text-sm">⚡</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                    {highestGameScores[0].team}
                                </h4>
                                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                    {highestGameScores[0].points}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Points in {highestGameScores[0].season}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Other High Scores */}
                    <div className="space-y-2">
                        {highestGameScores.slice(1).map((score, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="flex items-center space-x-2">
                                    <span className="flex items-center justify-center w-5 h-5 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-600 dark:text-gray-300 rounded-full">
                                        {index + 2}
                                    </span>
                                    <div>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white block">
                                            {score.team}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {score.season} season
                                        </span>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                    {score.points}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Footer Stats */}
                    {highestGameScores.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>Average Top 5:</span>
                                <span className="font-medium">
                                    {Math.round(highestGameScores.reduce((sum, score) => sum + score.points, 0) / highestGameScores.length)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LargestSingleGameScoreCard;
