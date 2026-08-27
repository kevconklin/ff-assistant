import React from "react";

// Shared page chrome carrying the sideline identity: gold eyebrow, condensed
// display titles, and the hash-mark motif echoed from the sidebar nav.

export const HashMarks = ({ className = "" }) => (
    <span aria-hidden="true" className={`inline-flex flex-col gap-[3px] mr-3 ${className}`}>
        <span className="block w-3 h-[2px] bg-gold-500" />
        <span className="block w-3 h-[2px] bg-gold-500" />
    </span>
);

export const PageHeader = ({ eyebrow, title, subtitle }) => (
    <header className="mb-8">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-field-600 dark:text-gold-400 mb-1">
            {eyebrow}
        </p>
        <h1 className="font-display text-4xl font-bold uppercase tracking-wide text-gray-900 dark:text-white leading-none mb-2">
            {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">{subtitle}</p>
    </header>
);

export const SectionHeader = ({ title, action }) => (
    <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center font-display text-2xl font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
            <HashMarks />
            {title}
        </h2>
        {action}
    </div>
);
