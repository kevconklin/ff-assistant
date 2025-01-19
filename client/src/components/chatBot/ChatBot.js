import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card, Form, Button, Spinner } from "react-bootstrap";

const ChatBot = () => {
    const [input, setInput] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const chatContainerRef = useRef(null); // Ref for the chat container

    const handleSend = async () => {
        if (!input.trim()) return;

        // Add user message to chat history
        const newChatHistory = [...chatHistory, { sender: "user", message: input }];
        setChatHistory(newChatHistory);
        setInput(""); // Clear the input field
        setIsLoading(true); // Show the spinner

        try {
            // Call the ask_agent endpoint
            const response = await axios.post("http://localhost:8000/ask_agent", { query: input });
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: "bot", message: response.data.response.response },
            ]);
        } catch (error) {
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: "bot", message: "Error: Unable to fetch response." },
            ]);
        } finally {
            setIsLoading(false); // Hide the spinner
        }
    };

    // Scroll to the latest message when chatHistory changes
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div>
            <Card className="shadow-lg">
                <Card.Header className="bg-dark text-white">
                    <h4 className="text-center">Beech F Assistant</h4>
                    <p>Ask questions...</p>
                </Card.Header>
                <Card.Body>
                    {/* Chat window */}
                    <div
                        ref={chatContainerRef} // Reference to the chat container
                        className="chat-container mb-3"
                        style={{
                            maxHeight: "300px",
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            padding: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        {chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`d-flex mb-3 ${
                                    chat.sender === "user" ? "justify-content-end" : "justify-content-start"
                                }`}
                            >
                                <div
                                    className="message"
                                    style={{
                                        maxWidth: "70%",
                                        padding: "10px",
                                        borderRadius: "15px",
                                        backgroundColor: chat.sender === "user" ? "#f0f0f0" : "#e9ecef",
                                    }}
                                >
                                    {chat.message}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="d-flex justify-content-center">
                                <Spinner animation="border" variant="primary" />
                            </div>
                        )}
                    </div>
                    {/* Input form */}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control
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
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSend}>
                            Send
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChatBot;
