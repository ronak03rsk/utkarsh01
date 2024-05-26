import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    axios.get(`/api/tasks/${id}`)
      .then(response => setTask(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`/api/tasks/${id}`)
      .then(() => navigate('/'))
      .catch(error => console.error(error));
  };

  return (
    task ? (
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        <p>Deadline: {task.deadline}</p>
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/edit/${task._id}`}>Edit</Link>
        <Link to="/">Back</Link>
      </div>
    ) : <p>Loading...</p>
  );
};

export default TaskDetails;
