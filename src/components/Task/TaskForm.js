import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const TaskForm = ({ onSubmit }) => {
  const [taskText, setTaskText] = useState('');

  const handleInputChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(taskText);
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task..."
          value={taskText}
          onChange={handleInputChange}
          required
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Enter a task description"
        />
        <button className="btn btn-primary" type="submit" data-bs-toggle="tooltip" data-bs-placement="top" title="Submit">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
