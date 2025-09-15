export default function BudgetCard({ category, amount, createdAt }) {
    return (
        <div className="p-4 border shadow rounded bg-black">
            <h2 className="text-xl  font-semibold">{category}</h2>
            <p className="text-lg text-gray-600">KES {amount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p className="text-sm text-gray-400">
                {createdAt?.seconds
                    ? new Date(createdAt.seconds * 1000).toLocaleString()
                    : "Date not available"}
            </p>
        </div>
    );
}
