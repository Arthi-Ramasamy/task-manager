import { useState } from 'react';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [filter, setFilter] = useState({ category: 'all', priority: 'all', completed: 'all' });
  const [sort, setSort] = useState('dueDate');

  const toggleComplete = (task) => {
    updateTask(task._id, { ...task, completed: !task.completed });
  };

  const filteredTasks = tasks
    .filter(task => 
      (filter.category === 'all' || task.category === filter.category) &&
      (filter.priority === 'all' || task.priority === filter.priority) &&
      (filter.completed === 'all' || (filter.completed === 'completed' ? task.completed : !task.completed))
    )
    .sort((a, b) => {
      if (sort === 'dueDate') {
        return (new Date(a.dueDate || Infinity) - new Date(b.dueDate || Infinity));
      }
      if (sort === 'priority') {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <div className="filters">
        <select onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
        <select onChange={(e) => setFilter({ ...filter, priority: e.target.value })}>
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select onChange={(e) => setFilter({ ...filter, completed: e.target.value })}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
        <select onChange={(e) => setSort(e.target.value)}>
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks match the filters</p>
      ) : (
        filteredTasks.map(task => (
          <div key={task._id} className="task-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <span className={task.completed ? 'completed' : ''}>{task.title}</span>
            <p>{task.description}</p>
            <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
            <p>Priority: {task.priority}</p>
            <p>Category: {task.category}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;