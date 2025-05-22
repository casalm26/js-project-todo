Netlify link:

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

### 4. **Accessibility**

- All interactive elements have accessible names (`aria-label` or text).
- Color contrast meets or exceeds AA standards (check with Lighthouse).
- Semantic HTML is used (e.g., `<main>`, `<header>`, `<ul>`, `<li>`).
- Keyboard navigation is supported throughout the app.

### 5. **Responsiveness & UX**

- Layout adapts to all screen sizes (sidebar drawer on mobile, unified sidebar on desktop).
- Add Task section is mobile-friendly (inputs stack, button remains to the right and centered).
- No horizontal scroll or overflow on any device.
- Empty state and error states are user-friendly.

### 6. **Code Quality & Best Practices**

- Consistent use of rem/vh/vw units for scalable, modern CSS.
- No unused code, variables, or imports.
- Components are small, focused, and reusable.
- Theming is handled via a central theme file.
- All business logic is in the store or hooks, not in UI components.
- ESLint passes with no errors or warnings.

### 7. **Stretch Goals (if present)**

- Tagging system for tasks.
- Project progress bars.
- Task timestamps (createdAt, dueDate).
- Persistent filters and UI state.

---
