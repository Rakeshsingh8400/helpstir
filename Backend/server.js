const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const tasksFilePath = path.join(__dirname, '../public/tasks.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to get tasks
app.get('/tasks', (req, res) => {
  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read tasks' });
    }
    res.json(JSON.parse(data));
  });
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false,
    timestamp: new Date().toISOString()
  };

  fs.readFile(tasksFilePath, 'utf8', (err, data) => {
    let tasks = [];
    if (!err) {
      tasks = JSON.parse(data);
    }
    tasks.push(newTask);
    fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save task' });
      }
      res.status(201).json(newTask);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
