import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const chatContainerRef = useRef(null);

    const handleSend = async () => {
        if (!input.trim()) return;
        
        setChatHistory([
            ...chatHistory,
            { sender: "user", message: input },
            { sender: "bot", message: "Sorry, the AI assistant is not available in this static version. Please use the data visualization features above to explore your fantasy football stats!" }
        ]);
        setInput("");
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className="card p-6">
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    🤖 Beech F Assistant
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ask questions about your fantasy data...
                </p>
            </div>

            {/* Info Alert */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            <strong>Note:</strong> AI features are disabled in this static version. You can still explore all your fantasy data using the interactive charts and tables above!
                        </p>
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div
                ref={chatContainerRef}
                className="max-h-80 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4 space-y-4 bg-gray-50 dark:bg-gray-800/50"
            >
                {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <svg className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p>Start a conversation...</p>
                    </div>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                chat.sender === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                                    chat.sender === "user"
                                        ? "bg-primary-600 text-white"
                                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600"
                                }`}
                            >
                                {chat.message}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                    onClick={handleSend}
                    className="btn-primary"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;