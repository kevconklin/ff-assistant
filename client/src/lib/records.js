// League record computations, lifted from the retired front-page cards.
// Each record returns { title, note, rows: [{ name, value, detail }] } where
// rows are ranked best-first and value is the display string.

const fmt = (n) => Math.round(n).toLocaleString();

const bestSingleSeasons = (standings) => ({
    title: "Best single season",
    note: "Most points scored in one season",
    rows: [...standings]
        .sort((a, b) => b.points_for - a.points_for)
        .slice(0, 5)
        .map((t) => ({ name: t.displayName, value: fmt(t.points_for), detail: `${t.season} season` })),
});

const totalPointsLeaders = (standings) => {
    const totals = standings.reduce((acc, t) => {
        acc[t.displayName] = (acc[t.displayName] || 0) + t.points_for;
        return acc;
    }, {});
    return {
        title: "All-time points",
        note: "Cumulative scoring across every season",
        rows: Object.entries(totals)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, pts]) => ({ name, value: fmt(pts), detail: "career" })),
    };
};

const singleGameHighs = (matchups) => ({
    title: "Single-game high",
    note: "Most points in one week",
    rows: matchups
        .flatMap((m) => [
            { name: m.home_owner_displayName, points: m.home_score, season: m.season },
            { name: m.away_owner_displayName, points: m.away_score, season: m.season },
        ])
        .sort((a, b) => b.points - a.points)
        .slice(0, 5)
        .map((r) => ({ name: r.name, value: fmt(r.points), detail: `${r.season} season` })),
});

const biggestBlowouts = (matchups) => ({
    title: "Biggest blowout",
    note: "Largest margin of victory in one game",
    rows: matchups
        .filter((m) => m.winner)
        .sort((a, b) => b.point_difference - a.point_difference)
        .slice(0, 5)
        .map((m) => ({
            name: m.winner,
            value: `+${fmt(m.point_difference)}`,
            detail: `over ${m.loser}, ${m.season}`,
        })),
});

const championshipLeaders = (standings) => {
    const counts = standings.reduce((acc, t) => {
        if (t.champion) acc[t.displayName] = (acc[t.displayName] || 0) + 1;
        return acc;
    }, {});
    return {
        title: "Championships",
        note: "Titles won",
        rows: Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, n]) => ({ name, value: `${n}`, detail: n === 1 ? "title" : "titles" })),
    };
};

const careerWinRate = (standings) => {
    const rec = standings.reduce((acc, t) => {
        const r = acc[t.displayName] || { wins: 0, losses: 0, games: 0 };
        r.wins += t.wins;
        r.losses += t.losses;
        r.games += t.wins + t.losses + t.ties;
        acc[t.displayName] = r;
        return acc;
    }, {});
    return {
        title: "Career win rate",
        note: "Win percentage across all seasons",
        rows: Object.entries(rec)
            .map(([name, r]) => ({ name, pct: (r.wins / r.games) * 100, w: r.wins, l: r.losses }))
            .sort((a, b) => b.pct - a.pct)
            .slice(0, 5)
            .map((r) => ({ name: r.name, value: `${r.pct.toFixed(1)}%`, detail: `${r.w}–${r.l} record` })),
    };
};

const bestSeasonWinRate = (standings) => ({
    title: "Best season win rate",
    note: "Single-season win percentage",
    rows: standings
        .map((t) => ({
            name: t.displayName,
            pct: (t.wins / (t.wins + t.losses + t.ties)) * 100,
            season: t.season,
        }))
        .sort((a, b) => b.pct - a.pct)
        .slice(0, 5)
        .map((r) => ({ name: r.name, value: `${r.pct.toFixed(1)}%`, detail: `${r.season} season` })),
});

// True longest run of consecutive wins within one season, walked from the
// games in week order. (ESPN's streak_length field only holds the streak a
// team ENDED the season on, which understates real streaks.) A game with no
// recorded winner (a tie) ends a streak.
export const longestSeasonStreak = (matchups, name, season) => {
    let cur = 0;
    let max = 0;
    matchups
        .filter(
            (m) =>
                m.season === season &&
                (m.home_owner_displayName === name || m.away_owner_displayName === name)
        )
        .sort((a, b) => a.week - b.week)
        .forEach((m) => {
            cur = m.winner === name ? cur + 1 : 0;
            if (cur > max) max = cur;
        });
    return max;
};

