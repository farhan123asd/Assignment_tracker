import React from 'react';

function Dashboard({ assignments }) {
  const today = new Date().toISOString().slice(0, 10);
  const dueToday = assignments.filter(a => a.dueDateTime && a.dueDateTime.startsWith(today));
  const now = new Date();
  const weekEnd = new Date(now);
  weekEnd.setDate(now.getDate() + (7 - now.getDay()));
  const dueThisWeek = assignments.filter(a => {
    const due = new Date(a.dueDateTime);
    return due >= now && due <= weekEnd;
  });
  const overdue = assignments.filter(a => !a.completed && new Date(a.dueDateTime) < now);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="overview">
        <div><strong>Due Today:</strong> {dueToday.length}</div>
        <div><strong>Due This Week:</strong> {dueThisWeek.length}</div>
        <div><strong>Overdue:</strong> {overdue.length}</div>
      </div>
    </div>
  );
}

export default Dashboard;
