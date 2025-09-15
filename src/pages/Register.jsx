import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert(" Registered successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            alert(" Signed up with Google successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>

                <input
                    type="email"
                    className="w-full mb-3 p-2 rounded bg-gray-700 text-white border border-gray-600"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    className="w-full mb-4 p-2 rounded bg-gray-700 text-white border border-gray-600"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-semibold"
                >
                    Sign Up
                </button>

                {/* Google Sign Up Button */}
                <button
                    onClick={handleGoogleSignUp}
                    type="button"
                    className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold flex items-center justify-center gap-2"
                >
                    <img
                        src="https://img.icons8.com/color/16/000000/google-logo.png"
                        alt="google"
                    />
                    Sign up with Google
                </button>

                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 underline">Login</Link>
                </p>
                <p className="text-sm mt-2 text-center">
                    <Link to="/" className="text-gray-400 hover:text-white underline">← Back to Home</Link>
                </p>
            </form>
        </div>
    );
}
