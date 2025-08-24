import { Assignment } from '../types';

let assignments: Assignment[] = [];

export const createAssignment = (assignment: Assignment): Assignment => {
    assignments.push(assignment);
    return assignment;
};

export const getAssignments = (): Assignment[] => {
    return assignments;
};

export const updateAssignment = (id: string, updatedAssignment: Partial<Assignment>): Assignment | null => {
    const index = assignments.findIndex(assignment => assignment.id === id);
    if (index !== -1) {
        assignments[index] = { ...assignments[index], ...updatedAssignment };
        return assignments[index];
    }
    return null;
};

export const deleteAssignment = (id: string): boolean => {
    const index = assignments.findIndex(assignment => assignment.id === id);
    if (index !== -1) {
        assignments.splice(index, 1);
        return true;
    }
    return false;
};

export const markAsComplete = (id: string): Assignment | null => {
    const index = assignments.findIndex(assignment => assignment.id === id);
    if (index !== -1) {
        assignments[index].completed = true;
        return assignments[index];
    }
    return null;
};