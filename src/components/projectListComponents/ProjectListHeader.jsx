import styled from 'styled-components';
import { Plus } from '../icons/Plus';

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.5rem 1rem;
  @media (max-width: 768px) {
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
  @media (max-width: 768px) {
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

export const ProjectListHeader = ({ onAdd, onClose }) => (
  <DrawerHeader>
    <Title>Projects</Title>
    <CloseButton onClick={onClose} aria-label="Close menu">×</CloseButton>
    <AddButton onClick={onAdd} aria-label="Add new project">
      <Plus size={16} />
    </AddButton>
  </DrawerHeader>
); 