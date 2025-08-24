import React from "react";
import { useDataContext } from "../../DataContext";

const BiggestDifferentialsCard = () => {
    const { data, loading } = useDataContext();
    
    const scrollContent = (direction) => {
        const scrollContainer = document.getElementById('biggest-blowouts-scroll');
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
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!data?.matchups) return null;

    // Sort matchups by the largest point difference and take the top 5
    const topDifferentials = [...data.matchups]
        .sort((a, b) => b.point_difference - a.point_difference)
        .slice(0, 5);

    return (
        <div className="card h-full">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Biggest Blowouts
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Matchups
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    The most lopsided individual matchups in league history
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
                    id="biggest-blowouts-scroll"
                    className="p-4 h-80 overflow-y-auto scrollbar-hide"
                >
                    <div className="space-y-4">
                        {topDifferentials.map((matchup, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                                        #{index + 1}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        Season {matchup.season}
                                    </span>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        {matchup.winner === matchup.home_owner_displayName ? (
                                            <>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                                        {matchup.home_owner_displayName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Home)</span>
                                                </div>
                                                <span className="font-bold text-green-600 dark:text-green-400">
                                                    {matchup.home_score.toFixed(1)}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                                        {matchup.home_owner_displayName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Home)</span>
                                                </div>
                                                <span className="font-medium text-gray-600 dark:text-gray-400">
                                                    {matchup.home_score.toFixed(1)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        {matchup.winner === matchup.away_owner_displayName ? (
                                            <>
                                                <div className="flex items-center">
                                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                                        {matchup.away_owner_displayName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Away)</span>
                                                </div>
                                                <span className="font-bold text-green-600 dark:text-green-400">
                                                    {matchup.away_score.toFixed(1)}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center">
                                                    <span className="font-medium text-gray-600 dark:text-gray-400">
                                                        {matchup.away_owner_displayName}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(Away)</span>
                                                </div>
                                                <span className="font-medium text-gray-600 dark:text-gray-400">
                                                    {matchup.away_score.toFixed(1)}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-center mt-3 pt-3 border-t border-purple-200 dark:border-purple-700">
                                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                        {matchup.point_difference.toFixed(1)} point difference
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>Total matchups analyzed</span>
                            <span className="font-medium">{data.matchups.length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiggestDifferentialsCard;