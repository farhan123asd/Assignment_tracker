import React from 'react';
import AssignmentList from '../components/AssignmentList';
import Notification from '../components/Notification';

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Assignment Dashboard</h1>
            <Notification />
            <h2>Assignments Due Today</h2>
            <AssignmentList filter="today" />
            <h2>Assignments Due This Week</h2>
            <AssignmentList filter="thisWeek" />
            <h2>Overdue Assignments</h2>
            <AssignmentList filter="overdue" />
        </div>
    );
};

export default Home;