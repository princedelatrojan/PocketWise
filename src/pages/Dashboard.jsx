import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { generateTip } from "../utils/aiTips";
import { Link, useNavigate } from "react-router-dom";
import BudgetCard from "../components/BudgetCard";
import Navbar from "../components/Navbar";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#34d399", "#60a5fa", "#facc15", "#f87171", "#a78bfa"];

export default function Dashboard() {
    const [budgets, setBudgets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const q = query(
            collection(db, "budgets"),
            where("uid", "==", auth.currentUser.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const budgetData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBudgets(budgetData);
        });

        return () => unsubscribe();
    }, []);

    const total = budgets.reduce((sum, item) => sum + item.amount, 0);

    const expenses = budgets.filter((b) => (b.type?.toLowerCase?.() || "") === "expense");
    const income = budgets.filter((b) => (b.type?.toLowerCase?.() || "") === "income");

    const recent = [...budgets].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const pieData = budgets.map((item) => ({
        name: item.category,
        value: item.amount,
    }));

    const barData = [
        {
            name: "Income",
            amount: income.reduce((sum, i) => sum + i.amount, 0),
        },
        {
            name: "Expenses",
            amount: expenses.reduce((sum, e) => sum + e.amount, 0),
        },
    ];

    const monthlySummary = budgets.reduce((summary, item) => {
        const type = item?.type?.toLowerCase?.() || "";
        const month = new Date(item.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!summary[month]) summary[month] = { income: 0, expenses: 0 };
        if (type === "income") summary[month].income += item.amount;
        if (type === "expense") summary[month].expenses += item.amount;
        return summary;
    }, {});

    const summaryData = Object.entries(monthlySummary).map(([month, data]) => ({
        month,
        ...data,
    }));

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />

            <div className="p-6 max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                    >
                        Sign Out
                    </button>
                </div>

                <p className="text-xl font-semibold mb-4">
                    Total Transactions Amount: {" "}
                    <span className="text-green-400 dark:text-green-300">
                        KES {total.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                </p>

                <p className="mt-10 text-lg italic bg-blue-100 dark:bg-gray-700 p-4 rounded border border-blue-300 dark:border-gray-600">
                    PocketWise AI Insight: {generateTip(budgets)}
                </p>

                <br />

                <div className="flex gap-4 mb-6">
                    <Link
                        to="/budgets"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                    >
                        ➕ Add / Edit Transactions
                    </Link>
                    <Link
                        to="/budgets"
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded shadow"
                    >
                        📋 View All Transactions
                    </Link>
                </div>

                <h2 className="text-2xl font-semibold mt-6 mb-3">Recent Transactions</h2>
                <div className="grid gap-4">
                    {recent.length > 0 ? (
                        recent.map((budget) => (
                            <div
                                key={budget.id}
                                className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row md:justify-between md:items-center"
                            >
                                <div>
                                    <p className="font-bold text-lg">{budget.title} - KES {budget.amount.toLocaleString("en-KE")}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                        {budget.category} | {budget.type} | {budget.date}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No recent budgets.</p>
                    )}
                </div>

                <h2 className="text-2xl font-semibold mt-10 mb-4">Budget Breakdown</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="h-64 bg-white dark:bg-gray-800 p-4 rounded shadow"
                    >
                        <h3 className="text-lg font-semibold mb-2">By Category</h3>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={80}
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="h-64 bg-white dark:bg-gray-800 p-4 rounded shadow"
                    >
                        <h3 className="text-lg font-semibold mb-2">Income vs Expenses</h3>
                        <ResponsiveContainer>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="amount" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>

                <h2 className="text-2xl font-semibold mt-10 mb-4">📅 Monthly Summary</h2>
                <div className="overflow-auto rounded bg-white dark:bg-gray-800 shadow">
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="p-3 text-left">Month</th>
                            <th className="p-3 text-left">Income</th>
                            <th className="p-3 text-left">Expenses</th>
                        </tr>
                        </thead>
                        <tbody>
                        {summaryData.map((entry, index) => (
                            <tr key={index} className="border-t border-gray-300 dark:border-gray-600">
                                <td className="p-3">{entry.month}</td>
                                <td className="p-3 text-green-500">KES {entry.income.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="p-3 text-red-500">KES {entry.expenses.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
