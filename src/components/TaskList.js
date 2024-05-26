// In your React component (e.g., TaskList.js)
import axios from 'axios';
import { useEffect, useState } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      {tasks.map(task => (
        <div key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{new Date(task.deadline).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
