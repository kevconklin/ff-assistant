import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CustomNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/home" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                        🏈 Beech F Fantasy
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link 
                            to="/home"
                            className={`font-medium transition-colors ${
                                isActive('/home') 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/league-stats"
                            className={`font-medium transition-colors ${
                                isActive('/league-stats') 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'
                            }`}
                        >
                            League Stats
                        </Link>
                        <Link 
                            to="/team-stats"
                            className={`font-medium transition-colors ${
                                isActive('/team-stats') 
                                    ? 'text-primary-600 dark:text-primary-400' 
                                    : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400'
                            }`}
                        >
                            Team Stats
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-2">
                            <Link 
                                to="/home"
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                                    isActive('/home') 
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                                        : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/league-stats"
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                                    isActive('/league-stats') 
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                                        : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                League Stats
                            </Link>
                            <Link 
                                to="/team-stats"
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                                    isActive('/team-stats') 
                                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20' 
                                        : 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                Team Stats
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default CustomNavbar;
