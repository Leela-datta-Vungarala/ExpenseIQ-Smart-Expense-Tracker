import "./ThemeToggle.css";

function ThemeToggle({ darkMode, setDarkMode }) {

    return (

        <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

    );

}

export default ThemeToggle;