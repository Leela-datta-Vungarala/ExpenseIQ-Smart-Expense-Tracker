import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

function Profile() {

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail") || "Not Available";

    const [dashboard, setDashboard] = useState({
        balance: 0,
        totalIncome: 0,
        totalExpense: 0,
        totalTransactions: 0
    });

    useEffect(() => {

        api.get(`/dashboard/summary/${userId}`)
            .then((response) => {
                setDashboard(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [userId]);

    const handleLogout = () => {

        localStorage.clear();

        toast.success("Logged out successfully 👋");

        navigate("/");

    };

    return (

        <>

            <Navbar />

            <div className="profile-container">

                <div className="profile-card">

                    <div className="profile-avatar">

                        {userName.charAt(0).toUpperCase()}

                    </div>

                    <h2>{userName}</h2>

                    <p>{userEmail}</p>

                    <div className="stats">

                        <div className="stat-card">

                            <h4>Balance</h4>

                            <h3>₹ {dashboard.balance}</h3>

                        </div>

                        <div className="stat-card">

                            <h4>Total Income</h4>

                            <h3>₹ {dashboard.totalIncome}</h3>

                        </div>

                        <div className="stat-card">

                            <h4>Total Expense</h4>

                            <h3>₹ {dashboard.totalExpense}</h3>

                        </div>

                        <div className="stat-card">

                            <h4>Transactions</h4>

                            <h3>{dashboard.totalTransactions}</h3>

                        </div>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </>

    );

}

export default Profile;