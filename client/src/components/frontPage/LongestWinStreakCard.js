import React from "react";
import { useDataContext } from "../../DataContext";

const LongestWinningStreakCard = () => {
    const { data, loading } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('win-streak-scroll');
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

    // Find the longest streak for each team
    const longestStreaks = data.standings.map((team) => ({
        team: team.displayName,
        streak: team.streak_type === "WIN" ? team.streak_length : 0,
        season: team.season,
    }));

    const sortedStreaks = longestStreaks.sort((a, b) => b.streak - a.streak).slice(0, 10);

    return (
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        Longest Winning Streak
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Streaks
                    </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Teams with the most consecutive wins in a single season
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
                    id="win-streak-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                {sortedStreaks.length > 0 && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-4 mb-6 border border-orange-200 dark:border-orange-800">
                        <div className="flex items-center justify-center mb-2">
                            <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Longest Streak</span>
                        </div>
                        <div className="text-center">
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                {sortedStreaks[0].team}
                            </h4>
                            <p className="text-orange-600 dark:text-orange-400 font-semibold">
                                {sortedStreaks[0].streak} consecutive wins
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {sortedStreaks[0].season} season
                            </p>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {sortedStreaks.slice(1).map((streak, index) => (
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
                                        {streak.team}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                                        ({streak.season})
                                    </span>
                                </div>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400">
                                {streak.streak} games
                            </span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>Total seasons analyzed</span>
                        <span className="font-medium">{data.standings.length}</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default LongestWinningStreakCard;
