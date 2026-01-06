# Feature Roadmap

A personal Todoist-like task management app.

---

## Current Status

### Working Features

| Feature | Notes |
|---------|-------|
| Create task with title | Basic text input |
| Due date via date picker | HTML5 date input |
| Mark complete/incomplete | Click checkbox |
| Delete task | Hover to reveal button |
| Complete all tasks | Alt+Shift+X shortcut |
| Create project | Browser prompt UI |
| Filter by project | Click project in sidebar |
| Filter by status | All/Completed/Uncompleted dropdown |
| Dark/Light mode | Toggle in header, persists |
| LocalStorage persistence | Tasks, projects, tags saved |
| Responsive sidebar | Fixed desktop, slide-out mobile |
| Progress bars per project | Shows completion % |
| Overdue detection | Red color + "(overdue)" label |
| Keyboard shortcuts | Q, X, ?, /, Ctrl+Enter, Alt+Shift+X, Arrow keys |
| **Task editing** | Edit title, description, due date, priority inline |
| **Task descriptions** | Add notes/context to tasks |
| **Priority levels** | P1 (red), P2 (orange), P3 (blue), P4 (gray) with color-coded borders |
| **Today view** | Shows tasks due today + overdue |
| **Upcoming view** | Shows tasks due in next 7 days |
| **Search** | Full-text search in header (title + description) |
| **Arrow key navigation** | Navigate tasks with scroll-into-view |
| **Tag display** | Shows tag names with colors |

### Still Needs Work

| Feature | Issue |
|---------|-------|
| Tag management UI | Store exists, no UI to create/edit/delete tags |
| Add tag to task UI | Store exists, no UI to assign tags |
| Filter by tag | Store exists, not wired to TaskList |
| Delete project | Store exists, no UI |
| Edit project | Store exists, no UI |
| Board view | Store has viewMode, no UI |
| Modal system | Store exists, never used |
| Toast notifications | Store exists, never used |

---

## Completed

- [x] Add `data-task-id` attribute to TaskItem for arrow key scroll
- [x] Fix tag display to show names instead of IDs
- [x] **Task editing** - Edit title, due date, description, priority after creation
- [x] **Task descriptions** - Add notes/context to tasks
- [x] **Priority levels** - P1 (red), P2 (orange), P3 (blue), P4 (gray)
- [x] **Today view** - Filter to tasks due today (+ overdue)
- [x] **Upcoming view** - See tasks for next 7 days
- [x] **Search** - Full-text search across tasks (title + description)

---

## Features to Build

### Phase 2: Complete Scaffolded Features

- [ ] **Tag management UI** - Create, edit, delete tags with colors
- [ ] **Add tags to tasks** - UI to assign/remove tags
- [ ] **Filter by tag** - Wire up existing store filter
- [ ] **Delete project** - Add delete button to projects
- [ ] **Edit project** - Rename projects inline
- [ ] **Board/Kanban view** - Toggle between list and board

### Phase 3: Organization Features

- [ ] **Subtasks** - Nested tasks with hierarchy
- [ ] **Sections** - Divide projects into sections
- [ ] **Recurring tasks** - Daily, weekly, monthly repeats
- [ ] **Natural language dates** - Parse "tomorrow", "next Monday"
- [ ] **Drag and drop** - Reorder tasks, move between projects

### Phase 4: Nice to Have

- [ ] **Completed archive** - View history of completed tasks
- [ ] **Calendar view** - Visual timeline of tasks
- [ ] **Reminders** - Browser notifications for due tasks
- [ ] **Bulk operations** - Multi-select, batch actions
- [ ] **Import/export** - Backup and restore data
- [ ] **Gamification** - Points/streaks for motivation

---

## Out of Scope (Personal Use)

- Collaboration/sharing
- Multi-device sync (beyond localStorage)
- Integrations with other apps
- Mobile native apps
- AI features
- Enterprise security

---

## Data Model

### Current Task Model
```javascript
{
  id: string,
  title: string,
  completed: boolean,
  createdAt: string,        // ISO timestamp
  projectId: string | null,
  dueDate: string | null,   // ISO timestamp
  tags: string[],           // Array of tag IDs
  description: string,      // Task notes
  priority: 1 | 2 | 3 | 4,  // P1-P4
}
```

### Future Additions Needed
```javascript
// Task additions for subtasks/recurring
{
  parentId: string | null,       // For subtasks
  sectionId: string | null,      // Section within project
  recurring: {                   // Recurring config
    frequency: 'daily' | 'weekly' | 'monthly',
    interval: number,
    endDate: string | null
  } | null
}

// New: Section model
{
  id: string,
  name: string,
  projectId: string,
  order: number
}
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Q` | Focus quick add input |
| `/` | Focus search |
| `X` | Complete selected task |
| `Alt+Shift+X` | Complete all tasks |
| `↑` / `↓` | Navigate tasks |
| `?` | Show shortcuts help |
| `Ctrl/Cmd+Enter` | Submit form |
| `Esc` | Cancel edit (in edit mode) |

### Planned Shortcuts

| Key | Action |
|-----|--------|
| `E` | Edit selected task |
| `#` | Add/change project |
| `P` | Set priority |
| `T` | Set due date |
