import "./TransactionTable.css";

function TransactionTable({
    transactions,
    onEdit,
    onDelete
}) {

    if (transactions.length === 0) {
        return (
            <div className="no-transactions">
                <h3>No Transactions Found</h3>
            </div>
        );
    }

    return (

        <div className="transaction-table-container">

            <table className="transaction-table">

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.map((transaction) => (

                        <tr key={transaction.id}>

                            <td>{transaction.title}</td>

                            <td>{transaction.category}</td>

                            <td>

                                <span
                                    className={
                                        transaction.type === "Income"
                                            ? "income-badge"
                                            : "expense-badge"
                                    }
                                >
                                    {transaction.type}
                                </span>

                            </td>

                            <td
                                className={
                                    transaction.type === "Income"
                                        ? "income-text"
                                        : "expense-text"
                                }
                            >
                                ₹ {transaction.amount}
                            </td>

                            <td>{transaction.date}</td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() => onEdit(transaction)}
                                >
                                    ✏ Edit
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(transaction.id)}
                                >
                                    🗑 Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default TransactionTable;