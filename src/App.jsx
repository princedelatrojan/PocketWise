import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { auth } from "./firebase/firebaseConfig";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import BudgetPage from "./pages/BudgetPage";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;

    return (
        <>
            <Routes>
                {/* Public page */}
                <Route path="/" element={<Home />} />

                {/* Auth-protected pages */}
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/ai" element={user ? <AIAssistant /> : <Navigate to="/login" />} />
                <Route path="/budgets" element={user ? <BudgetPage /> : <Navigate to="/login" />} />

                {/* Auth pages for non-logged in users */}
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            </Routes>

            {/* Toast notifications */}
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        </>
    );
}

export default App;
