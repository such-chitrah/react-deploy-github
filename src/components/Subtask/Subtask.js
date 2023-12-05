import React, { useState, useEffect } from 'react';
import SubtaskForm from './SubtaskForm';
import './Subtask.css'

const Subtask = ({ taskId }) => {
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    // Retrieve subtasks from local storage on component mount
    const storedSubtasks = JSON.parse(localStorage.getItem(`subtasks_${taskId}`)) || [];
    setSubtasks(storedSubtasks);
  }, [taskId]);

  const handleAddSubtask = (subtaskText, workMinutes, breakMinutes) => {
    const updatedSubtasks = [
      ...subtasks,
      { text: subtaskText, workMinutes: parseInt(workMinutes) || 0, breakMinutes: parseInt(breakMinutes) || 0 }
    ];
    setSubtasks(updatedSubtasks);
    // Store updated subtasks in local storage
    localStorage.setItem(`subtasks_${taskId}`, JSON.stringify(updatedSubtasks));
  };

  const handleWorkMinutesChange = (value, subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].workMinutes = parseInt(value) || 0;
    setSubtasks(updatedSubtasks);
    localStorage.setItem(`subtasks_${taskId}`, JSON.stringify(updatedSubtasks));
  };

  const handleBreakMinutesChange = (value, subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].breakMinutes = parseInt(value) || 0;
    setSubtasks(updatedSubtasks);
    localStorage.setItem(`subtasks_${taskId}`, JSON.stringify(updatedSubtasks));
  };

  const renderSubtaskList = () => {
    return (
      <div>
        <ul className="list-group">
          {subtasks.map((subtask, index) => (
            <li key={index} className="list-group-item">
              <div className="subtask-container">
  <div className="text-container">
  <p><strong>{subtask.text}</strong></p>
  </div>
  <div className="input-container">
    <input
      type="number"
      placeholder="Work Minutes"
      value={subtask.workMinutes || 25}
      onChange={(e) => handleWorkMinutesChange(e.target.value, index)}
      style={{ width: '60px' }}
    />
    <input
      type="number"
      placeholder="Break Minutes"
      value={subtask.breakMinutes || 5}
      onChange={(e) => handleBreakMinutesChange(e.target.value, index)}
      style={{ width: '60px' }}
    />
  </div>
</div>

            </li>
          ))}
        </ul>
        <SubtaskForm onSubmit={handleAddSubtask} />
      </div>
    );
  };

  return (
    <div>
      {renderSubtaskList()}
    </div>
  );
};

export default Subtask;
