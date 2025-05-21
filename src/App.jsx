import { ThemeProvider } from 'styled-components';
import { useUiStore } from './store/useUiStore';
import { useTaskStore } from './store/useTaskStore';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
import { ShortcutHelp } from './components/ShortcutHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color ${({ theme }) => theme.transitions.default};
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const App = () => {
  const { isDarkMode, isShortcutHelpOpen, toggleShortcutHelp, selectedTaskId, setSelectedTaskId } = useUiStore();
  const { tasks, toggleTask, completeAllTasks } = useTaskStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  useKeyboardShortcuts({
    onQuickAdd: () => {
      const input = document.querySelector('input[type="text"]');
      input?.focus();
    },
    onSubmit: () => {
      const form = document.querySelector('form');
      form?.requestSubmit();
    },
    onCompleteTask: (id) => {
      if (id) toggleTask(id);
    },
    onCompleteAll: () => {
      completeAllTasks();
    },
    onNavigateUp: (id) => {
      const element = document.querySelector(`[data-task-id="${id}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    onNavigateDown: (id) => {
      const element = document.querySelector(`[data-task-id="${id}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    selectedTaskId,
    setSelectedTaskId,
    tasks,
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          <AddTask />
          <TaskList />
        </Main>
        <ShortcutHelp isOpen={isShortcutHelpOpen} onClose={toggleShortcutHelp} />
      </AppContainer>
    </ThemeProvider>
  );
};
