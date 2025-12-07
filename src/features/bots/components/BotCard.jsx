import React from "react";

function BotCard({ bot }) {
  const batteryColor =
    bot.battery < 15 ? "#EF4444" : bot.battery < 35 ? "#F97316" : "#22C55E";

  const statusClass = {
    idle: "status-pill idle",
    busy: "status-pill busy",
    charging: "status-pill charging",
    error: "status-pill error",
  }[bot.status] || "status-pill";

  const lastUpdated = bot.lastUpdated
    ? new Date(bot.lastUpdated).toLocaleTimeString()
    : "–";

  return (
    <div className={`bot-card ${bot.battery < 15 ? "bot-card-low" : ""}`}>
      <div className="bot-card-header">
        <h3>{bot.name}</h3>
        <span className={statusClass}>{bot.status}</span>
      </div>

      <div className="bot-card-row">
        <span className="label">Battery</span>
        <span>{bot.battery}%</span>
      </div>

      {/* Animated battery bar */}
      <div className="battery-bar">
        <div
          className="battery-fill"
          style={{
            width: `${bot.battery}%`,
            backgroundColor: batteryColor,
          }}
        />
      </div>

      <div className="bot-card-row">
        <span className="label">Speed</span>
        <span>{bot.speed.toFixed ? bot.speed.toFixed(2) : bot.speed} m/s</span>
      </div>

      <div className="bot-card-row">
        <span className="label">Last updated</span>
        <span>{lastUpdated}</span>
      </div>

      {bot.battery < 15 && (
        <div className="low-battery-warning">
          ⚠️ Low battery – send to charging dock!
        </div>
      )}
    </div>
  );
}

export default BotCard;
