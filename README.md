Netlify link: [caspiandoes.netlify.app](https://caspiandoes.netlify.app)

---

### 1. **Project Structure**

- Components are in `src/components/`, grouped by feature or UI section.
- State management is in `src/store/` using Zustand.
- Styles are handled with `styled-components` and theme files in `src/styles/`.
- Utility hooks and helpers are in `src/hooks/` and `src/types/`.

### 2. **State Management**

- Zustand is used for global state (`useTaskStore`, `useUiStore`).
- No prop drilling; all state is accessed via hooks.
- State is persisted to localStorage using Zustand middleware.
- Tasks, projects, and tags are well-typed and structured.

### 3. **Core Features**

- Add, delete, and toggle tasks.
- Add and delete projects; assign tasks to projects.
- Filter tasks by status and project.
- Due dates and overdue styling for tasks.
- Complete all tasks button.
- Dark/light mode toggle.
- Keyboard shortcuts for quick add, complete, and navigation.
