"use client";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        setMessages((prev) => [...prev, { text: input, sender: "user" }]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            if (data.reply) {
                setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
            }
        } catch (error) {
            console.error("Error fetching response:", error);
            setMessages((prev) => [...prev, { text: "Error getting response.", sender: "bot" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4">
            {isOpen && (
                <div className="w-85 h-140 scroll-smooth bg-white shadow-lg rounded-xl p-4 flex flex-col">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-lg font-semibold">Stocky</h3>
                        <button onClick={toggleChat} className="text-gray-500">❌</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        {messages.map((msg, index) => (
                            <div key={index} className={`p-2 rounded-md my-1 max-w-[75%] ${
                                msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
                            }`}>
                                {msg.text}
                            </div>
                        ))}
                        {loading && <div className="p-2 rounded-md my-1 bg-gray-200 max-w-[75%]">Thinking...</div>}
                    </div>
                    <div className="flex items-center border-t pt-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 p-2 border rounded-lg"
                            placeholder="Ask about trading..."
                        />
                        <button onClick={handleSend} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
            <button onClick={toggleChat} className="bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                <MessageCircle size={24} />
            </button>
        </div>
    );
};

export default Chatbot;
