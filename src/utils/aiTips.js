export function generateTip(budgets) {
    if (!budgets.length) {
        return "📊 Start by adding your income and expenses to unlock personalized insights tailored to your financial flow.";
    }

    const total = budgets.reduce((sum, b) => sum + b.amount, 0);

    const expenses = budgets.filter((b) => b.type === "Expense");
    const income = budgets.filter((b) => b.type === "Income");

    const totalExpenses = expenses.reduce((sum, b) => sum + b.amount, 0);
    const totalIncome = income.reduce((sum, b) => sum + b.amount, 0);

    const topCategory = expenses.reduce(
        (max, b) => (b.amount > max.amount ? b : max),
        expenses[0]
    );

    const numSmallExpenses = expenses.filter((b) => b.amount < 200).length;

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const thisMonthExpenses = expenses
        .filter((b) => new Date(b.date) > lastMonth)
        .reduce((sum, b) => sum + b.amount, 0);

    // Financial Insights
    if (totalIncome === 0 && totalExpenses > 0) {
        return "You have expenses but no recorded income. Be sure to track all income sources for a balanced view.";
    }

    if (totalIncome > 0 && totalExpenses > totalIncome) {
        return "⚠️ You're operating at a deficit—your spending exceeds your income. Time to audit non-essentials and create a leaner plan.";
    }

    if (topCategory && topCategory.amount > totalExpenses * 0.5) {
        return `🔍 More than 50% of your spending is going to "${topCategory.category}". Explore alternatives or set monthly caps for that category.`;
    }

    if (numSmallExpenses >= 10) {
        return "💸 Frequent small expenses are adding up. Consider batching purchases or setting a daily micro-budget.";
    }

    if (thisMonthExpenses > totalIncome * 0.8) {
        return "📈 You've used over 80% of your income this month. Reassess variable expenses and pause unnecessary buys.";
    }

    if (totalIncome > totalExpenses && totalExpenses > 0) {
        return "✅ You're spending less than you earn. Consider automating savings or investing the surplus to build long-term wealth.";
    }

    return "💡 Keep tracking your finances consistently. The more data you log, the sharper and more personalized your insights will become.";
}
