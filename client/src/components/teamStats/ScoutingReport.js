import React from "react";
import summariesFile from "../../data/teamSummaries.json";

// The back of the trading card: a static, pre-written scouting report for
// each owner. The text lives in src/data/teamSummaries.json and is not
// recomputed from live data — regenerate that file to refresh it.
const ScoutingReport = ({ teamName }) => {
    const summary = summariesFile.summaries[teamName];
    if (!summary) return null;

    return (
        <section aria-label="Scouting report" className="mb-10">
            <div className="rounded-xl border-2 border-gold-500/60 bg-white dark:bg-gray-800 overflow-hidden">
                <div className="flex items-baseline justify-between px-6 pt-5">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-600 dark:text-gold-400">
                        Scouting report
                    </p>
                    <p className="text-xs text-gray-400">{summariesFile._meta.coverage.replace("-", "–")}</p>
                </div>
                <p className="px-6 py-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    {summary}
                </p>
                <div className="yard-line mx-6 mb-5 opacity-40" aria-hidden="true" />
            </div>
        </section>
    );
};

export default ScoutingReport;
