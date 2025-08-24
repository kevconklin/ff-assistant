import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";
import TeamDashboard from "./components/teamStats/TeamDashboard";
import LeagueStats from "./components/leagueStats/LeagueStats";
import { DataProvider } from "./DataContext"; // Import your DataContext
import FetchData from "./FetchData";
import CardRow from "./components/frontPage/CardRow";

function App() {
    return (
        <DataProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                    <CustomNavbar />
                    <FetchData/>
                    <main className="container mx-auto px-4 py-6">
                        <Routes>
                            <Route path="/" element={<Navigate to="/home" />} />
                            <Route path="/home" element={<CardRow/>} />
                            <Route path="/league-stats" element={<LeagueStats />} />
                            <Route path="/team-stats" element={<TeamDashboard />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </DataProvider>
    );
}

export default App;
