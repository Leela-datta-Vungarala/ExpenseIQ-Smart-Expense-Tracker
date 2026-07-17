import "./SummaryCards.css";

function SummaryCards({ dashboard }) {

    const cards = [

        {
            title: "Balance",
            value: dashboard.balance,
            icon: "💰"
        },

        {
            title: "Income",
            value: dashboard.totalIncome,
            icon: "📈"
        },

        {
            title: "Expense",
            value: dashboard.totalExpense,
            icon: "📉"
        },

        {
            title: "Transactions",
            value: dashboard.totalTransactions,
            icon: "📄"
        }

    ];

    return (

        <div className="summary-grid">

            {

                cards.map((card,index)=>(

                    <div className="summary-card" key={index}>

                        <div className="card-icon">

                            {card.icon}

                        </div>

                        <div>

                            <h4>{card.title}</h4>

                            <h2>

                                {card.title==="Transactions"

                                    ? card.value

                                    : `₹${card.value}`}

                            </h2>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default SummaryCards;