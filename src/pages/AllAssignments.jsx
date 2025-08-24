import React from 'react';

function AllAssignments({ assignments, onEdit, onDelete, onComplete }) {
  return (
    <div className="all-assignments">
      <h2>All Assignments</h2>
      <ul className="assignment-list">
        {assignments.length === 0 ? (
          <li>No assignments found.</li>
        ) : (
          assignments.map((a, i) => (
            <li key={i} className={`assignment-item${a.completed ? ' completed' : ''}`}>
              <span>
                <strong>{a.title}</strong> <span className="course">({a.course})</span><br />
                Due: {new Date(a.dueDateTime).toLocaleString()}<br />
                Priority: <span className={`priority ${a.priority.toLowerCase()}`}>{a.priority}</span>
              </span>
              <div className="actions">
                <button onClick={() => onEdit(i)}>Edit</button>
                <button onClick={() => onDelete(i)}>Delete</button>
                <button onClick={() => onComplete(i)}>
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

export default AllAssignments;
