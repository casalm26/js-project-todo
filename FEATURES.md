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
| Keyboard shortcuts | Q, X, ?, Ctrl+Enter, Alt+Shift+X |

### Broken/Incomplete Features

| Feature | Issue |
|---------|-------|
| Arrow key navigation | Missing `data-task-id` attr - scroll fails |
| Tag display | Shows raw IDs instead of tag names |
| Tag management UI | Store exists, no UI |
| Add tag to task UI | Store exists, no UI |
| Filter by tag | Store exists, not wired to TaskList |
| Filter by due date | Store exists, not wired |
| Delete project | Store exists, no UI |
| Edit project | Store exists, no UI |
| Board view | Store has viewMode, no UI |
| Modal system | Store exists, never used |
| Toast notifications | Store exists, never used |

---

## Bug Fixes

- [ ] Add `data-task-id` attribute to TaskItem for arrow key scroll
- [ ] Fix tag display to show names instead of IDs

---

## Features to Build

### Phase 1: Core Improvements (High Priority)

- [ ] **Task editing** - Edit title, due date after creation
- [ ] **Task descriptions** - Add notes/context to tasks
- [ ] **Priority levels** - P1 (red), P2 (orange), P3 (blue), P4 (gray)
- [ ] **Today view** - Filter to tasks due today
- [ ] **Upcoming view** - See tasks for next 7 days
- [ ] **Search** - Full-text search across tasks

### Phase 2: Complete Scaffolded Features

- [ ] **Tag management UI** - Create, edit, delete tags with colors
- [ ] **Add tags to tasks** - UI to assign/remove tags
- [ ] **Filter by tag** - Wire up existing store filter
- [ ] **Filter by due date** - Today, this week, overdue, no date
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

## Data Model Changes Needed

```javascript
// Task additions
{
  description: string | null,    // Task notes
  priority: 1 | 2 | 3 | 4,       // P1-P4
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

## Keyboard Shortcuts (Current)

| Key | Action |
|-----|--------|
| `Q` | Focus quick add input |
| `X` | Complete selected task |
| `Alt+Shift+X` | Complete all tasks |
| `?` | Show shortcuts help |
| `Ctrl/Cmd+Enter` | Submit form |
| `Arrow Up/Down` | Navigate tasks (broken) |

### Planned Shortcuts

| Key | Action |
|-----|--------|
| `E` | Edit selected task |
| `#` | Add/change project |
| `P` | Set priority |
| `T` | Set due date |
| `/` | Focus search |
| `Esc` | Close modal/deselect |
