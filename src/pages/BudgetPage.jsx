// pages/BudgetPage.jsx
import { useEffect, useState } from "react";
import { getBudgets, deleteBudget, updateBudget } from "../utils/firebase";
import { auth } from "../firebase/firebaseConfig";
import BudgetForm from "../components/BudgetForm";
import Navbar from "../components/Navbar";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function BudgetPage() {
    const [budgets, setBudgets] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();

    const fetchBudgets = async () => {
        const uid = auth.currentUser.uid;
        const data = await getBudgets(uid);
        setBudgets(data);
    };

    const handleDelete = async (id) => {
        await deleteBudget(id);
        fetchBudgets();
    };

    const handleEdit = (budget) => {
        setEditMode(true);
        setEditData(budget);
    };

    const handleUpdate = async (updatedData) => {
        await updateBudget(updatedData.id, updatedData);
        setEditMode(false);
        setEditData(null);
        fetchBudgets();
    };

    const handleSignOut = async () => {
        await signOut(auth);
        navigate("/login");
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Navbar />

            <div className="p-6 max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold">Manage Budgets</h2>
                    <button
                        onClick={handleSignOut}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                    >
                        Sign Out
                    </button>
                </div>

                <BudgetForm
                    onSave={fetchBudgets}
                    editMode={editMode}
                    existingData={editData}
                    onUpdate={handleUpdate}
                    cancelEdit={() => {
                        setEditMode(false);
                        setEditData(null);
                    }}
                />

                {budgets.length === 0 && <p className="text-gray-500 dark:text-gray-400 text-center">No budgets yet! Add your first one.</p>}

                <ul className="mt-6 space-y-4">
                    {budgets.map((item) => (
                        <li
                            key={item.id}
                            className="p-4 bg-white dark:bg-gray-800 rounded shadow border border-gray-300 dark:border-gray-600 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-bold text-lg">
                                    {item.title} - <span className="text-green-500">KES {item.amount.toLocaleString()}</span>
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.category} | {item.type} | {item.date}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                                    onClick={() => handleEdit(item)}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
