import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../tasksSlice";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const [selectedBot, setSelectedBot] = useState("");

  const dispatch = useDispatch();
  const bots = useSelector((state) => state.bots.bots);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !selectedBot) {
      alert("Please fill all fields");
      return;
    }

    dispatch(
      addTask({
        task: taskName,
        bot: selectedBot,
      })
    );

    setTaskName("");
    setSelectedBot("");
  };

  return (
    <div className="task-form">
      <h2>Assign Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />

        <select
          value={selectedBot}
          onChange={(e) => setSelectedBot(e.target.value)}
        >
          <option value="">Select Bot</option>
          {bots.map((bot) => (
            <option key={bot.id} value={bot.name}>
              {bot.name} ({bot.status})
            </option>
          ))}
        </select>

        <button type="submit">Assign</button>
      </form>
    </div>
  );
}

export default TaskForm;
