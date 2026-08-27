import React from "react";
import { PageHeader } from "../layout/PageChrome";
import ChampionshipBanners from "./ChampionshipBanners";
import VitalsStrip from "./VitalsStrip";
import RecordBook from "./RecordBook";

// Home: the league record book. Banners first, vitals second, records third.
const CardRow = () => (
    <div className="max-w-7xl mx-auto">
        <PageHeader
            eyebrow="The record book"
            title="Beech F Fantasy"
            subtitle="Seventeen seasons of championships, hot streaks, and the numbers that settle arguments."
        />
        <ChampionshipBanners />
        <VitalsStrip />
        <RecordBook />
    </div>
);

export default CardRow;
