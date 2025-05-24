import styled from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi';
import { device } from '../styles/media';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${device.mobile} {
    display: flex;
  }
`;

export const Header = () => {
  const { isDarkMode, toggleTheme, toggleSidebar } = useUiStore();

  return (
    <HeaderContainer>
      <Logo aria-label="Taskify home">Taskify</Logo>
      <Controls>
        <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </ThemeToggle>
        <HamburgerButton onClick={toggleSidebar} aria-label="Open menu">
          <FiMenu size={20} />
        </HamburgerButton>
      </Controls>
    </HeaderContainer>
  );
}; 