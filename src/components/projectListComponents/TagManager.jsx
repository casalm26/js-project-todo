import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../../store/useTaskStore';
import { useUiStore } from '../../store/useUiStore';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX, FiTag } from 'react-icons/fi';

const Container = styled.div`
  padding: 0 1rem 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const AddButton = styled.button`
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

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TagItem = styled.li`
  margin-bottom: 0.25rem;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
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

const TagColor = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

const TagName = styled.span`
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.125rem;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};

  ${TagRow}:hover & {
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

  &.danger:hover {
    color: ${({ theme }) => theme.colors.error};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  margin-bottom: 0.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.375rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ColorInput = styled.input`
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  background: none;

  &::-webkit-color-swatch-wrapper {
    padding: 2px;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const FormButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
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
      background-color: ${({ theme }) => theme.colors.surface};
    }
  }
`;

const DEFAULT_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280'
];

export const TagManager = () => {
  const { tags, tasks, addTag, deleteTag, updateTag } = useTaskStore();
  const { activeFilters, setFilter, toggleSidebar } = useUiStore();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formName, setFormName] = useState('');
  const [formColor, setFormColor] = useState(DEFAULT_COLORS[0]);
  const inputRef = useRef(null);

  useEffect(() => {
    if ((isAdding || editingId) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding, editingId]);

  const getTagTaskCount = (tagId) => {
    return tasks.filter((task) => task.tags?.includes(tagId)).length;
  };

  const handleTagClick = (tagId) => {
    setFilter('tag', activeFilters.tag === tagId ? null : tagId);
    setFilter('dateView', 'all');
    setFilter('project', null);
    if (window.innerWidth <= 768) toggleSidebar();
  };

  const handleAddClick = () => {
    setFormName('');
    setFormColor(DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)]);
    setIsAdding(true);
  };

  const handleEditClick = (e, tag) => {
    e.stopPropagation();
    setFormName(tag.name);
    setFormColor(tag.color);
    setEditingId(tag.id);
  };

  const handleDeleteClick = (e, tagId) => {
    e.stopPropagation();
    if (activeFilters.tag === tagId) {
      setFilter('tag', null);
    }
    deleteTag(tagId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingId) {
      updateTag(editingId, formName.trim(), formColor);
      setEditingId(null);
    } else {
      addTag(formName.trim(), formColor);
      setIsAdding(false);
    }
    setFormName('');
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormName('');
  };

  return (
    <Container>
      <Header>
        <Title>Tags</Title>
        <AddButton onClick={handleAddClick} aria-label="Add tag">
          <FiPlus size={14} />
        </AddButton>
      </Header>

      {isAdding && (
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <ColorInput
              type="color"
              value={formColor}
              onChange={(e) => setFormColor(e.target.value)}
              aria-label="Tag color"
            />
            <Input
              ref={inputRef}
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Tag name"
              aria-label="Tag name"
            />
          </FormRow>
          <FormActions>
            <FormButton type="button" className="secondary" onClick={handleCancel}>
              Cancel
            </FormButton>
            <FormButton type="submit" className="primary">
              Add
            </FormButton>
          </FormActions>
        </Form>
      )}

      <TagList>
        {tags.map((tag) => {
          const isEditing = editingId === tag.id;
          const taskCount = getTagTaskCount(tag.id);
          const isActive = activeFilters.tag === tag.id;

          if (isEditing) {
            return (
              <TagItem key={tag.id}>
                <Form onSubmit={handleSubmit}>
                  <FormRow>
                    <ColorInput
                      type="color"
                      value={formColor}
                      onChange={(e) => setFormColor(e.target.value)}
                      aria-label="Tag color"
                    />
                    <Input
                      ref={inputRef}
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Tag name"
                      aria-label="Tag name"
                    />
                  </FormRow>
                  <FormActions>
                    <FormButton type="button" className="secondary" onClick={handleCancel}>
                      Cancel
                    </FormButton>
                    <FormButton type="submit" className="primary">
                      Save
                    </FormButton>
                  </FormActions>
                </Form>
              </TagItem>
            );
          }

          return (
            <TagItem key={tag.id}>
              <TagRow>
                <TagButton onClick={() => handleTagClick(tag.id)} $active={isActive}>
                  <TagColor $color={tag.color} />
                  <TagName>{tag.name}</TagName>
                  <TagCount>{taskCount}</TagCount>
                </TagButton>
                <Actions>
                  <ActionButton onClick={(e) => handleEditClick(e, tag)} aria-label="Edit tag">
                    <FiEdit2 size={12} />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => handleDeleteClick(e, tag.id)}
                    className="danger"
                    aria-label="Delete tag"
                  >
                    <FiTrash2 size={12} />
                  </ActionButton>
                </Actions>
              </TagRow>
            </TagItem>
          );
        })}
      </TagList>

      {tags.length === 0 && !isAdding && (
        <TagButton onClick={handleAddClick} style={{ width: '100%', justifyContent: 'center' }}>
          <FiTag size={14} />
          <span>Create your first tag</span>
        </TagButton>
      )}
    </Container>
  );
};