const longestWinStreaks = (standings, matchups) => {
    const teamSeasons = standings.map((t) => ({
        name: t.displayName,
        season: t.season,
        streak: longestSeasonStreak(matchups, t.displayName, t.season),
    }));
    return {
        title: "Longest win streak",
        note: "Consecutive wins in a single season",
        rows: teamSeasons
            .sort((a, b) => b.streak - a.streak)
            .slice(0, 5)
            .map((r) => ({ name: r.name, value: `${r.streak} wins`, detail: `${r.season} season` })),
    };
};

const playoffAppearances = (standings) => {
    const counts = standings.reduce((acc, t) => {
        if (t.final_standing <= 6) acc[t.displayName] = (acc[t.displayName] || 0) + 1;
        return acc;
    }, {});
    return {
        title: "Playoff appearances",
        note: "Seasons finishing in the playoff spots",
        rows: Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, n]) => ({ name, value: `${n}`, detail: n === 1 ? "berth" : "berths" })),
    };
};

const mostRunnerUps = (standings) => {
    const counts = standings.reduce((acc, t) => {
        if (t.runner_up) acc[t.displayName] = (acc[t.displayName] || 0) + 1;
        return acc;
    }, {});
    return {
        title: "Always the bridesmaid",
        note: "Most second-place finishes",
        rows: Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, n]) => ({ name, value: `${n}`, detail: n === 1 ? "runner-up" : "runner-ups" })),
    };
};

const fewestPointsSeasons = (standings) => ({
    title: "Fewest points in a season",
    note: "The lowest-scoring campaigns ever",
    rows: [...standings]
        .sort((a, b) => a.points_for - b.points_for)
        .slice(0, 5)
        .map((t) => ({ name: t.displayName, value: fmt(t.points_for), detail: `${t.season} season` })),
});

const worstDifferentials = (standings) => ({
    title: "Worst point differential",
    note: "Outscored by the most over one season",
    rows: [...standings]
        .map((t) => ({ name: t.displayName, diff: t.points_for - t.points_against, season: t.season }))
        .sort((a, b) => a.diff - b.diff)
        .slice(0, 5)
        .map((r) => ({ name: r.name, value: fmt(r.diff), detail: `${r.season} season` })),
});

export const computeRecordGroups = (data) => {
    const { standings, matchups } = data;
    if (!standings?.length || !matchups?.length) return null;
    return [
        {
            group: "Scoring",
            records: [
                bestSingleSeasons(standings),
                totalPointsLeaders(standings),
                singleGameHighs(matchups),
                biggestBlowouts(matchups),
            ],
        },
        {
            group: "Winning",
            records: [
                championshipLeaders(standings),
                careerWinRate(standings),
                bestSeasonWinRate(standings),
                longestWinStreaks(standings, matchups),
                playoffAppearances(standings),
            ],
        },
        {
            group: "Hall of shame",
            records: [
                mostRunnerUps(standings),
                fewestPointsSeasons(standings),
                worstDifferentials(standings),
            ],
        },
    ];
};

// League-wide vitals for the strip under the banner wall. Games and points
// both come from matchups (one row per game, playoffs included) so the counts
// and the per-game average agree — standings W-L would double-count games and
// standings points_for covers the regular season only.
export const computeVitals = (data) => {
    const { standings, matchups } = data;
    if (!standings?.length || !matchups?.length) return null;
    const seasons = [...new Set(standings.map((t) => t.season))];
    const totalPoints = matchups.reduce((sum, m) => sum + m.home_score + m.away_score, 0);
    const champs = standings.filter((t) => t.champion);
    return {
        firstSeason: Math.min(...seasons),
        lastSeason: Math.max(...seasons),
        seasonCount: seasons.length,
        totalMatchups: matchups.length,
        totalPoints,
        avgPerGame: totalPoints / matchups.length,
        uniqueChampions: new Set(champs.map((c) => c.displayName)).size,
    };
};

// Championship history for the banner wall: one banner per season, with the
// running title count per owner so repeat winners read as a dynasty.
export const computeBannerWall = (standings) => {
    if (!standings?.length) return [];
    const champs = standings
        .filter((t) => t.champion)
        .sort((a, b) => a.season - b.season);
    const running = {};
    return champs.map((c) => {
        running[c.displayName] = (running[c.displayName] || 0) + 1;
        return { season: c.season, name: c.displayName, titleNumber: running[c.displayName] };
    });
};
