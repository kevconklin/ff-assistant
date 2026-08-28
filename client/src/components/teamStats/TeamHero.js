import React from "react";

const ord = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

// The team's locker-room banner: name in chalk, title years hung as mini gold
// banners, and the career line underneath.
const TeamHero = ({ profile }) => {
    if (!profile) return null;

    const vitals = [
        {
            label: "Career record",
            value: `${profile.wins}–${profile.losses}${profile.ties > 0 ? `–${profile.ties}` : ""}`,
        },
        { label: "Win rate", value: `${profile.winPct.toFixed(1)}%` },
        { label: "Best finish", value: ord(profile.bestFinish) },
        { label: "Playoff seasons", value: `${profile.playoffYears}` },
        {
            label: "Longest streak",
            value: profile.longestStreak.streak > 0 ? `${profile.longestStreak.streak} wins` : "—",
        },
        { label: "Points scored", value: Math.round(profile.pointsFor).toLocaleString() },
    ];

    return (
        <section aria-label={`${profile.name} career summary`} className="bg-field-800 rounded-xl mb-10 overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-x-8 px-6 pt-6">
                <div>
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
                        {profile.seasonCount} seasons · {profile.firstSeason}–{profile.lastSeason}
                    </p>
                    <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-chalk leading-none mt-1 break-all">
                        {profile.name}
                    </h2>
                </div>
                {profile.titleYears.length > 0 && (
                    <div className="flex gap-2" aria-label="Championship years">
                        {profile.titleYears.map((year) => (
                            <div
                                key={year}
                                className="bg-gold-500 text-field-900 font-display font-bold text-sm px-2.5 pt-1.5 pb-3"
                                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)" }}
                            >
                                {year}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="yard-line mx-6 mt-5" aria-hidden="true" />

            <dl className="flex flex-wrap gap-x-10 gap-y-4 px-6 py-5">
                {vitals.map((v) => (
                    <div key={v.label}>
                        <dt className="text-[11px] font-semibold tracking-[0.18em] uppercase text-chalk/50">
                            {v.label}
                        </dt>
                        <dd className="font-display text-2xl font-bold text-chalk">{v.value}</dd>
                    </div>
                ))}
            </dl>

            <p className="px-6 pb-5 text-xs text-chalk/40">
                Roster moves per season: {profile.avgTrades} trades · {profile.avgAcquisitions} adds · {profile.avgDrops} drops
                {profile.winnersBracketGames > 0 && ` · ${profile.winnersBracketGames} winner's-bracket games all-time`}
            </p>
        </section>
    );
};

export default TeamHero;
