import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { FiCheck, FiTrash2, FiEdit2, FiX } from 'react-icons/fi';
import { formatDueDate, formatCreatedDate, isTaskOverdue } from '../utils/dateUtils';

const PRIORITY_COLORS = {
  1: '#dc2626',
  2: '#f97316',
  3: '#3b82f6',
  4: '#9ca3af',
};

const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primaryLight : theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  border-left: ${({ theme, $selected, $priority }) =>
    $selected
      ? `3px solid ${theme.colors.primary}`
      : `3px solid ${PRIORITY_COLORS[$priority] || 'transparent'}`};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const Checkbox = styled.button`
  background: none;
  border: 2px solid ${({ $priority }) => PRIORITY_COLORS[$priority] || '#d1d5db'};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 1.25rem;
  height: 1.25rem;
  min-width: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $priority }) => PRIORITY_COLORS[$priority] || '#3b82f6'};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ $priority }) => PRIORITY_COLORS[$priority] || '#3b82f6'};
    background-color: ${({ $priority }) => PRIORITY_COLORS[$priority] || '#3b82f6'}20;
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

const Description = styled.p`
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre-wrap;
  word-break: break-word;
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
  background-color: ${({ $color }) => $color || '#e0e0e0'};
  color: white;
  padding: 0.125rem 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
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

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const EditInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EditTextarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  width: 100%;
  min-height: 3rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EditRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

const EditDateInput = styled.input`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PrioritySelect = styled.select`
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const EditButton = styled.button`
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  &.primary {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  &.secondary {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;

const PriorityBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ $priority }) => PRIORITY_COLORS[$priority]};
`;

export const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask, updateTask, tags } = useTaskStore();
  const { selectedTaskId, setSelectedTaskId } = useUiStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );
  const [editPriority, setEditPriority] = useState(task.priority || 4);

  const titleInputRef = useRef(null);

  const isOverdue = isTaskOverdue(task.dueDate, task.completed);
  const isSelected = selectedTaskId === task.id;
  const hasTags = task.tags?.length > 0;
  const priority = task.priority || 4;

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditing]);

  const handleTaskClick = () => {
    if (!isEditing) {
      setSelectedTaskId(task.id);
    }
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    toggleTask(task.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    setEditPriority(task.priority || 4);
    setIsEditing(true);
  };

  const handleCancelEdit = (e) => {
    e?.stopPropagation();
    setIsEditing(false);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!editTitle.trim()) return;

    updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      dueDate: editDueDate || null,
      priority: parseInt(editPriority, 10),
    });

    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <ItemContainer
        $selected={isSelected}
        $priority={priority}
        data-task-id={task.id}
        onClick={(e) => e.stopPropagation()}
      >
        <Checkbox
          onClick={handleToggleClick}
          $priority={priority}
          aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as complete`}
        >
          {task.completed && <FiCheck size={14} />}
        </Checkbox>
        <EditForm onSubmit={handleSaveEdit} onKeyDown={handleKeyDown}>
          <EditInput
            ref={titleInputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
            aria-label="Task title"
          />
          <EditTextarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Add description..."
            aria-label="Task description"
          />
          <EditRow>
            <EditDateInput
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              aria-label="Due date"
            />
            <PrioritySelect
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              aria-label="Priority"
            >
              <option value={1}>P1 - Urgent</option>
              <option value={2}>P2 - High</option>
              <option value={3}>P3 - Medium</option>
              <option value={4}>P4 - Low</option>
            </PrioritySelect>
          </EditRow>
          <EditActions>
            <EditButton type="submit" className="primary">
              Save
            </EditButton>
            <EditButton type="button" className="secondary" onClick={handleCancelEdit}>
              Cancel
            </EditButton>
          </EditActions>
        </EditForm>
      </ItemContainer>
    );
  }

  return (
    <ItemContainer
      $selected={isSelected}
      $priority={priority}
      onClick={handleTaskClick}
      data-task-id={task.id}
    >
      <Checkbox
        onClick={handleToggleClick}
        $priority={priority}
        aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as complete`}
      >
        {task.completed && <FiCheck size={14} />}
      </Checkbox>
      <Content>
        <Title $completed={task.completed}>{task.title}</Title>
        {task.description && <Description>{task.description}</Description>}
        <Meta>
          {priority < 4 && <PriorityBadge $priority={priority}>P{priority}</PriorityBadge>}
          {task.dueDate && (
            <DueDate $isOverdue={isOverdue}>
              <time dateTime={task.dueDate}>{formatDueDate(task.dueDate)}</time>
              {isOverdue && ' (overdue)'}
            </DueDate>
          )}
          {task.createdAt && <MetaItem>created {formatCreatedDate(task.createdAt)}</MetaItem>}
          {hasTags && (
            <TagList>
              {task.tags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <TagItem key={tagId} $color={tag.color}>
                    {tag.name}
                  </TagItem>
                );
              })}
            </TagList>
          )}
        </Meta>
      </Content>
      <Actions>
        <ActionButton onClick={handleEditClick} aria-label="Edit task">
          <FiEdit2 size={16} />
        </ActionButton>
        <ActionButton onClick={handleDeleteClick} aria-label="Delete task">
          <FiTrash2 size={16} />
        </ActionButton>
      </Actions>
    </ItemContainer>
  );
};
