import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { Check } from './icons/Check';
import { Trash } from './icons/Trash';
import { formatDistanceToNow } from 'date-fns';

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Checkbox = styled.button`
  background: none;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.textSecondary : theme.colors.text};
  text-decoration: ${({ $completed }) => ($completed ? 'line-through' : 'none')};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagList = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
`;

const TagItem = styled.span`
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};

  ${ItemContainer}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();
  console.log('TaskItem task:', task);
  return (
    <ItemContainer>
      <Checkbox
        onClick={() => toggleTask(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed && <Check size={14} />}
      </Checkbox>
      <Content>
        <Title $completed={task.completed}>{task.title}</Title>
        <Meta>
          {task.dueDate && (
            <MetaItem>
              <time dateTime={task.dueDate}>
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  day: '2-digit',
                  month: '2-digit'
                })}
              </time>
            </MetaItem>
          )}
          {task.createdAt && (
            <MetaItem>
              {`created ${formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}`}
            </MetaItem>
          )}
          {task.tags && task.tags.length > 0 && (
            <TagList>
              {task.tags.map((tag) => (
                <TagItem key={tag}>{tag}</TagItem>
              ))}
            </TagList>
          )}
        </Meta>
      </Content>
      <Actions>
        <ActionButton
          onClick={() => deleteTask(task.id)}
          aria-label="Delete task"
        >
          <Trash size={16} />
        </ActionButton>
      </Actions>
    </ItemContainer>
  );
}; 