import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createTask } from '../types';

const STORAGE_KEY = 'taskify-store';

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      projects: [],
      tags: [],

      // Task operations
      addTask: (title, projectId = null, dueDate = null) => {
        const newTask = createTask(title, projectId, dueDate);
        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));
        return newTask;
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      toggleTaskCompletion: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        }));
      },

      // Project operations
      addProject: (name, description = '') => {
        const newProject = createProject(name, description);
        set((state) => ({
          projects: [...state.projects, newProject],
        }));
        return newProject;
      },

      updateProject: (projectId, updates) => {
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === projectId ? { ...project, ...updates } : project
          ),
        }));
      },

      deleteProject: (projectId) => {
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== projectId),
          tasks: state.tasks.map((task) =>
            task.projectId === projectId
              ? { ...task, projectId: null }
              : task
          ),
        }));
      },

      // Tag operations
      addTag: (name, color = '#000000') => {
        const newTag = createTag(name, color);
        set((state) => ({
          tags: [...state.tags, newTag],
        }));
        return newTag;
      },

      updateTag: (tagId, updates) => {
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === tagId ? { ...tag, ...updates } : tag
          ),
        }));
      },

      deleteTag: (tagId) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== tagId),
          tasks: state.tasks.map((task) => ({
            ...task,
            tags: task.tags.filter((id) => id !== tagId),
          })),
        }));
      },

      // Task-Tag operations
      addTagToTask: (taskId, tagId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, tags: [...task.tags, tagId] }
              : task
          ),
        }));
      },

      removeTagFromTask: (taskId, tagId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, tags: task.tags.filter((id) => id !== tagId) }
              : task
          ),
        }));
      },

      // Selectors
      getTaskById: (taskId) => {
        return get().tasks.find((task) => task.id === taskId);
      },

      getProjectById: (projectId) => {
        return get().projects.find((project) => project.id === projectId);
      },

      getTagById: (tagId) => {
        return get().tags.find((tag) => tag.id === tagId);
      },

      getTasksByProject: (projectId) => {
        return get().tasks.filter((task) => task.projectId === projectId);
      },

      getTasksByTag: (tagId) => {
        return get().tasks.filter((task) => task.tags.includes(tagId));
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        tasks: state.tasks,
        projects: state.projects,
        tags: state.tags,
      }),
    }
  )
); 