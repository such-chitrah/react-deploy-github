import React from 'react';
import './ToDoListView.css';
import TaskManager from '../components/Task/TaskManager';

const ToDoListView = () => {
  return (
    <div className="ToDoListView">

      <h2>What are you planning on getting done today?</h2>
      <TaskManager />
    </div>
  );
};

export default ToDoListView;
