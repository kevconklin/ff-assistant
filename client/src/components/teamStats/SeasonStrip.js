import React from "react";

const OUTCOME_STYLES = {
    champion: "bg-gold-500 text-field-900 border-gold-500",
    "runner-up": "bg-transparent text-gray-900 dark:text-white border-gray-400 dark:border-gray-500",
    playoffs: "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border-primary-100 dark:border-primary-700",
    regular: "bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700",
};

const OUTCOME_LABELS = {
    champion: "Champion",
    "runner-up": "Finalist",
    playoffs: "Playoffs",
    regular: "Regular",
};

// Every season as a tile: gold for a title, outlined for a finals loss, green
// tint for a playoff year. The shape of a career at a glance.
const SeasonStrip = ({ seasons }) => {
    if (!seasons?.length) return null;
    return (
        <div>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {seasons.map((s) => (
                    <div
                        key={s.season}
                        className={`flex-shrink-0 w-[4.5rem] rounded-md border px-2 py-2.5 text-center ${OUTCOME_STYLES[s.outcome]}`}
                    >
                        <div className="font-display text-lg font-bold leading-none">{s.season}</div>
                        <div className="text-[11px] mt-1 tabular-nums">{s.record}</div>
                        <div className="text-[10px] uppercase tracking-wider mt-0.5 opacity-80">
                            {OUTCOME_LABELS[s.outcome]}
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Gold: won the title · Outlined: lost the final · Green: made the playoffs
            </p>
        </div>
    );
};

export default SeasonStrip;
