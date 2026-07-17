import "./Dashboard.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import Navbar from "../../components/Navbar/Navbar";
import SummaryCards from "../../components/SummaryCards/SummaryCards";
import TransactionTable from "../../components/TransactionTable/TransactionTable";
import AddTransactionModal from "../../components/AddTransactionModal/AddTransactionModal";
import Charts from "../../components/Charts/Charts";
import SearchFilter from "../../components/SearchFilter/SearchFilter";
import ExportButton from "../../components/ExportButton/ExportButton";
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

function Dashboard() {

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    const [dashboard, setDashboard] = useState({
        balance: 0,
        totalIncome: 0,
        totalExpense: 0,
        totalTransactions: 0
    });

    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterCategory, setFilterCategory] = useState("All");

    // Dark Mode
    const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
);
useEffect(() => {

    localStorage.setItem(
        "theme",
        darkMode ? "dark" : "light"
    );

}, [darkMode]);

    function loadDashboard() {

        api.get(`/dashboard/summary/${userId}`)
            .then((response) => {

                setDashboard(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }

    function loadTransactions() {

        api.get(`/transactions/${userId}`)
            .then((response) => {

                setTransactions(response.data);

            })
            .catch((error) => {

                console.error(error);

            });

    }

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete Transaction?",
            text: "This action cannot be undone.",
            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",

            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",

            reverseButtons: true

        });

        if (!result.isConfirmed) return;

        try {

            await api.delete(`/transactions/${id}`);

            loadTransactions();
            loadDashboard();

            toast.success("Transaction deleted successfully!");

        } catch (error) {

            console.error(error);

            toast.error("Failed to delete transaction.");

        }

    }

    function handleEdit(transaction) {

        setSelectedTransaction(transaction);
        setShowModal(true);

    }

    function handleAddTransaction() {

        setSelectedTransaction(null);
        setShowModal(true);

    }

    function handleTransactionAdded() {

        loadDashboard();
        loadTransactions();

    }

    const filteredTransactions = transactions.filter((transaction) => {

        const matchesSearch = transaction.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesType =
            filterType === "All" ||
            transaction.type === filterType;

        const matchesCategory =
            filterCategory === "All" ||
            transaction.category === filterCategory;

        return (
            matchesSearch &&
            matchesType &&
            matchesCategory
        );

    });

    useEffect(() => {

        loadDashboard();
        loadTransactions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <>

            <Navbar />

            <div className={darkMode ? "dashboard-content dark" : "dashboard-content"}>

                <div className="welcome-section">

                    <div>

                        <h1>
                            Welcome Back, {userName} 👋
                        </h1>

                        <p>
                            Track your income and expenses effortlessly.
                        </p>

                    </div>

                    <div className="top-buttons">

                        <ThemeToggle
                            darkMode={darkMode}
                            setDarkMode={setDarkMode}
                        />

                        <ExportButton
                            transactions={filteredTransactions}
                        />

                        <button
                            className="add-btn"
                            onClick={handleAddTransaction}
                        >
                            + Add Transaction
                        </button>

                    </div>

                </div>

                <SummaryCards dashboard={dashboard} />

                <SearchFilter

                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}

                    filterType={filterType}
                    setFilterType={setFilterType}

                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}

                    transactions={transactions}

                />

                <TransactionTable
                    transactions={filteredTransactions}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                <Charts
                    transactions={filteredTransactions}
                />

                <RecentTransactions
                    transactions={filteredTransactions}
                />

            </div>

            <AddTransactionModal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                    setSelectedTransaction(null);
                }}
                onTransactionAdded={handleTransactionAdded}
                transaction={selectedTransaction}
            />

        </>

    );

}

export default Dashboard;