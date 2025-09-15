import { useEffect, useState } from "react";
import { addBudget } from "../utils/firebase";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function BudgetForm({
                                       onSave,
                                       editMode = false,
                                       existingData = null,
                                       onUpdate,
                                       cancelEdit,
                                   }) {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        type: "Expense",
    });

    useEffect(() => {
        if (editMode && existingData) {
            setForm(existingData);
        }
    }, [editMode, existingData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const date = new Date().toISOString().split("T")[0];
        const createdAt = new Date();

        try {
            if (editMode && existingData) {
                await onUpdate({ ...form });
                toast.success("Budget updated successfully");
            } else {
                await addBudget({ ...form, uid, date, createdAt });
                toast.success("Budget added successfully");
                onSave();
            }

            setForm({ title: "", amount: "", category: "", type: "Expense" });
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6 grid md:grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <input
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-2 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
            />
            <input
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-2 rounded"
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) =>
                    setForm({ ...form, amount: parseFloat(e.target.value) })
                }
                required
            />
            <input
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-2 rounded"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
            />
            <select
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-2 rounded"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
            </select>

            <div className="flex items-center gap-2 mt-2">
                <motion.button
                    type="submit"
                    whileTap={{ scale: 0.95 }}
                    className={`$${
                        editMode ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
                    } text-black px-4 py-2 rounded shadow transition-all`}
                >
                    {editMode ? "Update" : "Add"}
                </motion.button>

                {editMode && (
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow transition-all"
                        onClick={cancelEdit}
                    >
                        Cancel
                    </motion.button>
                )}
            </div>
        </motion.form>
    );
}
