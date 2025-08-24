
import { useState } from 'react';
import './App.css';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ course: '', dueDate: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.course || !form.dueDate) return;
    setAssignments([...assignments, { ...form }]);
    setForm({ course: '', dueDate: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(assignments[index]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!form.course || !form.dueDate) return;
    const updated = assignments.map((a, i) =>
      i === editIndex ? { ...form } : a
    );
    setAssignments(updated);
    setForm({ course: '', dueDate: '' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setForm({ course: '', dueDate: '' });
    }
  };

  return (
    <div className="container">
      <h1>Assignment Tracker</h1>
      <form onSubmit={editIndex === null ? handleAdd : handleUpdate} className="assignment-form">
        <input
          type="text"
          name="course"
          placeholder="Course Name"
          value={form.course}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
        <button type="submit">{editIndex === null ? 'Add Assignment' : 'Update Assignment'}</button>
        {editIndex !== null && (
          <button type="button" onClick={() => { setEditIndex(null); setForm({ course: '', dueDate: '' }); }}>Cancel</button>
        )}
      </form>
      <ul className="assignment-list">
        {assignments.length === 0 ? (
          <li>No assignments yet.</li>
        ) : (
          assignments.map((a, i) => (
            <li key={i} className="assignment-item">
              <span><strong>{a.course}</strong> - Due: {a.dueDate}</span>
              <button onClick={() => handleEdit(i)}>Edit</button>
              <button onClick={() => handleDelete(i)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
