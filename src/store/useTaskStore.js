import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'taskify-store';

export const useTaskStore = create(
  persist(
    (set, get) => ({
      // Tasks
      tasks: [],
      addTask: (title, projectId = null, dueDate = null) =>
        set((state) => ({
          tasks: [
            {
              id: uuidv4(),
              title,
              completed: false,
              createdAt: new Date().toISOString(),
              projectId,
              dueDate: dueDate ? new Date(dueDate).toISOString() : null,
              tags: [],
            },
            ...state.tasks,
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      completeAllTasks: () =>
        set((state) => ({
          tasks: state.tasks.map((task) => ({ ...task, completed: true })),
        })),

      // Projects
      projects: [],
      addProject: (name) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: uuidv4(),
              name,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          tasks: state.tasks.map((task) =>
            task.projectId === id ? { ...task, projectId: null } : task
          ),
        })),
      updateProject: (id, name) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, name } : project
          ),
        })),

      // Tags
      tags: [],
      addTag: (name, color) =>
        set((state) => ({
          tags: [
            ...state.tags,
            {
              id: uuidv4(),
              name,
              color,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteTag: (id) =>
        set((state) => ({
          tags: state.tags.filter((tag) => tag.id !== id),
          tasks: state.tasks.map((task) => ({
            ...task,
            tags: task.tags.filter((tagId) => tagId !== id),
          })),
        })),
      updateTag: (id, name, color) =>
        set((state) => ({
          tags: state.tags.map((tag) =>
            tag.id === id ? { ...tag, name, color } : tag
          ),
        })),
      addTagToTask: (taskId, tagId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, tags: [...task.tags, tagId] }
              : task
          ),
        })),
      removeTagFromTask: (taskId, tagId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, tags: task.tags.filter((id) => id !== tagId) }
              : task
          ),
        })),

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