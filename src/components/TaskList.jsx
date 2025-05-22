import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { TaskItem } from './TaskItem';

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

export const TaskList = () => {
  const { tasks } = useTaskStore();
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // Increased height to accommodate meta information
    overscan: 10, // Increased overscan for smoother scrolling
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
          const task = tasks[virtualRow.index];
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