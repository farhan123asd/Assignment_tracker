import React, { useEffect, useState } from 'react';
import AssignmentList from '../components/AssignmentList';
import { getAssignments } from '../services/assignmentService';
import { Assignment } from '../types';

const Assignments: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAssignments = async () => {
            const data = await getAssignments();
            setAssignments(data);
            setLoading(false);
        };

        fetchAssignments();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Assignments</h1>
            <AssignmentList assignments={assignments} />
        </div>
    );
};

export default Assignments;