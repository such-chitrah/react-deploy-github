import React, { useState } from 'react';

const SubtaskForm = ({ onSubmit }) => {
  const [subtaskText, setSubtaskText] = useState('');

  const handleInputChange = (event) => {
    setSubtaskText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(subtaskText);
    setSubtaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter subtask..."
          value={subtaskText}
          onChange={handleInputChange}
          required
        />
        <button className="btn btn-primary" type="submit">
          Add Subtask
        </button>
      </div>
    </form>
  );
};

export default SubtaskForm;
