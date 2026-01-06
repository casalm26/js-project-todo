import { useMemo } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { TaskItem } from './TaskItem';
import { isTaskDueToday, isTaskUpcoming, isTaskOverdue } from '../utils/dateUtils';
import { device } from '../styles/media';

const BoardContainer = styled.div`
  height: calc(100vh - 4rem);
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  height: 100%;
  min-width: min-content;
`;

const Column = styled.div`
  width: 320px;
  min-width: 320px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  flex-direction: column;
  max-height: 100%;

  ${device.mobile} {
    width: 280px;
    min-width: 280px;
  }
`;

const ColumnHeader = styled.div`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg} 0 0;
`;

const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColumnCount = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

const ColumnDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

const ColumnContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
`;

const TaskCard = styled.div`
  margin-bottom: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const EmptyColumn = styled.div`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const COLUMNS = [
  { id: 'p1', title: 'Urgent', color: '#dc2626', filter: (t) => !t.completed && t.priority === 1 },
  { id: 'p2', title: 'High', color: '#f97316', filter: (t) => !t.completed && t.priority === 2 },
  { id: 'p3', title: 'Medium', color: '#3b82f6', filter: (t) => !t.completed && (t.priority === 3 || !t.priority || t.priority === 4) },
  { id: 'done', title: 'Done', color: '#22c55e', filter: (t) => t.completed },
];

export const BoardView = () => {
  const { tasks, tags } = useTaskStore();
  const { activeFilters, searchQuery } = useUiStore();

  // Apply global filters first
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      // Project filter
      if (activeFilters.project && task.projectId !== activeFilters.project) return false;

      // Tag filter
      if (activeFilters.tag && !task.tags?.includes(activeFilters.tag)) return false;

      // Date view filter
      if (activeFilters.dateView === 'today') {
        const isDueToday = isTaskDueToday(task.dueDate);
        const isOverdue = isTaskOverdue(task.dueDate, task.completed);
        if (!isDueToday && !isOverdue) return false;
      }
      if (activeFilters.dateView === 'upcoming') {
        if (!isTaskUpcoming(task.dueDate)) return false;
      }

      return true;
    });
  }, [tasks, activeFilters.project, activeFilters.tag, activeFilters.dateView, searchQuery]);

  // Group tasks by column
  const columnTasks = useMemo(() => {
    return COLUMNS.map(column => ({
      ...column,
      tasks: filteredTasks.filter(column.filter),
    }));
  }, [filteredTasks]);

  return (
    <BoardContainer>
      <ColumnsWrapper>
        {columnTasks.map((column) => (
          <Column key={column.id}>
            <ColumnHeader>
              <ColumnTitle>
                <ColumnDot $color={column.color} />
                {column.title}
              </ColumnTitle>
              <ColumnCount>{column.tasks.length}</ColumnCount>
            </ColumnHeader>
            <ColumnContent>
              {column.tasks.length === 0 ? (
                <EmptyColumn>No tasks</EmptyColumn>
              ) : (
                column.tasks.map((task) => (
                  <TaskCard key={task.id}>
                    <TaskItem task={task} />
                  </TaskCard>
                ))
              )}
            </ColumnContent>
          </Column>
        ))}
      </ColumnsWrapper>
    </BoardContainer>
  );
};
