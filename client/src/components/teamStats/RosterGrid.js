import React from "react";

// The locker room: every owner, one tile, sorted by titles then wins.
// Clicking a tile selects that team — the empty state is the picker.
const RosterGrid = ({ roster, onSelectTeam }) => (
    <div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {roster.map((team) => (
                <button
                    key={team.name}
                    type="button"
                    onClick={() => onSelectTeam(team.name)}
                    className="text-left rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 hover:border-primary-500 dark:hover:border-primary-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                    <span className="block font-display text-lg font-semibold uppercase tracking-wide text-gray-900 dark:text-white truncate">
                        {team.name}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 tabular-nums">
                        {team.wins}–{team.losses} · {team.seasons} seasons
                    </span>
                    {team.titles > 0 && (
                        <span className="block text-sm font-medium text-gold-600 dark:text-gold-400 mt-0.5">
                            {"★".repeat(Math.min(team.titles, 5))} {team.titles} {team.titles === 1 ? "title" : "titles"}
                        </span>
                    )}
                </button>
            ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Pick an owner to open their career page.
        </p>
    </div>
);

export default RosterGrid;
