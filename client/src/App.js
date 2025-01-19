import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import TeamDashboard from "./components/teamStats/TeamDashboard";
import LeagueStats from "./components/leagueStats/LeagueStats";
import { DataProvider } from "./DataContext"; // Import your DataContext
import FetchData from "./FetchData";
import CardRow from "./components/frontPage/CardRow";
import ChatBot from "./components/chatBot/ChatBot"

function App() {
    return (
        <DataProvider>
            <Router>
                <CustomNavbar />
                <FetchData/>
                <Routes>
                    <Route path="/home" element={<CardRow/>} />
                    <Route path="/league-stats" element={<LeagueStats />} />
                    <Route path="/team-stats" element={<TeamDashboard />} />
                    <Route path="/chat" element={<ChatBot/>} />
                </Routes>
            </Router>
        </DataProvider>
    );
}

export default App;
