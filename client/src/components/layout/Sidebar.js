import React, { useState, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiHome, FiBarChart2, FiUsers, FiMenu, FiX } from "react-icons/fi";
import { useDataContext } from "../../DataContext";

const NAV_ITEMS = [
    { to: "/home", label: "Home", sub: "League dashboard", Icon: FiHome },
    { to: "/league-stats", label: "League Stats", sub: "Standings & records", Icon: FiBarChart2 },
    { to: "/team-stats", label: "Team Stats", sub: "Team deep-dive", Icon: FiUsers },
];

const useLeagueFacts = () => {
    const { data } = useDataContext();
    return useMemo(() => {
        const standings = data?.standings || [];
        if (standings.length === 0) return null;
        const seasons = standings.map((s) => s.season);
        const lastSeason = Math.max(...seasons);
        const firstSeason = Math.min(...seasons);
        const champ = standings.find((s) => s.season === lastSeason && s.champion);
        return {
            firstSeason,
            lastSeason,
            seasonCount: new Set(seasons).size,
            champion: champ ? champ.displayName : null,
        };
    }, [data]);
};

const Wordmark = () => (
    <Link
        to="/home"
        className="block px-5 pt-6 pb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk rounded-sm"
    >
        <span className="block text-[11px] font-semibold tracking-[0.25em] uppercase text-gold-400">
            Est. 2009
        </span>
        <span className="block font-display text-3xl font-bold uppercase tracking-wide text-chalk leading-tight">
            Beech F Fantasy
        </span>
        <div className="yard-line mt-3" aria-hidden="true" />
    </Link>
);

const NavList = ({ onNavigate }) => (
    <nav aria-label="Main" className="mt-4 px-3 space-y-1">
        {NAV_ITEMS.map(({ to, label, sub, Icon }) => (
            <NavLink
                key={to}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk ${
                        isActive
                            ? "bg-field-700 text-chalk"
                            : "text-chalk/70 hover:bg-field-700/60 hover:text-chalk"
                    }`
                }
            >
                {({ isActive }) => (
                    <>
                        {/* Chalk hash marks: lit gold on the active route */}
                        <span
                            aria-hidden="true"
                            className={`flex flex-col gap-[3px] ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
                        >
                            <span className="block w-2 h-[2px] bg-gold-500" />
                            <span className="block w-2 h-[2px] bg-gold-500" />
                        </span>
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="min-w-0">
                            <span className="block font-display text-lg font-semibold uppercase tracking-wide leading-tight">
                                {label}
                            </span>
                            <span className={`block text-xs ${isActive ? "text-chalk/70" : "text-chalk/40"}`}>
                                {sub}
                            </span>
                        </span>
                    </>
                )}
            </NavLink>
        ))}
    </nav>
);

const ChampionPennant = () => {
    const facts = useLeagueFacts();
    if (!facts) return null;
    return (
        <div className="px-5 pb-6">
            {facts.champion && (
                <div
                    className="bg-gold-500 text-field-900 px-4 py-2.5"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
                >
                    <span className="block text-[10px] font-semibold tracking-[0.2em] uppercase">
                        Reigning champion
                    </span>
                    <span className="block font-display text-xl font-bold uppercase tracking-wide pb-1">
                        {facts.lastSeason} · {facts.champion}
                    </span>
                </div>
            )}
            <p className="mt-3 text-xs text-chalk/50">
                {facts.seasonCount} seasons · {facts.firstSeason}–{facts.lastSeason}
            </p>
        </div>
    );
};

const SidebarContent = ({ onNavigate }) => (
    <div className="flex h-full flex-col justify-between bg-field-800">
        <div>
            <Wordmark />
            <NavList onNavigate={onNavigate} />
        </div>
        <ChampionPennant />
    </div>
);

const Sidebar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const closeDrawer = () => setDrawerOpen(false);
    const currentLabel =
        NAV_ITEMS.find((item) => item.to === location.pathname)?.label || "Beech F Fantasy";

    return (
        <>
            {/* Desktop: fixed sideline */}
            <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-40">
                <SidebarContent />
            </aside>

            {/* Mobile: top bar */}
            <header className="lg:hidden fixed top-0 inset-x-0 z-40 bg-field-800 flex items-center justify-between px-4 h-14">
                <Link to="/home" className="font-display text-xl font-bold uppercase tracking-wide text-chalk">
                    Beech F Fantasy
                </Link>
                <div className="flex items-center gap-3">
                    <span className="text-xs uppercase tracking-widest text-chalk/50">{currentLabel}</span>
                    <button
                        type="button"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        aria-label={drawerOpen ? "Close menu" : "Open menu"}
                        aria-expanded={drawerOpen}
                        className="text-chalk p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-chalk rounded-md"
                    >
                        {drawerOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile: drawer + overlay */}
            {drawerOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <button
                        type="button"
                        aria-label="Close menu"
                        onClick={closeDrawer}
                        className="absolute inset-0 w-full h-full bg-black/50 cursor-default"
                    />
                    <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
                        <SidebarContent onNavigate={closeDrawer} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
