import "./Charts.css";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

function Charts({ transactions }) {

    let income = 0;
    let expense = 0;

    const categoryTotals = {};

    transactions.forEach((transaction) => {

        if (transaction.type === "Income") {
            income += Number(transaction.amount);
        } else {
            expense += Number(transaction.amount);
        }

        if (transaction.type === "Expense") {

            categoryTotals[transaction.category] =
                (categoryTotals[transaction.category] || 0)
                + Number(transaction.amount);

        }

    });

    const pieData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                data: [income, expense],
                backgroundColor: [
                    "#22c55e",
                    "#ef4444"
                ]
            }
        ]
    };

    const barData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: "Expenses",
                data: Object.values(categoryTotals),
                backgroundColor: "#ff4f87"
            }
        ]
    };

    return (

        <div className="charts-container">

            <div className="chart-card">

                <h3>Income vs Expense</h3>

                <Pie data={pieData} />

            </div>

            <div className="chart-card">

                <h3>Expenses by Category</h3>

                <Bar data={barData} />

            </div>

        </div>

    );

}

export default Charts;