import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">💸 PocketWise</h1>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">Home</Link>
                        <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:underline">Dashboard</Link>
                        <Link to="/budgets" className="text-gray-700 dark:text-gray-200 hover:underline">Budgets</Link>
                        <Link to="/ai" className="text-gray-700 dark:text-gray-200 hover:underline">AI</Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-700 dark:text-gray-200 md:hidden"
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 pb-4 space-y-2">
                        <Link to="/" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">Home</Link>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">Dashboard</Link>
                        <Link to="/budgets" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">Budgets</Link>
                        <Link to="/ai" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200">AI</Link>

                    </div>
                )}
            </nav>

            {/* Spacer to push down page content so it doesn’t get hidden behind fixed navbar */}
            <div className="h-20 md:h-24" />
        </>
    );
}
