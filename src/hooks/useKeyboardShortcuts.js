import { useEffect } from 'react';

export const useKeyboardShortcuts = ({
  onQuickAdd,
  onSubmit,
  onCompleteTask,
  onCompleteAll,
  onNavigateUp,
  onNavigateDown,
  selectedTaskId,
  setSelectedTaskId,
  tasks,
}) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
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
      if (e.key === 'x' && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        onCompleteTask?.(selectedTaskId);
      }

      // Complete all shortcut (Option + Shift + x)
      if (e.key === 'x' && e.shiftKey && e.altKey) {
        e.preventDefault();
        onCompleteAll?.();
      }

      // Navigation shortcuts (↑/↓)
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = tasks.findIndex((task) => task.id === selectedTaskId);
        
        if (e.key === 'ArrowUp' && currentIndex > 0) {
          setSelectedTaskId(tasks[currentIndex - 1].id);
          onNavigateUp?.(tasks[currentIndex - 1].id);
        } else if (e.key === 'ArrowDown' && currentIndex < tasks.length - 1) {
          setSelectedTaskId(tasks[currentIndex + 1].id);
          onNavigateDown?.(tasks[currentIndex + 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    onQuickAdd,
    onSubmit,
    onCompleteTask,
    onCompleteAll,
    onNavigateUp,
    onNavigateDown,
    selectedTaskId,
    setSelectedTaskId,
    tasks,
  ]);
}; 