import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Login.css";
import api from "../../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Demo Account Details
    const demoEmail = "datta@gmail.com";
    const demoPassword = "12345";

    const handleLogin = async () => {

        if (!email || !password) {

            toast.error("Please enter email and password.");
            return;

        }

        setLoading(true);

        try {

            const response = await api.post("/users/login", {
                email,
                password
            });

            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("userName", response.data.name);

            toast.success(`Welcome back, ${response.data.name}! 👋`);

            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            toast.error("Invalid email or password.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1 className="logo">
                    ExpenseIQ
                </h1>

                <p className="subtitle">
                    Smart Personal Expense Tracker
                </p>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleLogin();
                        }
                    }}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {/* Demo Account */}

                <div className="demo-account">

                    <h3>🧪 Demo Account</h3>

                    <p><strong>Email</strong></p>

                    <div className="credential">
                        {demoEmail}
                    </div>

                    <p><strong>Password</strong></p>

                    <div className="credential">
                        {demoPassword}
                    </div>

                    <small>
                        Use these credentials to explore the application.
                    </small>

                </div>

                <p className="register-text">

                    Don't have an account?

                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Login;