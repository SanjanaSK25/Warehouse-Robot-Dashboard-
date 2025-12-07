export const generateBots = () => {
  const statuses = ["idle", "busy", "charging", "error"];
  const tasks = ["Picking", "Packing", "Charging", "Idle", "Sorting"];

  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    battery: Math.floor(Math.random() * 100),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    task: tasks[Math.floor(Math.random() * tasks.length)],
    speed: (Math.random() * 5).toFixed(2),
    lastUpdated: new Date().toLocaleTimeString(),
  }));
};
