import React, { useEffect, useRef } from "react";
import { useDataContext } from "../../DataContext";
import { computeBannerWall } from "../../lib/records";

const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
};

// The banner wall: every championship hangs from the rafters, one banner per
// season. Repeat winners carry their running title count; the reigning
// champion's banner is gold.
const ChampionshipBanners = () => {
    const { data } = useDataContext();
    const railRef = useRef(null);
    const banners = computeBannerWall(data?.standings);

    // Open on the present day, not 2009.
    useEffect(() => {
        if (railRef.current) railRef.current.scrollLeft = railRef.current.scrollWidth;
    }, [banners.length]);

    if (banners.length === 0) {
        return (
            <div className="bg-field-800 rounded-xl mb-10 p-8 animate-pulse">
                <div className="h-4 bg-field-700 rounded w-48 mb-6"></div>
                <div className="flex gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-28 h-40 bg-field-700 rounded-sm"></div>
                    ))}
                </div>
            </div>
        );
    }

    const current = banners[banners.length - 1];

    return (
        <section aria-label="Championship banners" className="bg-field-800 rounded-xl mb-10 overflow-hidden">
            <div className="flex items-baseline justify-between px-6 pt-5 pb-4">
                <h2 className="font-display text-xl font-semibold uppercase tracking-wide text-chalk">
                    The Rafters
                </h2>
                <p className="text-xs text-chalk/50">
                    {banners.length} banners · {banners[0].season}–{current.season}
                </p>
            </div>

            {/* The rail the banners hang from */}
            <div className="yard-line mx-6" aria-hidden="true" />

            <div
                ref={railRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-6 pb-8 snap-x"
            >
                {banners.map((b) => {
                    const reigning = b === current;
                    return (
                        <div
                            key={b.season}
                            className={`flex-shrink-0 snap-start w-32 pt-5 pb-8 px-3 text-center ${
                                reigning ? "bg-gold-500 text-field-900" : "bg-field-700 text-chalk"
                            }`}
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 88%, 0 100%)" }}
                        >
                            <div className={`font-display text-2xl font-bold ${reigning ? "" : "text-gold-400"}`}>
                                {b.season}
                            </div>
                            <div className={`font-display font-semibold uppercase leading-tight mt-1 break-all ${
                                b.name.length > 11 ? "text-xs tracking-normal" : "text-base tracking-wide"
                            }`}>
                                {b.name}
                            </div>
                            <div className={`text-[10px] uppercase tracking-[0.18em] mt-2 ${
                                reigning ? "text-field-900/70" : "text-chalk/50"
                            }`}>
                                {b.titleNumber > 1 ? `${ordinal(b.titleNumber)} title` : "First title"}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ChampionshipBanners;
