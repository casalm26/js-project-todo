import { formatDistanceToNow, isPast, startOfDay } from 'date-fns';

/**
 * Formats a due date for display
 * @param {string} dueDate - ISO date string
 * @returns {string} Formatted date (DD/MM)
 */
export const formatDueDate = (dueDate) => {
  return new Date(dueDate).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit'
  });
};

/**
 * Formats a created date relative to now
 * @param {string} createdAt - ISO date string
 * @returns {string} Relative time string (e.g., "2 hours ago")
 */
export const formatCreatedDate = (createdAt) => {
  return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
};

/**
 * Checks if a task is overdue
 * @param {string} dueDate - ISO date string
 * @param {boolean} completed - Whether the task is completed
 * @returns {boolean} True if task is overdue
 */
export const isTaskOverdue = (dueDate, completed) => {
  return dueDate && !completed && isPast(startOfDay(new Date(dueDate)));
}; 