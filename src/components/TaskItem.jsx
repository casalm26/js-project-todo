import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { FiCheck, FiTrash2 } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { isPast, startOfDay } from 'date-fns';

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme, $selected }) => 
    $selected ? theme.colors.primaryLight : theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-left: ${({ theme, $selected }) => 
    $selected ? `3px solid ${theme.colors.primary}` : '3px solid transparent'};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;

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

const DueDate = styled(MetaItem)`
  color: ${({ theme, $isOverdue }) => 
    $isOverdue ? theme.colors.error : theme.colors.textSecondary};
  font-weight: ${({ $isOverdue }) => ($isOverdue ? '500' : 'normal')};
`;

export const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTaskStore();
  const { selectedTaskId, setSelectedTaskId } = useUiStore();
  
  const isOverdue = task.dueDate && isPast(startOfDay(new Date(task.dueDate))) && !task.completed;
  const isSelected = selectedTaskId === task.id;

  const handleClick = () => {
    setSelectedTaskId(task.id);
  };

  return (
    <ItemContainer 
      $selected={isSelected}
      onClick={handleClick}
    >
      <Checkbox
        onClick={(e) => {
          e.stopPropagation();
          toggleTask(task.id);
        }}
        aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as complete`}
      >
        {task.completed && <FiCheck size={14} />}
      </Checkbox>
      <Content>
        <Title $completed={task.completed}>{task.title}</Title>
        <Meta>
          {task.dueDate && (
            <DueDate $isOverdue={isOverdue}>
              <time dateTime={task.dueDate}>
                {new Date(task.dueDate).toLocaleDateString(undefined, {
                  day: '2-digit',
                  month: '2-digit'
                })}
              </time>
              {isOverdue && ' (overdue)'}
            </DueDate>
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
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          aria-label="Delete task"
        >
          <FiTrash2 size={16} />
        </ActionButton>
      </Actions>
    </ItemContainer>
  );
}; 