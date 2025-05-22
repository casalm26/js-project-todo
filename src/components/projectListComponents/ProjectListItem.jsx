import styled from 'styled-components';

const ProjectItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ProjectButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border: none;
  background: none;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const ProjectName = styled.span`
  font-size: 0.875rem;
`;

const ProjectCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0.125rem 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const ProjectListItem = ({ name, count, active, onClick, children }) => (
  <ProjectItem>
    <ProjectButton onClick={onClick} active={active}>
      <ProjectName>{name}</ProjectName>
      <ProjectCount>{count}</ProjectCount>
    </ProjectButton>
    {children}
  </ProjectItem>
); 