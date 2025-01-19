import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomNavbar = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home">Beech F Fantasy Football</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/league-stats">League Stats</Nav.Link>
            <Nav.Link href="/team-stats">Team Stats</Nav.Link>
            <Nav.Link href="/chat">Chat</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
};

export default CustomNavbar;
