import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const STATUS_COLORS = {
  idle: "#22c55e",
  busy: "#3b82f6",
  charging: "#facc15",
  error: "#ef4444",
};

function MapPage() {
  const bots = useSelector((state) => state.bots?.list || []);
  const [svgContent, setSvgContent] = useState(null);
  const [positions, setPositions] = useState({});
  const [error, setError] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const navigate = useNavigate();

  const isDark = document.body.classList.contains("dark");

  const BG_MAIN = isDark
    ? "linear-gradient(120deg,#020617,#020024)"
    : "linear-gradient(120deg,#eef2ff,#f8fafc)";

  const CARD_BG = isDark ? "#020617" : "#ffffff";
  const PANEL_BG = isDark ? "#020617" : "#ffffff";
  const TEXT = isDark ? "#e5e7eb" : "#111827";
  const MUTED = isDark ? "#9ca3af" : "#6b7280";
  const BORDER = isDark ? "#334155" : "#e5e7eb";

  /* ✅ INIT POSITIONS */
  useEffect(() => {
    setPositions((prev) => {
      const next = { ...prev };
      bots.forEach((b) => {
        if (!next[b.id]) {
          next[b.id] = {
            x: Math.random() * 90 + 5,
            y: Math.random() * 80 + 10,
          };
        }
      });
      return next;
    });
  }, [bots]);

  /* ✅ AUTO MOVEMENT */
  useEffect(() => {
    if (!isAnimating || !bots.length) return;

    const id = setInterval(() => {
      setPositions((prev) => {
        const next = { ...prev };
        bots.forEach((b) => {
          const current = next[b.id] || { x: 50, y: 50 };
          let nx = current.x + (Math.random() * 8 - 4);
          let ny = current.y + (Math.random() * 8 - 4);

          nx = Math.max(4, Math.min(96, nx));
          ny = Math.max(8, Math.min(92, ny));

          next[b.id] = { x: nx, y: ny };
        });
        return next;
      });
    }, 1500);

    return () => clearInterval(id);
  }, [bots, isAnimating]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".svg")) {
      setError("Please upload an SVG file only.");
      setSvgContent(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      setSvgContent(evt.target.result);
      setError("");
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ minHeight: "100vh", background: BG_MAIN, paddingBottom: 40 }}>

      {/* ✅ STICKY MOBILE BACK */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: BG_MAIN,
          padding: "16px 20px",
        }}
      >
        <button
          onClick={() => navigate("/home")}
          style={{
            padding: "10px 18px",
            borderRadius: 999,
            border: "none",
            background: "linear-gradient(to right,#2563eb,#1d4ed8)",
            color: "#fff",
            fontWeight: 600,
            width: "100%",
          }}
        >
          ← Back to Home
        </button>
      </div>

      {/* ✅ HEADER */}
      <div style={{ padding: "0 20px" }}>
        <h1 style={{ color: TEXT, fontSize: 26, fontWeight: 800 }}>
          🗺 Warehouse Map & Live Bot Heat-Map
        </h1>

        <p style={{ color: MUTED, marginTop: 6 }}>
          Upload warehouse SVG and watch bots move live.
        </p>

        <label
          style={{
            marginTop: 16,
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            padding: "12px 16px",
            borderRadius: 999,
            background: "linear-gradient(to right,#2563eb,#1d4ed8)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          📤 Upload SVG
          <input
            type="file"
            accept=".svg"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </label>

        {error && (
          <div style={{ marginTop: 10, color: "#ef4444", fontWeight: 600 }}>
            ⚠ {error}
          </div>
        )}

        {/* ✅ LEGEND + CONTROL */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            color: TEXT,
          }}
        >
          <div>
            Legend:
            <LegendDot color={STATUS_COLORS.idle} label="Idle" />
            <LegendDot color={STATUS_COLORS.busy} label="Busy" />
            <LegendDot color={STATUS_COLORS.charging} label="Charging" />
            <LegendDot color={STATUS_COLORS.error} label="Error" />
          </div>

          <button
            onClick={() => setIsAnimating((v) => !v)}
            style={{
              borderRadius: 999,
              padding: "8px 16px",
              border: `1px solid ${BORDER}`,
              cursor: "pointer",
              background: CARD_BG,
              color: TEXT,
            }}
          >
            {isAnimating ? "⏸ Pause" : "▶ Resume"}
          </button>
        </div>
      </div>

      {/* ✅ MOBILE-FIRST LAYOUT */}
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* ✅ MAP FULL WIDTH */}
        <div
          style={{
            background: CARD_BG,
            borderRadius: 20,
            padding: 12,
            boxShadow: "0 18px 45px rgba(0,0,0,0.25)",
          }}
        >
          <div
            style={{
              borderRadius: 14,
              overflow: "hidden",
              position: "relative",
              height: "55vh",
              background: isDark ? "#020617" : "#f1f5f9",
            }}
          >
            {svgContent ? (
              <div
                style={{ width: "100%", height: "100%" }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            ) : (
              <div
                style={{
                  border: `2px dashed ${BORDER}`,
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: MUTED,
                }}
              >
                Upload warehouse SVG to begin
              </div>
            )}

            {/* ✅ BOTS */}
            {bots.map((bot) => {
              const pos = positions[bot.id] || { x: 50, y: 50 };
              return (
                <div
                  key={bot.id}
                  style={{
                    position: "absolute",
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "999px",
                      background: STATUS_COLORS[bot.status],
                      border: "2px solid white",
                    }}
                  />
                  <div style={{ fontSize: 10, color: TEXT }}>
                    B{bot.id}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ✅ SNAPSHOT PANEL (BOTTOM) */}
        <div
          style={{
            background: PANEL_BG,
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            color: TEXT,
            maxHeight: "45vh",
            overflowY: "auto",
          }}
        >
          <h3 style={{ marginBottom: 10 }}>🤖 Live Bot Snapshot</h3>

          {bots.map((bot) => (
            <div
              key={bot.id}
              style={{
                border: `1px solid ${BORDER}`,
                padding: 10,
                borderRadius: 12,
                marginBottom: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <b>Bot #{bot.id}</b>
                <div style={{ fontSize: 12, color: MUTED }}>
                  {bot.status}
                </div>
              </div>

              <div style={{ fontWeight: 700 }}>
                {bot.battery}% 🔋
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <span style={{ marginLeft: 12 }}>
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          display: "inline-block",
          background: color,
          marginRight: 4,
        }}
      />
      {label}
    </span>
  );
}

export default MapPage;
