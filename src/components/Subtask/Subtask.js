import React from 'react';
import SubtaskForm from './SubtaskForm';
import './Subtask.css';

const Subtask = ({ taskId, task, tasks, setTasks, index, workMinutes, breakMinutes }) => {

  const { subtasks } = task;

  const handleAddSubtask = (subtaskText) => {
    console.log(taskId)
    const updatedTasks = tasks.map((task) => {

      if (task.taskId === taskId) {
        const updatedSubtasks = [
          ...task.subtasks,
          {
            subtaskId: Date.now(), // Generating unique ID for subtask
            subtaskName: subtaskText,
            workMinutes: parseInt(workMinutes) || 25,
            breakMinutes: parseInt(breakMinutes) || 5,
          },
        ];

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };


  const handleWorkMinutesChange = (value, subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].workMinutes = parseInt(value) || 25;
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === taskId) {
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem(`tasks`, JSON.stringify(updatedTasks));
  };

  const handleBreakMinutesChange = (value, subtaskIndex) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[subtaskIndex].breakMinutes = parseInt(value) || 5;
    const updatedTasks = tasks.map((task, idx) => {
      if (idx === taskId) {
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem(`tasks`, JSON.stringify(updatedTasks));
  };

  const renderSubtaskList = () => {
    return (
      <div>
        <ul className="list-group">
          {subtasks.map((subtask, subtaskIndex) => (
            <li key={subtaskIndex} className="list-group-item">
              <div className="subtask-container">
                <div className="text-container">
                  <p>
                    <strong>{subtask.subtaskName}</strong>
                  </p>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    placeholder="Work Minutes"
                    value={subtask.workMinutes || workMinutes || 25} // Use subtask's value if available, else use prop value
                    onChange={(e) => handleWorkMinutesChange(e.target.value, subtaskIndex)}
                    style={{ width: '60px' }}
                  />
                  <input
                    type="number"
                    placeholder="Break Minutes"
                    value={subtask.breakMinutes || breakMinutes || 5} // Use subtask's value if available, else use prop value
                    onChange={(e) => handleBreakMinutesChange(e.target.value, subtaskIndex)}
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

  return <div>{renderSubtaskList()}</div>;
};

export default Subtask;
