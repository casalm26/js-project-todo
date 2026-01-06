import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';
import { isTaskDueToday, isTaskUpcoming, isTaskOverdue } from '../utils/dateUtils';

const ListContainer = styled.div`
  height: calc(100vh - 4rem);
  overflow: auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const TasksList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ViewHeader = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const TaskList = () => {
  const { tasks, tags } = useTaskStore();
  const { activeFilters, searchQuery } = useUiStore();

  // Memoized filtered tasks for better performance
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) return false;
      }

      // Status filter
      if (activeFilters.status === 'completed' && !task.completed) return false;
      if (activeFilters.status === 'uncompleted' && task.completed) return false;

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
  }, [tasks, activeFilters.status, activeFilters.project, activeFilters.tag, activeFilters.dateView, searchQuery]);

  const getViewTitle = () => {
    if (searchQuery.trim()) return `Search: "${searchQuery}"`;
    if (activeFilters.tag) {
      const tag = tags.find(t => t.id === activeFilters.tag);
      return tag ? `Tag: ${tag.name}` : null;
    }
    if (activeFilters.dateView === 'today') return 'Today';
    if (activeFilters.dateView === 'upcoming') return 'Upcoming (Next 7 Days)';
    return null;
  };

  const viewTitle = getViewTitle();

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
      {viewTitle && <ViewHeader>{viewTitle}</ViewHeader>}
      <TasksList>
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </TasksList>
    </ListContainer>
  );
}; 