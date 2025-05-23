import styled from 'styled-components';
import { useTaskStore } from '../../store/useTaskStore';
import { useUiStore } from '../../store/useUiStore';
import { FiPlus, FiX } from 'react-icons/fi';
import { device } from '../../styles/media';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const CloseButton = styled(ActionButton)`
  display: none;
  ${device.mobile} {
    display: flex;
  }
`;

export const ProjectListHeader = () => {
  const { addProject } = useTaskStore();
  const { toggleSidebar } = useUiStore();

  const handleAddProject = () => {
    const name = prompt('Enter project name:');
    if (name?.trim()) {
      addProject(name.trim());
    }
  };

  return (
    <HeaderContainer>
      <Title>Projects</Title>
      <HeaderActions>
        <ActionButton onClick={handleAddProject} aria-label="Add project">
          <FiPlus size={16} />
        </ActionButton>
        <CloseButton onClick={toggleSidebar} aria-label="Close sidebar">
          <FiX size={16} />
        </CloseButton>
      </HeaderActions>
    </HeaderContainer>
  );
}; 