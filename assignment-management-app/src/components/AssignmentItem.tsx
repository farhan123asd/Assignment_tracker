import React from 'react';

interface AssignmentItemProps {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    priority: string;
    description: string;
    isComplete: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}

const AssignmentItem: React.FC<AssignmentItemProps> = ({
    id,
    title,
    course,
    dueDate,
    priority,
    description,
    isComplete,
    onEdit,
    onDelete,
    onToggleComplete,
}) => {
    return (
        <div className={`assignment-item ${isComplete ? 'completed' : ''}`}>
            <h3>{title}</h3>
            <p><strong>Course:</strong> {course}</p>
            <p><strong>Due Date:</strong> {dueDate}</p>
            <p><strong>Priority:</strong> {priority}</p>
            <p>{description}</p>
            <button onClick={() => onEdit(id)}>Edit</button>
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => onToggleComplete(id)}>
                {isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
        </div>
    );
};

export default AssignmentItem;