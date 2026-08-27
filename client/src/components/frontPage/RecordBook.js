import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { useDataContext } from "../../DataContext";
import { computeRecordGroups } from "../../lib/records";
import { SectionHeader } from "../layout/PageChrome";

// One record as a ledger entry: the holder up front, the rest of the top five
// behind a native <details> disclosure.
const RecordEntry = ({ record }) => {
    const [holder, ...rest] = record.rows;
    if (!holder) return null;
    return (
        <details className="group border-t border-gray-200 dark:border-gray-700 py-4">
            <summary className="cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-sm [&::-webkit-details-marker]:hidden">
                <div className="flex items-baseline justify-between gap-4">
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gray-500 dark:text-gray-400">
                        {record.title}
                    </span>
                    <FiChevronDown
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180 shrink-0 self-center"
                    />
                </div>
                <div className="flex items-baseline justify-between gap-4 mt-1">
                    <span className="font-semibold text-gray-900 dark:text-white truncate">{holder.name}</span>
                    <span className="font-display text-2xl font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap">
                        {holder.value}
                    </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{holder.detail}</div>
            </summary>
            {rest.length > 0 && (
                <ol start={2} className="mt-3 space-y-1.5">
                    {rest.map((row, i) => (
                        <li key={`${row.name}-${i}`} className="flex items-baseline gap-3 text-sm">
                            <span className="w-4 text-right text-gray-400 tabular-nums">{i + 2}</span>
                            <span className="text-gray-700 dark:text-gray-300 truncate">{row.name}</span>
                            <span className="ml-auto font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {row.value}
                            </span>
                            <span className="text-gray-400 whitespace-nowrap hidden sm:inline">{row.detail}</span>
                        </li>
                    ))}
                </ol>
            )}
        </details>
    );
};

const RecordBook = () => {
    const { data } = useDataContext();
    const groups = computeRecordGroups(data);
    if (!groups) {
        return (
            <div className="animate-pulse space-y-4">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {groups.map((group) => (
                <section key={group.group} className="mb-10">
                    <SectionHeader title={group.group} />
                    <div className="grid lg:grid-cols-2 gap-x-12">
                        {group.records.map((record) => (
                            <RecordEntry key={record.title} record={record} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default RecordBook;
