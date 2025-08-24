import React from "react";

const TeamFilter = ({ teams, selectedTeam, onSelectTeam }) => {
    
    return (
        <div className="card">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Team Selection
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                        </svg>
                        Filter
                    </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Choose a team to analyze their historical performance and statistics
                </p>
            </div>
            
            <div className="p-6">
                <div className="max-w-md">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Select Team
                    </label>
                    <select
                        value={selectedTeam}
                        onChange={(e) => onSelectTeam(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">-- Select a Team --</option>
                        {teams.map((team, index) => (
                            <option key={index} value={team}>
                                {team}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedTeam && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                Analyzing: {selectedTeam}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamFilter;
