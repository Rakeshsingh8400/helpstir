import "../styles/taskitem.css";
const TaskItem = ({ task, toggleComplete, updateTask }) => {
    const { id, title, description, completed, timestamp } = task;
  
    return (
      <div className={`task-item ${completed ? 'completed' : ''}`}>
        <h3>{title}</h3>
        <p>{description}</p>
        <small>Last updated: {new Date(timestamp).toLocaleString()}</small>
        <button onClick={() => toggleComplete(id)}>
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => updateTask(id)}>Edit</button>
      </div>
    );
  };
  
  export default TaskItem;
  