import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', deadline: '', email: '' });

  useEffect(() => {
    if (isEdit && id) {
      axios.get(`/api/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error(error));
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      axios.put(`/api/tasks/${id}`, task)
        .then(() => navigate(`/tasks/${id}`))
        .catch(error => console.error(error));
    } else {
      axios.post('/api/tasks', task)
        .then(() => navigate('/'))
        .catch(error => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={task.title} onChange={handleChange} required />
      </label>
      <label>
        Description:
        <textarea name="description" value={task.description} onChange={handleChange} required />
      </label>
      <label>
        Deadline:
        <input type="datetime-local" name="deadline" value={task.deadline} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={task.email} onChange={handleChange} required />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default TaskForm;
