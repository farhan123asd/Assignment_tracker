export interface Assignment {
    id: string;
    title: string;
    course: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    description: string;
    completed: boolean;
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string; // In a real application, avoid storing passwords in plain text
}

export interface Notification {
    id: string;
    message: string;
    date: Date;
    read: boolean;
}