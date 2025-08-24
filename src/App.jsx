
import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const priorityLevels = ['Low', 'Medium', 'High'];

  function getDueThisWeek(assignments) {
    const now = new Date();
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() + (7 - now.getDay()));
    return assignments.filter(a => {
      const due = new Date(a.dueDateTime);
      return due >= now && due <= weekEnd;
    });
  }

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('assignments');
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ title: '', course: '', dueDateTime: '', priority: 'Medium' });
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState({ course: '', dueThisWeek: false, incompleteOnly: false });
  const [sortBy, setSortBy] = useState('dueDateTime');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Save assignments to localStorage whenever they change
    localStorage.setItem('assignments', JSON.stringify(assignments));
    // Simple notification for assignments due in next 24h
    const now = new Date();
    const soon = assignments.filter(a => {
      if (a.completed) return false;
      const due = new Date(a.dueDateTime);
      return due - now < 24 * 60 * 60 * 1000 && due > now;
    });
    if (soon.length > 0) {
      setNotification(`Reminder: ${soon.length} assignment(s) due in next 24 hours!`);
    } else {
      setNotification('');
    }
  }, [assignments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title || !form.course || !form.dueDateTime) return;
    setAssignments([...assignments, { ...form, completed: false }]);
    setForm({ title: '', course: '', dueDateTime: '', priority: 'Medium' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setForm(assignments[index]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!form.title || !form.course || !form.dueDateTime) return;
    const updated = assignments.map((a, i) =>
      i === editIndex ? { ...form, completed: a.completed } : a
    );
    setAssignments(updated);
    setForm({ title: '', course: '', dueDateTime: '', priority: 'Medium' });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setAssignments(assignments.filter((_, i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setForm({ title: '', course: '', dueDateTime: '', priority: 'Medium' });
    }
  };

  const handleComplete = (index) => {
    setAssignments(assignments.map((a, i) =>
      i === index ? { ...a, completed: !a.completed } : a
    ));
  };

  // Sorting and filtering
  let filtered = assignments;
  if (filter.course) {
    filtered = filtered.filter(a => a.course === filter.course);
  }
  if (filter.dueThisWeek) {
    filtered = getDueThisWeek(filtered);
  }
  if (filter.incompleteOnly) {
    filtered = filtered.filter(a => !a.completed);
  }
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'dueDateTime') {
      return new Date(a.dueDateTime) - new Date(b.dueDateTime);
    } else if (sortBy === 'priority') {
      return priorityLevels.indexOf(b.priority) - priorityLevels.indexOf(a.priority);
    } else if (sortBy === 'course') {
      return a.course.localeCompare(b.course);
    }
    return 0;
  });

  // Unique course list for filter dropdown
  const courseList = [...new Set(assignments.map(a => a.course))];

  return (
    <div className="container">
      <h1>Assignment Management</h1>
      {notification && <div className="notification">{notification}</div>}
      <form onSubmit={editIndex === null ? handleAdd : handleUpdate} className="assignment-form">
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course/Subject"
          value={form.course}
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="dueDateTime"
          value={form.dueDateTime}
          onChange={handleChange}
          required
        />
        <select name="priority" value={form.priority} onChange={handleChange} required>
          {priorityLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <button type="submit">{editIndex === null ? 'Add Assignment' : 'Update Assignment'}</button>
        {editIndex !== null && (
          <button type="button" onClick={() => { setEditIndex(null); setForm({ title: '', course: '', dueDateTime: '', priority: 'Medium' }); }}>Cancel</button>
        )}
      </form>

      <div className="filter-sort">
        <select value={filter.course} onChange={e => setFilter(f => ({ ...f, course: e.target.value }))}>
          <option value="">All Courses</option>
          {courseList.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
        <label>
          <input type="checkbox" checked={filter.dueThisWeek} onChange={e => setFilter(f => ({ ...f, dueThisWeek: e.target.checked }))} />
          Due This Week
        </label>
        <label>
          <input type="checkbox" checked={filter.incompleteOnly} onChange={e => setFilter(f => ({ ...f, incompleteOnly: e.target.checked }))} />
          Incomplete Only
        </label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="dueDateTime">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="course">Sort by Course</option>
        </select>
      </div>

      <ul className="assignment-list">
        {filtered.length === 0 ? (
          <li>No assignments found.</li>
        ) : (
          filtered.map((a, i) => (
            <li key={i} className={`assignment-item${a.completed ? ' completed' : ''}`}>
              <span>
                <strong>{a.title}</strong> <span className="course">({a.course})</span><br />
                Due: {new Date(a.dueDateTime).toLocaleString()}<br />
                Priority: <span className={`priority ${a.priority.toLowerCase()}`}>{a.priority}</span>
              </span>
              <div className="actions">
                <button onClick={() => handleEdit(assignments.indexOf(a))}>Edit</button>
                <button onClick={() => handleDelete(assignments.indexOf(a))}>Delete</button>
                <button onClick={() => handleComplete(assignments.indexOf(a))}>
                  {a.completed ? '✔️ Completed' : '⏳ Mark Complete'}
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
