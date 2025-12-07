import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function HomeDashboard() {
  const bots = useSelector((state) => state.bots?.list || []);
  const tasks = useSelector((state) => state.tasks?.taskQueue || []);

  // KPI VALUES
  const totalBots = bots.length;
  const idleBots = bots.filter((b) => b.status === "idle").length;
  const errorBots = bots.filter((b) => b.status === "error").length;
  const activeTasks = bots.filter((b) => b.status === "busy").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  // THEME STATE
  const [dark, setDark] = useState(false);

  // APPLY THEME TO BODY
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(dark ? "dark" : "light");
  }, [dark]);

  // ANIMATED COUNTERS
  const useCounter = (value) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else setCount(start);
      }, 25);
      return () => clearInterval(interval);
    }, [value]);

    return count;
  };

  const animated = {
    bots: useCounter(totalBots),
    idle: useCounter(idleBots),
    error: useCounter(errorBots),
    active: useCounter(activeTasks),
    pending: useCounter(pendingTasks),
  };

  return (
    <div style={styles.page}>
      {/* ✅ TOP BAR */}

      <div style={styles.topBar} className="mobile-stack">
        <h1>🚀 Warehouse AI Command Center</h1>

        <div style={styles.navGroup} className="mobile-nav">
          <Link to="/queue" style={styles.navBtn}>📥 Live Queue</Link>
          <Link to="/tasks" style={styles.navBtn}>🛠 Task Allocation</Link>
          <Link to="/analytics" style={styles.navBtn}>📊 Analytics</Link>

          {/* ✅ NEW BOT STATUS BUTTON */}
          <Link to="/bots" style={styles.navBtn}>🤖 Bot Status</Link>

          <Link to="/map" style={styles.navBtn}>🗺 Live Map</Link>

          <button onClick={() => setDark(!dark)} style={styles.darkToggle}>
            🌗 Theme
          </button>
        </div>
      </div>

      {/* ✅ KPI GRID */}
      <div style={styles.grid} className="mobile-grid">
        <Kpi title="Total Bots" value={animated.bots} color="#3b82f6" trend="up" />
        <Kpi title="Active Tasks" value={animated.active} color="#8b5cf6" trend="up" />
        <Kpi title="Idle Bots" value={animated.idle} color="#22c55e" trend="up" />
        <Kpi title="Bots in Error" value={animated.error} color="#ef4444" trend="down" />
        <Kpi title="Pending Tasks" value={animated.pending} color="#f59e0b" trend="up" />
      </div>

      {/* ✅ ACTIVITY FEED */}
      <div
        style={{
          ...styles.feedCard,
          background: dark ? "#0f172a" : "rgba(255,255,255,0.96)",
          color: dark ? "#ffffff" : "#111827",
          boxShadow: dark
            ? "0 0 30px rgba(56,189,248,0.35)"
            : "0 12px 30px rgba(0,0,0,0.35)",
        }}
      >
        <h3>📡 Live Activity Feed</h3>
        <ul style={styles.feedList}>
          <li>✅ Bot B4 completed pickup</li>
          <li>📦 New task added to queue</li>
          <li>⚡ Auto assignment triggered</li>
          <li>🧠 AI optimized routing</li>
        </ul>
      </div>
    </div>
  );
}

/* ✅ KPI CARD */
function Kpi({ title, value, color, trend }) {
  return (
    <div
      className="kpi-card"
      style={{
        borderTop: `5px solid ${color}`,
        boxShadow: `0 0 25px ${color}88`,
      }}
    >
      <h3>{title}</h3>
      <h1 style={{ color }}>{value}</h1>
      <span style={{ color, fontWeight: "600" }}>
        {trend === "up" ? "↑ Trending" : "↓ Dropping"}
      </span>
    </div>
  );
}

/* ✅ STYLES */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  navGroup: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  navBtn: {
    textDecoration: "none",
    background: "linear-gradient(to right,#2563eb,#1d4ed8)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "999px",
    fontWeight: "700",
    boxShadow: "0 0 15px #2563eb88",
  },

  darkToggle: {
    background: "black",
    color: "white",
    border: "1px solid #94a3b8",
    padding: "10px 18px",
    borderRadius: "999px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "26px",
  },

  feedCard: {
    marginTop: "45px",
    padding: "26px",
    borderRadius: "18px",
    transition: "0.3s ease",
  },

  feedList: {
    marginTop: "10px",
    lineHeight: "1.9",
  },
};

export default HomeDashboard;
