import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

const ListContainer = styled.div`
  height: calc(100vh - 4rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskList = () => {
  const { tasks } = useTaskStore();
  const { activeFilters } = useUiStore();

  // Memoized filtered tasks for better performance
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Status filter
      if (activeFilters.status === 'completed' && !task.completed) return false;
      if (activeFilters.status === 'uncompleted' && task.completed) return false;
      
      // Project filter
      if (activeFilters.project && task.projectId !== activeFilters.project) return false;
      
      return true;
    });
  }, [tasks, activeFilters.status, activeFilters.project]);

  if (tasks.length === 0) {
    return (
      <ListContainer>
        <EmptyState type="no-tasks" />
      </ListContainer>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <ListContainer>
        <EmptyState type="no-results" />
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      <TasksList>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </TasksList>
    </ListContainer>
  );
}; 