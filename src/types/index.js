/**
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task
 * @property {string} title - Task title
 * @property {boolean} completed - Task completion status
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string} [dueDate] - Optional ISO timestamp for due date
 * @property {string[]} tags - Array of tag IDs
 * @property {string} [projectId] - Optional project ID
 */

/**
 * @typedef {Object} Project
 * @property {string} id - Unique identifier for the project
 * @property {string} name - Project name
 * @property {string} createdAt - ISO timestamp of creation
 * @property {string} [description] - Optional project description
 */

/**
 * @typedef {Object} Tag
 * @property {string} id - Unique identifier for the tag
 * @property {string} name - Tag name
 * @property {string} color - Hex color code
 */

export const createTask = (title, projectId = null, dueDate = null) => ({
  id: crypto.randomUUID(),
  title,
  completed: false,
  createdAt: new Date().toISOString(),
  dueDate,
  tags: [],
  projectId,
});

export const createProject = (name, description = '') => ({
  id: crypto.randomUUID(),
  name,
  description,
  createdAt: new Date().toISOString(),
});

export const createTag = (name, color = '#000000') => ({
  id: crypto.randomUUID(),
  name,
  color,
}); 