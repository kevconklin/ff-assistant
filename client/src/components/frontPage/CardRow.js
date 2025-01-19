import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MostChampionshipsCard from "./MostChampionshipsCard";
import MostRunnerUps from "./MostRunnerUps";
import Top5SeasonsCard from "./Top5SeasonsCard";
import BiggestDifferentials from "./BiggestDifferentials";
import LeastPointsCard from "./LeastPointsCard";
import BestWinPercentageCard from "./BestWinPercentageCard";
import LargestSingleGameScoreCard from "./LargestSingleGameScore";
import MostPlayoffAppearancesCard from "./MostPlayoffAppearancesCard";
import LongestWinningStreakCard from "./LongestWinStreakCard";
import WorstPointDifferentialCard from "./WorstPointDifferentialCard";
import TotalWinPercentageCard from "./TotalWinPercentageCard";
import MostPointsTotalCard from "./MostPointsTotalCard";

const CardRow = () => {
    return (
        <Container style={{ maxWidth: "1500px", margin: "0 auto", paddingTop: "20px"}}>
            <Row className="mb-4">
                <Col md={3}>
                    <Top5SeasonsCard />
                </Col>
                <Col md={3}>
                    <MostPointsTotalCard />
                </Col>
                <Col md={3}>
                    <MostChampionshipsCard />
                </Col>
                <Col md={3}>
                    <LargestSingleGameScoreCard />
                </Col>

            </Row>
            <Row className="mb-4">
                <Col md={3}>
                    <TotalWinPercentageCard />
                </Col>
                <Col md={3}>
                    <LongestWinningStreakCard />
                </Col>
                <Col md={3}>
                    <BestWinPercentageCard />
                </Col>
                <Col md={3}>
                    <MostPlayoffAppearancesCard />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={3}>
                    <MostRunnerUps />
                </Col>
                <Col md={3}>
                    <LeastPointsCard />
                </Col>
                <Col md={3}>
                    <WorstPointDifferentialCard />
                </Col>
                <Col md={3}>
                    <BiggestDifferentials />
                </Col>
            </Row>
        </Container>
    );
};

export default CardRow;
