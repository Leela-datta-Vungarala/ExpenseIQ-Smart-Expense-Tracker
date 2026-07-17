import "./RecentTransactions.css";

function RecentTransactions({ transactions }) {

    const recent = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    return (

        <div className="recent-card">

            <h2>🕒 Recent Transactions</h2>

            {recent.length === 0 ? (

                <p>No recent transactions.</p>

            ) : (

                recent.map((transaction) => (

                    <div
                        className="recent-item"
                        key={transaction.id}
                    >

                        <div>

                            <h4>{transaction.title}</h4>

                            <span>{transaction.category}</span>

                        </div>

                        <div>

                            <strong
                                className={
                                    transaction.type === "Income"
                                        ? "income"
                                        : "expense"
                                }
                            >
                                {transaction.type === "Income"
                                    ? "+"
                                    : "-"}
                                ₹{transaction.amount}
                            </strong>

                            <p>{transaction.date}</p>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default RecentTransactions;