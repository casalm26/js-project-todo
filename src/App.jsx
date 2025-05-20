import { ThemeProvider } from 'styled-components';
import { useUiStore } from './store/useUiStore';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { AddTask } from './components/AddTask';
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
  const { isDarkMode } = useUiStore();
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <Main>
          <AddTask />
          <TaskList />
        </Main>
      </AppContainer>
    </ThemeProvider>
  );
};
