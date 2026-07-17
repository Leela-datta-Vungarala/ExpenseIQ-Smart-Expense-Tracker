import "./ExportButton.css";
import { saveAs } from "file-saver";

function ExportButton({ transactions }) {

    function exportCSV() {

        const headers = [
            "Title",
            "Category",
            "Type",
            "Amount",
            "Date"
        ];

        const rows = transactions.map((t) => [

            t.title,
            t.category,
            t.type,
            t.amount,
            t.date

        ]);

        const csvContent =

            [
                headers,
                ...rows
            ]

                .map((e) => e.join(","))

                .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        saveAs(blob, "ExpenseIQ_Transactions.csv");

    }

    return (

        <button
            className="export-btn"
            onClick={exportCSV}
        >
            📄 Export CSV
        </button>

    );

}

export default ExportButton;