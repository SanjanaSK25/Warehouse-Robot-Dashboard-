import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBots } from "../features/bots/botsSlice";
import { useNavigate } from "react-router-dom";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#ef4444"];

function AnalyticsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bots = useSelector((state) => state.bots?.list || []);
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    dispatch(updateBots());
    const interval = setInterval(() => dispatch(updateBots()), 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (bots.length > 0) {
      const latest = bots.map((bot) => ({
        id: bot.id,
        message: `Bot ${bot.id} → ${bot.status.toUpperCase()} | Battery ${bot.battery}%`,
        time: new Date().toLocaleTimeString(),
      }));
      setActivityLog((prev) => [...latest.slice(0, 3), ...prev].slice(0, 12));
    }
  }, [bots]);

  const criticalBots = bots.filter((b) => b.battery < 20);

  useEffect(() => {
    if (criticalBots.length > 0) {
      alert(
        `⚠️ CRITICAL ALERT!\n${criticalBots
          .map((b) => `Bot ${b.id} Battery: ${b.battery}%`)
          .join("\n")}`
      );
    }
  }, [criticalBots]);

  const totalBots = bots.length;
  const activeBots = bots.filter((b) => b.status === "busy").length;
  const idleBots = bots.filter((b) => b.status === "idle").length;
  const avgBattery =
    bots.length > 0
      ? Math.round(bots.reduce((a, b) => a + b.battery, 0) / bots.length)
      : 0;

  const statusData = [
    { name: "Idle", value: idleBots },
    { name: "Busy", value: activeBots },
    { name: "Charging", value: bots.filter((b) => b.status === "charging").length },
    { name: "Error", value: bots.filter((b) => b.status === "error").length },
  ];

  const batteryData = bots.map((bot) => ({
    name: `B${bot.id}`,
    battery: bot.battery,
  }));

  const speedData = bots.map((bot) => ({
    name: `B${bot.id}`,
    speed: bot.speed || 0,
  }));

  const isMobile = window.innerWidth < 768;

  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={() => navigate("/home")}>
        ← Back to Home
      </button>

      <h1 style={styles.title}>📊 Intelligent Warehouse Analytics</h1>

      {/* ✅ KPI GRID – RESPONSIVE */}
      <div
        style={{
          ...styles.kpiGrid,
          gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)",
        }}
      >
        <Kpi title="Total Bots" value={totalBots} />
        <Kpi title="Active Bots" value={activeBots} />
        <Kpi title="Idle Bots" value={idleBots} />
        <Kpi title="Avg Battery %" value={`${avgBattery}%`} />
      </div>

      {criticalBots.length > 0 && (
        <div style={styles.alertRed}>
          ⚠️ LOW BATTERY ALERT: {criticalBots.map((b) => `Bot ${b.id}`).join(", ")}
        </div>
      )}

      {/* ✅ PIE */}
      <div style={{ ...styles.chartBox, height: isMobile ? 260 : 320 }}>
        <h3>🤖 Bot Status Distribution</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={statusData} dataKey="value" outerRadius={isMobile ? 90 : 120}>
              {statusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={styles.tooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ BATTERY */}
      <div style={{ ...styles.chartBox, height: isMobile ? 260 : 320 }}>
        <h3>🔋 Battery Levels</h3>
        <ResponsiveContainer>
          <BarChart data={batteryData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={styles.tooltip} />
            <Bar dataKey="battery" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ SPEED */}
      <div style={{ ...styles.chartBox, height: isMobile ? 260 : 320 }}>
        <h3>⚡ Bot Speed Trend</h3>
        <ResponsiveContainer>
          <LineChart data={speedData}>
            <CartesianGrid stroke="#334155" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={styles.tooltip} />
            <Line dataKey="speed" stroke="#22c55e" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ✅ ACTIVITY */}
      <div style={styles.activityBox}>
        <h3>🕒 Live Bot Activity</h3>
        {activityLog.map((log, i) => (
          <p key={i} style={styles.activityRow}>
            {log.time} — {log.message}
          </p>
        ))}
      </div>
    </div>
  );
}

/* ✅ KPI CARD */
function Kpi({ title, value }) {
  return (
    <div style={styles.kpi}>
      <h4>{title}</h4>
      <h1>{value}</h1>
    </div>
  );
}

/* ✅ RESPONSIVE STYLES */
const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#020617,#020617)",
    color: "#fff",
  },

  backBtn: {
    width: "100%",
    marginBottom: 14,
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  title: {
    marginBottom: 18,
    fontSize: 24,
    fontWeight: 800,
  },

  kpiGrid: {
    display: "grid",
    gap: 14,
  },

  kpi: {
    background: "#020617",
    padding: 14,
    borderRadius: 14,
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
  },

  alertRed: {
    marginTop: 20,
    padding: 12,
    background: "#450a0a",
    color: "#fecaca",
    borderRadius: 12,
    fontSize: 14,
  },

  chartBox: {
    width: "100%",
    marginTop: 24,
  },

  tooltip: {
    background: "#020617",
    border: "1px solid #334155",
    color: "#fff",
  },

  activityBox: {
    marginTop: 24,
    background: "#020617",
    padding: 16,
    borderRadius: 14,
  },

  activityRow: {
    borderBottom: "1px solid #334155",
    padding: "6px 0",
    fontSize: 13,
  },
};

export default AnalyticsPage;
