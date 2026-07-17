import "./Navbar.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

function Navbar() {

    const navigate = useNavigate();

    const userName = localStorage.getItem("userName");

    const [showMenu, setShowMenu] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setShowMenu(false);
            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const handleLogout = () => {

        localStorage.clear();

        toast.success("Logged out successfully 👋");

        navigate("/");

    };

    return (

        <header className="navbar">

            <div
                className="logo"
                onClick={() => navigate("/dashboard")}
            >
                <h2>ExpenseIQ</h2>
            </div>

            <div className="navbar-right">

                <button className="notification-btn">
                    🔔
                </button>

                <div
                    className="profile"
                    ref={menuRef}
                >

                    <div
                        className="profile-info"
                        onClick={() => setShowMenu(!showMenu)}
                    >

                        <div className="avatar">

                            {userName
                                ? userName.charAt(0).toUpperCase()
                                : "U"}

                        </div>

                        <span>{userName}</span>

                    </div>

                    {showMenu && (

                        <div className="profile-dropdown">

                            <div
                                className="dropdown-item"
                                onClick={() => {
                                    navigate("/profile");
                                    setShowMenu(false);
                                }}
                            >

                                <FaUserCircle />

                                <span>Profile</span>

                            </div>

                            <div
                                className="dropdown-item logout"
                                onClick={handleLogout}
                            >

                                <IoLogOutOutline />

                                <span>Logout</span>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}

export default Navbar;