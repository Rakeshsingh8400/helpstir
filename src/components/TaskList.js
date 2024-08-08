import TaskItem from '../components/TaskItem';
import '../styles/tasklist.css';

const TaskList = ({ tasks, toggleComplete, updateTask }) => (
  <div className="task-list">
    {tasks.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        toggleComplete={toggleComplete}
        updateTask={updateTask}
      />
    ))}
  </div>
);

export default TaskList;
