import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ToDoList from './pages/ToDoListView';
import PomodoroView from './pages/PomodoroTimerView';
import TaskManager from './components/Task/TaskManager';
import './App.css';
import ToDoListView from './pages/ToDoListView';

function App() {
  const [count, setCount] = useState(0);

  const toggleCount = (value) => {
    setCount(value);
  };

  return (
    <main>
    <div className="App">
      <Header />
      <div className='List1'>
          {count === 0 ? <TaskManager toggleCount={toggleCount} /> : null}
          {count === 1 ? <PomodoroView /> : null}
        </div>
      {/* <Footer /> */}
    </div>
    </main>
  );
}

export default App;
