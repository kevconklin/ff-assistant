import React from "react";

// Shared table language matching the record-book ledger: hairline rules
// instead of banded headers, small-caps column labels, right-aligned
// tabular numerals, plain gray rank numbers.

export const tableClass = "min-w-full";
export const theadRowClass = "border-b-2 border-gray-200 dark:border-gray-700";

const thBase =
    "px-4 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400 whitespace-nowrap";
export const thLeft = `${thBase} text-left`;
export const thRight = `${thBase} text-right`;

export const tbodyClass = "divide-y divide-gray-200 dark:divide-gray-700";
export const trClass = "hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors";

const tdBase = "px-4 py-3 whitespace-nowrap text-sm";
export const tdLeft = `${tdBase} text-gray-900 dark:text-white`;
export const tdRight = `${tdBase} text-right tabular-nums text-gray-900 dark:text-white`;
export const rankClass = "inline-block w-5 text-right text-gray-400 tabular-nums mr-3";

const SortIcon = ({ active, direction }) => (
    <span
        aria-hidden="true"
        className={active ? "text-primary-600 dark:text-primary-400" : "text-gray-300 dark:text-gray-600"}
    >
        {active ? (direction === "asc" ? "↑" : "↓") : "↕"}
    </span>
);

export const SortableTh = ({ label, columnKey, sortConfig, onSort, align = "right" }) => (
    <th
        onClick={() => onSort(columnKey)}
        aria-sort={
            sortConfig.key === columnKey
                ? sortConfig.direction === "asc"
                    ? "ascending"
                    : "descending"
                : "none"
        }
        className={`${align === "left" ? thLeft : thRight} cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors`}
    >
        <span className={`inline-flex items-center gap-1 ${align === "right" ? "justify-end" : ""}`}>
            {label}
            <SortIcon active={sortConfig.key === columnKey} direction={sortConfig.direction} />
        </span>
    </th>
);
