import { Assignment } from '../types';

const STORAGE_KEY = 'assignments';

export const saveAssignments = (assignments: Assignment[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
};

export const getAssignments = (): Assignment[] => {
    const assignments = localStorage.getItem(STORAGE_KEY);
    return assignments ? JSON.parse(assignments) : [];
};

export const clearAssignments = () => {
    localStorage.removeItem(STORAGE_KEY);
};