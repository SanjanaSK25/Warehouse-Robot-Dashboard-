import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeNextTask } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

function TaskQueuePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks.taskQueue || []);
  const completedTasks = useSelector((state) => state.tasks.completedCount);

  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(removeNextTask());
    }, 3000);
    return () => clearInterval(timer);
  }, [dispatch]);

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  const isDark = document.body.classList.contains("dark");

  const styles = {
    page: {
      padding: "20px",
      minHeight: "100vh",
      background: isDark
        ? "linear-gradient(120deg,#020617,#020024)"
        : "linear-gradient(120deg,#eef2ff,#f8fafc)",
      color: isDark ? "#e5e7eb" : "#111827",
    },

    backBtn: {
      width: "100%",
      marginBottom: "16px",
      padding: "10px",
      borderRadius: "999px",
      border: "none",
      background: "linear-gradient(to right,#2563eb,#1d4ed8)",
      color: "#fff",
      fontWeight: 600,
    },

    subtitle: {
      marginBottom: "16px",
      opacity: 0.7,
      fontSize: 14,
    },

    kpiGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))",
      gap: "12px",
      marginBottom: "20px",
    },

    kpi: {
      background: isDark ? "#020617" : "#fff",
      padding: "14px",
      borderRadius: "14px",
    },

    tableWrap: {
      background: isDark ? "#020617" : "#fff",
      borderRadius: "18px",
      padding: 10,
      boxShadow: isDark
        ? "0 10px 30px rgba(0,0,0,0.7)"
        : "0 10px 30px rgba(0,0,0,0.18)",
      overflow: "hidden",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: 12,
    },

    row: {
      borderBottom: isDark ? "1px solid #334155" : "1px solid #e5e7eb",
    },

    th: {
      padding: "10px",
      background: isDark ? "#020617" : "#f1f5f9",
      textAlign: "left",
      fontSize: 12,
    },

    td: {
      padding: "10px",
      fontSize: 12,
      wordBreak: "break-word",
    },

    empty: {
      padding: 20,
      textAlign: "center",
      color: "green",
      fontWeight: "bold",
    },

    /* ✅ MOBILE CARD */
    mobileCard: {
      background: isDark ? "#020617" : "#fff",
      padding: 14,
      borderRadius: 16,
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      marginBottom: 12,
    },
  };

  return (
    <div style={styles.page}>
      {/* ✅ BACK BUTTON */}
      <button style={styles.backBtn} onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h1 style={{ fontSize: 22 }}>📥 Live Task Queue</h1>
      <p style={styles.subtitle}>
        Auto-assign every 3s • Live Time: {clock}
      </p>

      {/* ✅ KPI */}
      <div style={styles.kpiGrid}>
        <Kpi title="Total" value={totalTasks} color="#2563eb" />
        <Kpi title="Pending" value={pendingTasks} color="orange" />
        <Kpi title="Done" value={completedTasks} color="green" />
      </div>

      {/* ✅ DESKTOP TABLE */}
      <div className="desktop-only" style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Pickup</th>
              <th style={styles.th}>Drop</th>
              <th style={styles.th}>Priority</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="6" style={styles.empty}>
                  ✅ Queue Clear — All tasks processed
                </td>
              </tr>
            ) : (
              tasks.map((task) => (
                <tr key={task.id} style={styles.row}>
                  <td style={styles.td}>{task.id}</td>
                  <td style={styles.td}>{task.pickup}</td>
                  <td style={styles.td}>{task.drop}</td>
                  <td style={styles.td}>
                    <span style={priorityBadge(task.priority)}>
                      {task.priority}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={statusBadge(task.status)}>
                      {task.status}
                    </span>
                  </td>
                  <td style={styles.td}>{task.createdAt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ MOBILE CARDS */}
      <div className="mobile-only">
        {tasks.length === 0 ? (
          <div style={styles.empty}>✅ Queue Clear — All tasks processed</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.mobileCard}>
              <p><b>ID:</b> {task.id}</p>
              <p><b>Pickup:</b> {task.pickup}</p>
              <p><b>Drop:</b> {task.drop}</p>
              <p>
                <b>Priority:</b>{" "}
                <span style={priorityBadge(task.priority)}>
                  {task.priority}
                </span>
              </p>
              <p>
                <b>Status:</b>{" "}
                <span style={statusBadge(task.status)}>
                  {task.status}
                </span>
              </p>
              <p style={{ fontSize: 12, opacity: 0.7 }}>
                {task.createdAt}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ✅ KPI */
function Kpi({ title, value, color }) {
  return (
    <div style={{ borderLeft: `4px solid ${color}`, padding: 10 }}>
      <p style={{ fontSize: 12 }}>{title}</p>
      <h2 style={{ margin: 0, color }}>{value}</h2>
    </div>
  );
}

/* ✅ COLOR BADGES */
const priorityBadge = (p) => ({
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: 11,
  color: "#fff",
  background: p === "High" ? "#ef4444" : p === "Medium" ? "#f59e0b" : "#22c55e",
});

const statusBadge = (s) => ({
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: 11,
  color: "#fff",
  background: s === "done" ? "#22c55e" : "#2563eb",
});

export default TaskQueuePage;
