export const filterAssignments = (assignments, filters) => {
    return assignments.filter(assignment => {
        const matchesTitle = filters.title ? assignment.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
        const matchesCourse = filters.course ? assignment.course.toLowerCase().includes(filters.course.toLowerCase()) : true;
        const matchesPriority = filters.priority ? assignment.priority === filters.priority : true;
        const matchesDueDate = filters.dueDate ? new Date(assignment.dueDate) <= new Date(filters.dueDate) : true;

        return matchesTitle && matchesCourse && matchesPriority && matchesDueDate;
    });
};

export const getUniqueCourses = (assignments) => {
    const courses = assignments.map(assignment => assignment.course);
    return [...new Set(courses)];
};

export const getUniquePriorities = (assignments) => {
    const priorities = assignments.map(assignment => assignment.priority);
    return [...new Set(priorities)];
};