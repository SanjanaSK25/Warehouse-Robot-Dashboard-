import { createSlice } from "@reduxjs/toolkit";

// ✅ Generate 10 realistic live bots
const generateBots = () =>
  Array.from({ length: 10 }, (_, i) => {
    const battery = Math.floor(Math.random() * 40) + 60;

    let status = "idle";
    if (battery < 20) status = "charging";
    else if (battery % 3 === 0) status = "busy";

    return {
      id: i + 1,
      name: `Bot #${i + 1}`,
      status,
      battery,
      speed:
        status === "busy"
          ? parseFloat((Math.random() * 5 + 1).toFixed(2))
          : 0,
      task:
        status === "busy"
          ? "Picking"
          : status === "charging"
          ? "Charging"
          : "Idle",
      lastUpdated: new Date().toLocaleTimeString(),
    };
  });

const initialState = {
  list: generateBots(),
};

const botsSlice = createSlice({
  name: "bots",
  initialState,
  reducers: {
    updateBots: (state) => {
      const now = new Date().toLocaleTimeString();

      state.list = state.list.map((bot) => {
        let newBattery = bot.battery;
        let newStatus = bot.status;

        // ✅ Battery Logic
        if (bot.status === "charging") {
          newBattery = Math.min(100, bot.battery + Math.floor(Math.random() * 6));
          if (newBattery > 90) newStatus = "idle";
        } else {
          newBattery = Math.max(2, bot.battery - Math.floor(Math.random() * 6));
          if (newBattery < 18) newStatus = "charging";
        }

        // ✅ Random Error Simulation
        if (Math.random() < 0.03) newStatus = "error";

        // ✅ Recover from Error Automatically
        if (bot.status === "error" && Math.random() > 0.7)
          newStatus = "idle";

        // ✅ Speed Logic
        let newSpeed = 0;
        if (newStatus === "busy") {
          newSpeed = parseFloat((Math.random() * 4 + 1).toFixed(2));
        }

        // ✅ Task Logic
        let newTask =
          newStatus === "busy"
            ? ["Picking", "Sorting", "Packing"][
                Math.floor(Math.random() * 3)
              ]
            : newStatus === "charging"
            ? "Charging"
            : newStatus === "error"
            ? "Fault Detected"
            : "Idle";

        return {
          ...bot,
          battery: newBattery,
          status: newStatus,
          speed: newSpeed,
          task: newTask,
          lastUpdated: now,
        };
      });
    },
  },
});

export const { updateBots } = botsSlice.actions;
export default botsSlice.reducer;
