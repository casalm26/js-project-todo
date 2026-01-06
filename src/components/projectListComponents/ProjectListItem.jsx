import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

const ProjectItem = styled.li`
  margin-bottom: 0.25rem;
`;

const ProjectRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProjectButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ProjectName = styled.span`
  font-size: 0.875rem;
  text-align: left;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProjectCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.125rem 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin-left: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.125rem;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};

  ${ProjectRow}:hover & {
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

const EditForm = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 0.375rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
  }
`;

const EditActions = styled.div`
  display: flex;
  gap: 0.125rem;
`;

export const ProjectListItem = ({
  id,
  name,
  count,
  active,
  onClick,
  onDelete,
  onRename,
  children,
  isEditable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditName(name);
    setIsEditing(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editName.trim() && onRename) {
      onRename(id, editName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditName(name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <ProjectItem>
        <ProjectRow>
          <EditForm onSubmit={handleSave} onKeyDown={handleKeyDown}>
            <EditInput
              ref={inputRef}
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              aria-label="Project name"
            />
            <EditActions>
              <ActionButton type="submit" aria-label="Save">
                <FiCheck size={14} />
              </ActionButton>
              <ActionButton type="button" onClick={handleCancel} aria-label="Cancel">
                <FiX size={14} />
              </ActionButton>
            </EditActions>
          </EditForm>
        </ProjectRow>
        {children}
      </ProjectItem>
    );
  }

  return (
    <ProjectItem>
      <ProjectRow>
        <ProjectButton onClick={onClick} $active={active} aria-label={`Select project ${name}`}>
          <ProjectName>{name}</ProjectName>
          <ProjectCount>{count}</ProjectCount>
        </ProjectButton>
        {isEditable && (
          <Actions>
            <ActionButton onClick={handleEditClick} aria-label="Rename project">
              <FiEdit2 size={14} />
            </ActionButton>
            <ActionButton onClick={handleDeleteClick} className="danger" aria-label="Delete project">
              <FiTrash2 size={14} />
            </ActionButton>
          </Actions>
        )}
      </ProjectRow>
      {children}
    </ProjectItem>
  );
};
