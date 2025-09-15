import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-5xl font-bold mb-4 text-center">
                PocketWise
            </h1>
            <p className="text-lg mb-8 text-center max-w-xl">
                Take control of your finances. PocketWise helps you plan, track, and budget like a boss.
            </p>
            <div className="flex gap-4">
                <Link to="/login">
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md text-lg">
                        Sign In
                    </button>
                </Link>
                <Link to="/register">
                    <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-md text-lg border border-white">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    );
}
