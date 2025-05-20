import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'taskify-ui-store';

export const useUiStore = create(
  persist(
    (set) => ({
      // Theme
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // UI State
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Filter State
      activeFilters: {
        status: 'all', // 'all', 'active', 'completed'
        project: null,
        tag: null,
        dueDate: null,
      },
      setFilter: (filterType, value) =>
        set((state) => ({
          activeFilters: {
            ...state.activeFilters,
            [filterType]: value,
          },
        })),

      // View State
      viewMode: 'list', // 'list', 'board'
      setViewMode: (mode) => set({ viewMode: mode }),

      // Modal State
      activeModal: null,
      modalData: null,
      openModal: (modalType, data = null) =>
        set({ activeModal: modalType, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),

      // Toast Notifications
      toast: null,
      showToast: (message, type = 'info') =>
        set({ toast: { message, type } }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        sidebarOpen: state.sidebarOpen,
        viewMode: state.viewMode,
      }),
    }
  )
); 