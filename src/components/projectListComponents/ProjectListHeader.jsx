import styled from 'styled-components';
import { FiPlus, FiCheck } from 'react-icons/fi';
import { useTaskStore } from '../../store/useTaskStore';
import { device } from '../../styles/media';

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.5rem 1rem;
  ${device.mobile} {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  display: none;
  ${device.mobile} {
    display: flex;
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    cursor: pointer;
    margin-left: 0.5rem;
    transition: background 0.2s;
    &:hover {
      background: ${({ theme }) => theme.colors.surfaceHover || '#f1f1f1'};
    }
  }
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const CompleteAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};
  margin-left: 0.5rem;
  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.text};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ProjectListHeader = ({ onAdd, onClose }) => {
  const { tasks, completeAllTasks } = useTaskStore();
  const openTasks = tasks.filter((task) => !task.completed).length;
  const hasIncompleteTasks = openTasks > 0;

  return (
    <DrawerHeader>
      <Title>Projects</Title>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CompleteAllButton
          onClick={completeAllTasks}
          disabled={!hasIncompleteTasks}
          aria-label="Complete all tasks"
        >
          <FiCheck size={14} />
          Complete all
        </CompleteAllButton>
        <AddButton onClick={onAdd} aria-label="Add new project">
          <FiPlus size={16} />
        </AddButton>
        <CloseButton onClick={onClose} aria-label="Close menu">×</CloseButton>
      </div>
    </DrawerHeader>
  );
}; 