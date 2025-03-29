import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/Dashboard.css"

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLougout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard">
            <h2>Welcome, {user?.email}!</h2>
            <p>More features coming soon!</p>
            <button onClick={handleLougout}>Logout</button>
        </div>
    )
}

export default Dashboard;