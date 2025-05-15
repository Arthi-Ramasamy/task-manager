import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTasks();
      requestNotificationPermission();
      scheduleReminders();
    }
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
      scheduleReminder(response.data);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const requestNotificationPermission = () => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  };

  const scheduleReminder = (task) => {
    if (task.dueDate && Notification.permission === 'granted') {
      const dueTime = new Date(task.dueDate).getTime();
      const now = Date.now();
      const timeUntilDue = dueTime - now;

      if (timeUntilDue > 0) {
        setTimeout(() => {
          new Notification(`Task Reminder: ${task.title}`, {
            body: `Due: ${new Date(task.dueDate).toLocaleString()}`,
          });
        }, timeUntilDue);
      }
    }
  };

  const scheduleReminders = () => {
    tasks.forEach(task => scheduleReminder(task));
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login setToken={setToken} />}
          />
          <Route
            path="/register"
            element={token ? <Navigate to="/" /> : <Register setToken={setToken} />}
          />
          <Route
            path="/"
            element={
              token ? (
                <>
                  <h1>Task Manager</h1>
                  <button onClick={() => { localStorage.removeItem('token'); setToken(''); }}>Logout</button>
                  <TaskForm addTask={addTask} />
                  <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                  <CalendarView tasks={tasks} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;