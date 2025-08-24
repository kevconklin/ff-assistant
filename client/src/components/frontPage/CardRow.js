import React from "react";
import LeagueHeroSection from "./LeagueHeroSection";
import MostChampionshipsCard from "./MostChampionshipsCard";
import MostRunnerUps from "./MostRunnerUps";
import Top5SeasonsCard from "./Top5SeasonsCard";
import BiggestDifferentials from "./BiggestDifferentials";
import LeastPointsCard from "./LeastPointsCard";
import BestWinPercentageCard from "./BestWinPercentageCard";
import LargestSingleGameScoreCard from "./LargestSingleGameScore";
import MostPlayoffAppearancesCard from "./MostPlayoffAppearancesCard";
import LongestWinningStreakCard from "./LongestWinStreakCard";
import WorstPointDifferentialCard from "./WorstPointDifferentialCard";
import TotalWinPercentageCard from "./TotalWinPercentageCard";
import MostPointsTotalCard from "./MostPointsTotalCard";

const CardRow = () => {
    const scrollLeft = (containerId) => {
        const container = document.getElementById(containerId);
        container.scrollBy({ left: -408, behavior: 'smooth' });
    };

    const scrollRight = (containerId) => {
        const container = document.getElementById(containerId);
        container.scrollBy({ left: 408, behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    🏆 League Statistics Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Comprehensive fantasy football analytics and historical performance metrics
                </p>
            </div>

            {/* League History Hero Section */}
            <LeagueHeroSection />

            {/* Performance Metrics */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        📊 Performance Leaders
                    </h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scrollLeft('performance-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => scrollRight('performance-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div 
                    id="performance-slider"
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex-shrink-0 w-96 h-96">
                        <Top5SeasonsCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <MostPointsTotalCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <MostChampionshipsCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <LargestSingleGameScoreCard />
                    </div>
                </div>
            </div>

            {/* Success Metrics */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        🎯 Success Metrics
                    </h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scrollLeft('success-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => scrollRight('success-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div 
                    id="success-slider"
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex-shrink-0 w-96 h-96">
                        <TotalWinPercentageCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <LongestWinningStreakCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <BestWinPercentageCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <MostPlayoffAppearancesCard />
                    </div>
                </div>
            </div>

            {/* Competition Analysis */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        ⚡ Competition Analysis
                    </h2>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => scrollLeft('competition-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll left"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => scrollRight('competition-slider')}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                            aria-label="Scroll right"
                        >
                            <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div 
                    id="competition-slider"
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex-shrink-0 w-96 h-96">
                        <MostRunnerUps />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <LeastPointsCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <WorstPointDifferentialCard />
                    </div>
                    <div className="flex-shrink-0 w-96 h-96">
                        <BiggestDifferentials />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CardRow;
