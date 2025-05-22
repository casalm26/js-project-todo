import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { TaskItem } from './TaskItem';
import { startOfDay, isAfter } from 'date-fns';

const ListContainer = styled.div`
  height: calc(100vh - 4rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const VirtualList = styled.div`
  position: relative;
  width: 100%;
`;

const TaskItemWrapper = styled.div`
  width: 100%;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TaskList = () => {
  const { tasks, projects } = useTaskStore();
  const { activeFilters, setFilter } = useUiStore();
  const parentRef = React.useRef(null);

  // Filter tasks based on active filters
  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (activeFilters.status === 'completed' && !task.completed) return false;
    if (activeFilters.status === 'uncompleted' && task.completed) return false;
    // Project filter
    if (activeFilters.project && task.projectId !== activeFilters.project) return false;
    return true;
  });

  const rowVirtualizer = useVirtualizer({
    count: filteredTasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 10,
  });

  if (tasks.length === 0) {
    return (
      <ListContainer>
        <EmptyState>
          <h2>No tasks yet</h2>
          <p>Press Q to add your first task</p>
        </EmptyState>
      </ListContainer>
    );
  }

  return (
    <ListContainer ref={parentRef}>
      <VirtualList
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const task = filteredTasks[virtualRow.index];
          return (
            <TaskItemWrapper
              key={task.id}
              data-task-id={task.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <TaskItem task={task} />
            </TaskItemWrapper>
          );
        })}
      </VirtualList>
    </ListContainer>
  );
}; 