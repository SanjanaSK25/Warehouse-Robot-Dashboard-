import { useSelector } from "react-redux";

function TaskQueueTable() {
  const taskQueue = useSelector((state) => state.tasks.taskQueue);

  return (
    <div>
      <h2>Task Queue</h2>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Task</th>
            <th>Bot</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {taskQueue.map((task) => (
            <tr key={task.id}>
              <td>{task.task}</td>
              <td>{task.bot}</td>
              <td>{task.status}</td>
              <td>{task.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskQueueTable;
