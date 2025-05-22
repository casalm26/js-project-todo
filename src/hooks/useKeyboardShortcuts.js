import { useEffect } from 'react';

export const useKeyboardShortcuts = ({
  onQuickAdd,
  onSubmit,
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
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [
    onQuickAdd,
    onSubmit,
  ]);
}; 