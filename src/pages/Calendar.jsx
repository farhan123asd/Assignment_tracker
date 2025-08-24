
import React, { useState } from 'react';
import CalendarLib from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar({ assignments }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Get assignments for selected date
  const assignmentsForDate = assignments.filter(a => {
    const due = new Date(a.dueDateTime);
    return due.toDateString() === selectedDate.toDateString();
  });

  return (
    <div className="calendar-view">
      <h2>Calendar View</h2>
      <CalendarLib
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date, view }) => {
          if (view === 'month') {
            const hasAssignment = assignments.some(a => {
              const due = new Date(a.dueDateTime);
              return due.toDateString() === date.toDateString();
            });
            return hasAssignment ? <span style={{color:'#5c8ecf',fontWeight:'bold'}}>•</span> : null;
          }
        }}
      />
      <div className="calendar-assignments">
        <h3>Assignments for {selectedDate.toLocaleDateString()}:</h3>
        {assignmentsForDate.length === 0 ? (
          <p>No assignments due.</p>
        ) : (
          <ul>
            {assignmentsForDate.map((a, i) => (
              <li key={i}>
                <strong>{a.title}</strong> ({a.course}) - {a.priority}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Calendar;
