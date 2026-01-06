import { formatDistanceToNow, isPast, startOfDay, isToday, addDays, isBefore, isAfter } from 'date-fns';

/**
 * Formats a due date for display
 * @param {string} dueDate - ISO date string
 * @returns {string} Formatted date (DD/MM)
 */
export const formatDueDate = (dueDate) => {
  const date = new Date(dueDate);
  if (isToday(date)) {
    return 'Today';
  }
  const tomorrow = addDays(startOfDay(new Date()), 1);
  if (date >= tomorrow && date < addDays(tomorrow, 1)) {
    return 'Tomorrow';
  }
  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit'
  });
};

/**
 * Checks if a task is due today
 * @param {string} dueDate - ISO date string
 * @returns {boolean}
 */
export const isTaskDueToday = (dueDate) => {
  if (!dueDate) return false;
  return isToday(new Date(dueDate));
};

/**
 * Checks if a task is due within the next 7 days (including today and overdue)
 * @param {string} dueDate - ISO date string
 * @returns {boolean}
 */
export const isTaskUpcoming = (dueDate) => {
  if (!dueDate) return false;
  const date = new Date(dueDate);
  const endOfUpcoming = addDays(startOfDay(new Date()), 7);
  return isBefore(date, endOfUpcoming);
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