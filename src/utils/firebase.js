// src/utils/firebase.js
import { db, auth } from "../firebase/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    where
} from "firebase/firestore";

const budgetCollection = collection(db, "budgets");

// CREATE
export const addBudget = async (data) => {
    return await addDoc(budgetCollection, data);
};

// READ
export const getBudgets = async (uid) => {
    const q = query(budgetCollection, where("uid", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// DELETE
export const deleteBudget = async (id) => {
    return await deleteDoc(doc(db, "budgets", id));
};

// UPDATE
export const updateBudget = async (id, data) => {
    return await updateDoc(doc(db, "budgets", id), data);
};
