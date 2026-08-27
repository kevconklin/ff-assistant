import React from "react";

// Slim toolbar: pick a team, the dashboard below is the confirmation.
const TeamFilter = ({ teams, selectedTeam, onSelectTeam }) => (
    <div className="flex flex-wrap items-center gap-3">
        <label
            htmlFor="team-select"
            className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400"
        >
            Team
        </label>
        <select
            id="team-select"
            value={selectedTeam}
            onChange={(e) => onSelectTeam(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-[220px]"
        >
            <option value="">Pick a team</option>
            {teams.map((team) => (
                <option key={team} value={team}>
                    {team}
                </option>
            ))}
        </select>
    </div>
);

export default TeamFilter;
