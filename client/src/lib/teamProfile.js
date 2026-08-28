// Per-team career computations for the Team Stats page.

import { longestSeasonStreak } from "./records";

const playoffCutoff = 6; // final_standing <= 6 counts as a playoff berth

export const computeTeamProfile = (standings, matchups, name) => {
    const seasons = standings.filter((t) => t.displayName === name);
    if (seasons.length === 0) return null;

    const games = matchups.filter(
        (m) => m.home_owner_displayName === name || m.away_owner_displayName === name
    );

    const wins = seasons.reduce((s, t) => s + t.wins, 0);
    const losses = seasons.reduce((s, t) => s + t.losses, 0);
    const ties = seasons.reduce((s, t) => s + t.ties, 0);
    const pointsFor = seasons.reduce((s, t) => s + t.points_for, 0);

    const titleYears = seasons.filter((t) => t.champion).map((t) => t.season).sort();
    const runnerUpYears = seasons.filter((t) => t.runner_up).map((t) => t.season).sort();
    const playoffYears = seasons.filter((t) => t.final_standing <= playoffCutoff).length;
    const bestFinish = Math.min(...seasons.map((t) => t.final_standing));

    // True longest in-season run, from the games — not ESPN's end-of-season
    // streak field, which understates mid-season streaks.
    const longestStreak = seasons.reduce(
        (max, t) => {
            const streak = longestSeasonStreak(matchups, name, t.season);
            return streak > max.streak ? { streak, season: t.season } : max;
        },
        { streak: 0, season: null }
    );

    const avg = (key) => (seasons.reduce((s, t) => s + t[key], 0) / seasons.length).toFixed(1);

    return {
        name,
        seasonCount: seasons.length,
        firstSeason: Math.min(...seasons.map((t) => t.season)),
        lastSeason: Math.max(...seasons.map((t) => t.season)),
        wins,
        losses,
        ties,
        winPct: (wins / Math.max(1, wins + losses + ties)) * 100,
        pointsFor,
        titleYears,
        runnerUpYears,
        playoffYears,
        bestFinish,
        longestStreak,
        avgTrades: avg("trades"),
        avgAcquisitions: avg("acquisitions"),
        avgDrops: avg("drops"),
        winnersBracketGames: games.filter((m) => m.matchup_type === "WINNERS_BRACKET").length,
    };
};

// One row per season: how the year ended.
export const computeSeasonStrip = (standings, name) =>
    standings
        .filter((t) => t.displayName === name)
        .sort((a, b) => a.season - b.season)
        .map((t) => ({
            season: t.season,
            finish: t.final_standing,
            record: `${t.wins}–${t.losses}`,
            outcome: t.champion
                ? "champion"
                : t.runner_up
                ? "runner-up"
                : t.final_standing <= playoffCutoff
                ? "playoffs"
                : "regular",
        }));

// The whole league, one line per owner, for the roster picker.
export const computeRoster = (standings) => {
    const byName = standings.reduce((acc, t) => {
        const r = acc[t.displayName] || { name: t.displayName, wins: 0, losses: 0, titles: 0, seasons: 0 };
        r.wins += t.wins;
        r.losses += t.losses;
        r.titles += t.champion ? 1 : 0;
        r.seasons += 1;
        acc[t.displayName] = r;
        return acc;
    }, {});
    return Object.values(byName).sort((a, b) => b.titles - a.titles || b.wins - a.wins);
};
