import { useEffect } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';

export const useKeyboardShortcuts = ({
  onQuickAdd,
  onSubmit,
}) => {
  const { completeAllTasks, toggleTask, tasks } = useTaskStore();
  const { selectedTaskId, setSelectedTaskId, toggleShortcutHelp } = useUiStore();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if user is typing in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Allow Ctrl/Cmd + Enter in input fields for form submission
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
          e.preventDefault();
          onSubmit?.();
        }
        return;
      }

      // Quick add shortcut (q)
      if (e.key === 'q' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        onQuickAdd?.();
      }

      // Submit shortcut (Ctrl/Cmd + Enter)
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onSubmit?.();
      }

      // Complete task shortcut (x)
      if (e.key === 'x' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        if (selectedTaskId) {
          toggleTask(selectedTaskId);
        }
      }

      // Complete all tasks shortcut (Alt + Shift + x)
      if (e.key === 'x' && e.altKey && e.shiftKey) {
        e.preventDefault();
        completeAllTasks();
      }

      // Show shortcuts help (?)
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        toggleShortcutHelp();
      }

      // Navigate tasks with arrow keys
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const incompleteTasks = tasks.filter(task => !task.completed);
        if (incompleteTasks.length === 0) return;

        const currentIndex = selectedTaskId 
          ? incompleteTasks.findIndex(task => task.id === selectedTaskId)
          : -1;

        let newIndex;
        if (e.key === 'ArrowUp') {
          newIndex = currentIndex <= 0 ? incompleteTasks.length - 1 : currentIndex - 1;
        } else {
          newIndex = currentIndex >= incompleteTasks.length - 1 ? 0 : currentIndex + 1;
        }

        const newSelectedTask = incompleteTasks[newIndex];
        if (newSelectedTask) {
          setSelectedTaskId(newSelectedTask.id);
          // Scroll to the selected task
          const element = document.querySelector(`[data-task-id="${newSelectedTask.id}"]`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    onQuickAdd,
    onSubmit,
    selectedTaskId,
    setSelectedTaskId,
    toggleTask,
    completeAllTasks,
    toggleShortcutHelp,
    tasks,
  ]);
}; 