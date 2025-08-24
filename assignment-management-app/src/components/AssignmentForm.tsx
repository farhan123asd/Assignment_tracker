import React, { useState } from 'react';

interface AssignmentFormProps {
  onSubmit: (assignment: Assignment) => void;
  existingAssignment?: Assignment;
}

const AssignmentForm: React.FC<AssignmentFormProps> = ({ onSubmit, existingAssignment }) => {
  const [title, setTitle] = useState(existingAssignment ? existingAssignment.title : '');
  const [course, setCourse] = useState(existingAssignment ? existingAssignment.course : '');
  const [dueDate, setDueDate] = useState(existingAssignment ? existingAssignment.dueDate : '');
  const [priority, setPriority] = useState(existingAssignment ? existingAssignment.priority : 'Medium');
  const [description, setDescription] = useState(existingAssignment ? existingAssignment.description : '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment = {
      title,
      course,
      dueDate,
      priority,
      description,
    };
    onSubmit(assignment);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setCourse('');
    setDueDate('');
    setPriority('Medium');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Course:</label>
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} required />
      </div>
      <div>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">{existingAssignment ? 'Update Assignment' : 'Add Assignment'}</button>
    </form>
  );
};

export default AssignmentForm;