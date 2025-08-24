export const sortByDueDate = (assignments) => {
    return assignments.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
};

export const sortByPriority = (assignments) => {
    const priorityOrder = {
        high: 1,
        medium: 2,
        low: 3,
    };
    return assignments.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const sortByTitle = (assignments) => {
    return assignments.sort((a, b) => a.title.localeCompare(b.title));
};