import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskQueue: [],
  completedCount: 0,   // ✅ TRACK COMPLETED SEPARATELY
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // ✅ ADD TASK FROM TaskAllocationPage
    addTask: (state, action) => {
      state.taskQueue.push({
        id: Date.now(),
        ...action.payload,
        status: "pending",
        createdAt: new Date().toLocaleTimeString(),
      });
    },

    // ✅ AUTO REMOVE ONE TASK EVERY 3 SECONDS
    removeNextTask: (state) => {
      if (state.taskQueue.length === 0) return;

      const index = state.taskQueue.findIndex(
        (task) => task.status === "pending"
      );

      if (index !== -1) {
        // ✅ MARK AS DONE (UI FEEDBACK)
        state.taskQueue[index].status = "done";

        // ✅ INCREMENT COMPLETED KPI
        state.completedCount += 1;

        // ✅ REMOVE FROM QUEUE AFTER SHORT DELAY LOGICALLY
        state.taskQueue.splice(index, 1);
      }
    },

    clearAllTasks: (state) => {
      state.taskQueue = [];
      state.completedCount = 0;
    },
  },
});

export const { addTask, removeNextTask, clearAllTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
