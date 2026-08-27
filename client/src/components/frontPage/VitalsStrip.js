import React from "react";
import { useDataContext } from "../../DataContext";
import { computeVitals } from "../../lib/records";

// League vitals as bare typography — numbers and hairlines, no boxes.
const VitalsStrip = () => {
    const { data } = useDataContext();
    const vitals = computeVitals(data);
    if (!vitals) return null;

    const items = [
        { label: "Seasons", value: `${vitals.seasonCount}`, detail: `${vitals.firstSeason}–${vitals.lastSeason}` },
        { label: "Games played", value: vitals.totalMatchups.toLocaleString(), detail: "regular + playoffs" },
        { label: "Points scored", value: Math.round(vitals.totalPoints).toLocaleString(), detail: `${vitals.avgPerGame.toFixed(1)} per game, both teams` },
        { label: "Different champions", value: `${vitals.uniqueChampions}`, detail: "have raised a banner" },
    ];

    return (
        <dl className="grid grid-cols-2 lg:grid-cols-4 mb-10 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-700 border-y border-gray-200 dark:border-gray-700">
            {items.map((item) => (
                <div key={item.label} className="py-5 lg:px-6 first:lg:pl-0">
                    <dt className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
                        {item.label}
                    </dt>
                    <dd className="mt-1">
                        <span className="font-display text-4xl font-bold text-gray-900 dark:text-white">
                            {item.value}
                        </span>
                        <span className="block text-sm text-gray-500 dark:text-gray-400">{item.detail}</span>
                    </dd>
                </div>
            ))}
        </dl>
    );
};

export default VitalsStrip;
