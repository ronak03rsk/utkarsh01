import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/add" element={<TaskForm isEdit={false} />} />
        <Route path="/edit/:id" element={<TaskForm isEdit={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
