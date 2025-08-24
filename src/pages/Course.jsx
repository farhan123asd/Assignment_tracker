import React from 'react';

function Course({ course, assignments }) {
  const filtered = assignments.filter(a => a.course === course);
  return (
    <div className="course-page">
      <h2>{course} Assignments</h2>
      <ul className="assignment-list">
        {filtered.length === 0 ? (
          <li>No assignments for this course.</li>
        ) : (
          filtered.map((a, i) => (
            <li key={i} className={`assignment-item${a.completed ? ' completed' : ''}`}>
              <span>
                <strong>{a.title}</strong><br />
                Due: {new Date(a.dueDateTime).toLocaleString()}<br />
                Priority: <span className={`priority ${a.priority.toLowerCase()}`}>{a.priority}</span>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Course;
