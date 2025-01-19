import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import YearRangeAggregator from "./YearRangeAggregator";
import StandingsTable from "./StandingsTable";
import { useDataContext } from "../../DataContext";

const LeagueStats = () => {

    const { data } = useDataContext();
    
    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <YearRangeAggregator />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <StandingsTable />
                </Col>
            </Row>
        </Container>
    );
};

export default LeagueStats;
