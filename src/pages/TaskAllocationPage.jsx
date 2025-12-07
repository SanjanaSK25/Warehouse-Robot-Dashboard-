import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../features/tasks/tasksSlice";

function TaskAllocationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [comments, setComments] = useState("");
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.body.classList.contains("dark"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pickup.trim() || !drop.trim()) {
      alert("Pickup & Drop required");
      return;
    }

    const newTask = { pickup, drop, priority, comments };

    dispatch(addTask(newTask));

    setPreview({
      ...newTask,
      time: new Date().toLocaleTimeString(),
    });

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);

    setPickup("");
    setDrop("");
    setPriority("Medium");
    setComments("");
  };

  return (
    <div
      style={{
        ...styles.page,
        background: isDark
          ? "linear-gradient(135deg,#020617,#020617)"
          : "linear-gradient(135deg,#eef2ff,#f8fafc)",
        color: isDark ? "#fff" : "#0f172a",
      }}
    >
      <button style={styles.backBtn} onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h1 style={styles.title}>🛠 Task Allocation Command Center</h1>
      <p style={styles.subtitle}>
        Create tasks and instantly push them into the live automation queue.
      </p>

      {/* ✅ RESPONSIVE GRID */}
      <div style={styles.layout}>
        {/* ✅ FORM */}
        <div style={{ ...styles.card, background: isDark ? "#020617" : "#fff" }}>
          <h2>Create New Task</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label>Pickup Location</label>
            <input value={pickup} onChange={(e) => setPickup(e.target.value)} style={inputStyle(isDark)} />

            <label>Drop Location</label>
            <input value={drop} onChange={(e) => setDrop(e.target.value)} style={inputStyle(isDark)} />

            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} style={inputStyle(isDark)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <label>Comments</label>
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} rows={3} style={inputStyle(isDark)} />

            <button type="submit" style={styles.btn}>
              ➕ Allocate Task
            </button>

            {success && (
              <div style={styles.success}>
                ✅ Task Added
                <button
                  type="button"
                  onClick={() => navigate("/queue")}
                  style={styles.queueBtn}
                >
                  View Queue →
                </button>
              </div>
            )}
          </form>
        </div>

        {/* ✅ PREVIEW */}
        <div style={{ ...styles.card, background: isDark ? "#020617" : "#fff" }}>
          <h2>Live Task Preview</h2>

          {preview ? (
            <div style={styles.preview}>
              <p><b>Pickup:</b> {preview.pickup}</p>
              <p><b>Drop:</b> {preview.drop}</p>
              <p>
                <b>Priority:</b>{" "}
                <span style={priorityColor(preview.priority)}>
                  {preview.priority}
                </span>
              </p>
              <p><b>Time:</b> {preview.time}</p>
              <p>{preview.comments || "No comments"}</p>
            </div>
          ) : (
            <p style={{ opacity: 0.7 }}>No task created yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ✅ INPUT STYLE */
const inputStyle = (dark) => ({
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #94a3b8",
  background: dark ? "#020617" : "#fff",
  color: dark ? "#fff" : "#000",
});

/* ✅ PRIORITY COLOR */
const priorityColor = (p) => ({
  color: p === "High" ? "#ef4444" : p === "Medium" ? "#f59e0b" : "#22c55e",
});

/* ✅ RESPONSIVE PREMIUM STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginTop: 10,
  },
  subtitle: {
    marginBottom: "24px",
    fontSize: 14,
    opacity: 0.8,
  },
  backBtn: {
    width: "100%",
    marginBottom: "12px",
    padding: "10px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  /* ✅ MOBILE FIRST GRID */
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "22px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  btn: {
    marginTop: "14px",
    padding: "14px",
    borderRadius: "14px",
    background: "#2563eb",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  success: {
    marginTop: "12px",
    padding: "10px",
    background: "#dcfce7",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  queueBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "999px",
    cursor: "pointer",
  },

  preview: {
    marginTop: "18px",
    lineHeight: "1.8",
    fontSize: 14,
  },
};

export default TaskAllocationPage;
