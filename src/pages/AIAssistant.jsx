import { useState } from "react";
import { askAI } from "../utils/openrouter";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function AIAssistant() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAsk = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse("PocketWise AI is thinking... ");
        const result = await askAI(input);
        setResponse(result);
        setLoading(false);
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-green-800">PocketWise AI</h2>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                    >
                        Sign Out
                    </button>
                </div>

                <motion.textarea
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full bg-gray-800 text-gray-100 border border-gray-600 p-4 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-800"
                    rows={5}
                    placeholder="Ask PocketWise AI something like 'How can I save more this month?'"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button
                    onClick={handleAsk}
                    className="bg-green-800 hover:bg-green-600 text-white px-6 py-2 rounded font-semibold shadow"
                    disabled={loading}
                >
                    {loading ? "PocketWise AI is Thinking..." : "Ask PocketWise AI"}
                </button>

                {response && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 bg-gray-800 border border-gray-700 p-6 rounded-lg shadow-lg"
                    >
                        <h4 className="text-lg font-semibold text-green-800 mb-2">PocketWise AI says:</h4>
                        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{response}</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
