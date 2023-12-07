import React, { useState } from 'react';
import TaskForm from './TaskForm';
import Subtask from '../Subtask/Subtask';
import './TaskManager.css';
import PomodoroView from '../../pages/PomodoroTimerView';
import SubtaskForm from '../Subtask/SubtaskForm';

const TaskManager = ({ toggleCount }) => {
  const [selectedTask, setSelectedTask] = useState(null); 
  const [selectedSubtasks, setSelectedSubtasks] = useState([]);
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(savedTasks);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = (taskText) => {
    const updatedTasks = [
      ...tasks,
      {
        taskId: Date.now(),
        taskName: taskText,
        subtasks: [], // Initialize with an empty array for subtasks
      },
    ];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleUpdateTask = (taskText) => {
    if (editIndex !== -1) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskText;
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setEditIndex(-1); // Reset editIndex after updating a task
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1); // Cancel editing
  };

  const handleClearTasks = () => {
    setTasks([]);
    localStorage.clear();
  };


  const handleStartTask = (taskIndex) => {
    const selectedTask = tasks[taskIndex];
    setSelectedTask(selectedTask);
    toggleCount(1);
    console.log(selectedTask)
  };
  console.log("Selected Task:", selectedTask);

  const renderTaskList = () => {
    return (
      <ul className="list-group" style={{ display: 'block'}}>
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item bg-dark text-white d-flex flex-column align-items-start mb-3" style={{ width: '550px' , margin: '0 auto', }}>
            {editIndex === index ? (
              <TaskForm onSubmit={handleUpdateTask} initialText={task.taskName} onCancel={handleCancelEdit} />
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center"><h3>{task.taskName}</h3>
                </div>
                <div>
                  <button className="btn btn-success mr-2" onClick={() => handleEditTask(index)}>
                    Update Name
                    </button>
                    <button className="btn btn-success" onClick={() => handleStartTask(index)}>
                      Start
                      </button>
                </div>
                <br />
                <div>
                <Subtask
                  key={index}
                  taskId={task.taskId}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                  workMinutes={task.workMinutes}
                  breakMinutes={task.breakMinutes}
                  />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <div className='TaskList'>
      <h2>To-Do List</h2>
      {renderTaskList()}
      <TaskForm onSubmit={handleAddTask} />
      <button className="btn btn-success mt-4" onClick={handleClearTasks}>Clear Tasks</button>
    </div>
  );
}

export default TaskManager;
