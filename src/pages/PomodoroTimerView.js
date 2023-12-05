import React, { useState } from 'react';
import './PomodoroTimerView.css';
import Timer from '../components/Pomodoro/Timer';
import Settings from '../components/Pomodoro/Settings';
import SettingsContext from '../components/Pomodoro/SettingsContext';

const PomodoroView = ({ subtask }) => {
  const [showSettings, setShowSettings] = useState(false);

  // Assigning subtask work minutes to workMinutes explicitly
  const workMinutes = subtask ? subtask.workMinutes : 25;

  // Similarly, assign breakMinutes if available
  const breakMinutes = subtask ? subtask.breakMinutes : 5;

  return (
    <div className='List'>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </div>
  );
};

export default PomodoroView;
