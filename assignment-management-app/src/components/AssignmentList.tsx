import React from 'react';
import AssignmentItem from './AssignmentItem';
import { Assignment } from '../types';

interface AssignmentListProps {
  assignments: Assignment[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ assignments, onEdit, onDelete, onComplete }) => {
  return (
    <div className="assignment-list">
      {assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        assignments.map((assignment) => (
          <AssignmentItem
            key={assignment.id}
            assignment={assignment}
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        ))
      )}
    </div>
  );
};

export default AssignmentList;