import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import "../styles/home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/tasks.json')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = (newTask) => {
    const updatedTasks = [
      ...tasks,
      {
        ...newTask,
        id: tasks.length + 1,
        completed: false,
        timestamp: new Date().toISOString()
      }
    ];
    setTasks(updatedTasks);
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, timestamp: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  const updateTask = (id, updatedDetails) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updatedDetails, timestamp: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} toggleComplete={toggleComplete} updateTask={updateTask} />
    </div>
  );
};

export default Home;
