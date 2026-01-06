import { useRef } from 'react';
import styled from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import { FiSun, FiMoon, FiMenu, FiSearch, FiX, FiList, FiColumns } from 'react-icons/fi';
import { device } from '../styles/media';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 1rem;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: nowrap;

  ${device.mobile} {
    font-size: 1.25rem;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  position: relative;
  display: flex;
  align-items: center;

  ${device.mobile} {
    max-width: 200px;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 2rem 0.5rem 2.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  transition: border-color ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const IconButton = styled.button`
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

const HamburgerButton = styled(IconButton)`
  display: none;

  ${device.mobile} {
    display: flex;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.125rem;
`;

const ViewButton = styled.button`
  background: ${({ $active, theme }) => ($active ? theme.colors.surface : 'none')};
  border: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.375rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ $active }) => ($active ? '0 1px 2px rgba(0,0,0,0.1)' : 'none')};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Header = () => {
  const { isDarkMode, toggleTheme, toggleSidebar, searchQuery, setSearchQuery, viewMode, setViewMode } = useUiStore();
  const searchInputRef = useRef(null);

  const handleClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.focus();
  };

  return (
    <HeaderContainer>
      <Logo aria-label="Taskify home">Taskify</Logo>
      <SearchContainer>
        <SearchIcon>
          <FiSearch size={16} />
        </SearchIcon>
        <SearchInput
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks... (use / to focus)"
          aria-label="Search tasks"
        />
        {searchQuery && (
          <ClearButton onClick={handleClearSearch} aria-label="Clear search">
            <FiX size={16} />
          </ClearButton>
        )}
      </SearchContainer>
      <Controls>
        <ViewToggle>
          <ViewButton
            $active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <FiList size={16} />
          </ViewButton>
          <ViewButton
            $active={viewMode === 'board'}
            onClick={() => setViewMode('board')}
            aria-label="Board view"
          >
            <FiColumns size={16} />
          </ViewButton>
        </ViewToggle>
        <IconButton onClick={toggleTheme} aria-label="Toggle theme">
          {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </IconButton>
        <HamburgerButton onClick={toggleSidebar} aria-label="Open menu">
          <FiMenu size={20} />
        </HamburgerButton>
      </Controls>
    </HeaderContainer>
  );
};
