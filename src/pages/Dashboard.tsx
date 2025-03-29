import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/Dashboard.css"
import {useEffect, useState} from "react";

type Task = {
    id: number;
    userId: string;
    text: string;
    completed: boolean;
}

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");

    const userId = user?.id || "";

    const fetchTasks = async () => {
        const res = await fetch(`http://localhost:3001/tasks?userId=${userId}`);
        const data = await res.json();
        setTasks(data);
    };

    useEffect(() => {
        if (userId) fetchTasks();
    }, [userId]);

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTask.trim()) return;

        const task = {
            userId,
            text: newTask,
            completed: false
        };

        const res = await fetch(`http://localhost:3001/tasks`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        });

        const created = await res.json();
        setTasks([...tasks, created]);
        setNewTask("");
    }

    const handleCompleteTask = async (taskId: number) => {
        await fetch(`http://localhost:3001/tasks/${taskId}`, {
            method: "DELETE",
        });
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const navigate = useNavigate();

    const handleLougout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <div className={"dashboard"}>
                <h2>Welcome, {user?.email}!</h2>
                <button onClick={handleLougout}>Logout</button>
            </div>

            <div className={"tasks-container"}>
                <div className={"tasks"}>
                    <form onSubmit={handleAddTask} className={"task-form"}>
                        <input
                            type={"text"}
                            placeholder={"Enter a task"}
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                        />
                        <button type="submit">Add Task</button>
                    </form>

                    <div className={"task-list"}>
                        {tasks.length === 0 ? (<p>Add your tasks for the day</p>) : (tasks.map((task) => (
                            <div key={task.id} className={"task-item"}>
                                <span className={"task-text"}>{task.text}</span>
                                <button onClick={() => handleCompleteTask(task.id)}>Complete</button>
                            </div>
                        )))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard;