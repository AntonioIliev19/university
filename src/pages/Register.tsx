import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import "../assets/css/Register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const existingRes = await fetch(`http://localhost:3001/users?email=${email}`);
            const existingUser = await existingRes.json();

            if (existingUser.length > 0) {
                setError("User already exists");
                return;
            }

            const newUser = { email, password };

            const res = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser),
            });

            if (res.ok) {
                const user = await res.json();
                login({ email: user.email });
                navigate("/dashboard");
            } else {
                setError("Registration Failed");
            }
        } catch (err) {
            console.log("Register error: ", err);
            setError("Something went wrong");
        }

    };

    const redirectLogin = () => {
        const path = '/login';
        navigate(path);
    }

    return (
        <div className={"register-container"}>
            <form onSubmit={handleRegister} className={"register-form"}>
                <h2>Register</h2>

                <div className={"register-inputs"}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <button type="submit">Register</button>
                <button onClick={redirectLogin}>Sign In</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <div className="login-illustration">
                <svg viewBox="0 0 960 1080" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                    <rect width="100%" height="100%" fill="#d5e9c7"/>
                    <circle cx="850" cy="150" r="40" fill="#f8cc72"/>
                    <rect x="600" y="600" width="100" height="300" fill="#25563d"/>
                    <rect x="720" y="650" width="100" height="250" fill="#75a599"/>
                    <rect x="840" y="580" width="80" height="320" fill="#699a6d"/>
                    <rect x="500" y="700" width="100" height="200" fill="#a6c298"/>
                    <polygon points="600,600 640,560 720,560 680,600" fill="#75a599"/>
                    <polygon points="720,650 760,610 840,610 800,650" fill="#75a599"/>
                    <circle cx="780" cy="880" r="30" fill="#25563d"/>
                    <circle cx="520" cy="880" r="30" fill="#699a6d"/>
                    <ellipse cx="900" cy="900" rx="40" ry="50" fill="#a6c298"/>
                    <path d="M0,1000 Q400,900 800,1020 T960,1080 L0,1080 Z" fill="#a6c298"/>
                </svg>
            </div>
        </div>
    );
};

export default Register;