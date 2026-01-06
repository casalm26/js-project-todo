import styled from 'styled-components';
import { useUiStore } from '../../store/useUiStore';
import { useTaskStore } from '../../store/useTaskStore';
import { FiSun, FiCalendar, FiInbox } from 'react-icons/fi';
import { isTaskDueToday, isTaskUpcoming, isTaskOverdue } from '../../utils/dateUtils';

const Container = styled.div`
  padding: 0 1rem 1rem;
`;

const ViewButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.default};
  font-size: 0.875rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ViewIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color || 'inherit'};
`;

const ViewLabel = styled.span`
  flex: 1;
  text-align: left;
`;

const ViewCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.125rem 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const DateViewFilters = () => {
  const { activeFilters, setFilter, toggleSidebar } = useUiStore();
  const { tasks } = useTaskStore();

  const handleViewClick = (dateView) => {
    setFilter('dateView', dateView);
    setFilter('project', null);
    if (window.innerWidth <= 768) toggleSidebar();
  };

  const todayCount = tasks.filter(
    (t) => !t.completed && (isTaskDueToday(t.dueDate) || isTaskOverdue(t.dueDate, t.completed))
  ).length;

  const upcomingCount = tasks.filter(
    (t) => !t.completed && isTaskUpcoming(t.dueDate)
  ).length;

  return (
    <Container>
      <ViewButton
        $active={activeFilters.dateView === 'all' && !activeFilters.project}
        onClick={() => handleViewClick('all')}
      >
        <ViewIcon>
          <FiInbox size={16} />
        </ViewIcon>
        <ViewLabel>Inbox</ViewLabel>
        <ViewCount>{tasks.filter((t) => !t.completed).length}</ViewCount>
      </ViewButton>
      <ViewButton
        $active={activeFilters.dateView === 'today'}
        onClick={() => handleViewClick('today')}
      >
        <ViewIcon $color="#dc2626">
          <FiSun size={16} />
        </ViewIcon>
        <ViewLabel>Today</ViewLabel>
        <ViewCount>{todayCount}</ViewCount>
      </ViewButton>
      <ViewButton
        $active={activeFilters.dateView === 'upcoming'}
        onClick={() => handleViewClick('upcoming')}
      >
        <ViewIcon $color="#8b5cf6">
          <FiCalendar size={16} />
        </ViewIcon>
        <ViewLabel>Upcoming</ViewLabel>
        <ViewCount>{upcomingCount}</ViewCount>
      </ViewButton>
    </Container>
  );
};
