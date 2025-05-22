import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { Plus } from './icons/Plus';

const Container = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  width: 250px;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
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

const ProjectListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

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

const ProgressBar = styled.div`
  height: 2px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-top: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ progress }) => `${progress}%`};
  transition: width ${({ theme }) => theme.transitions.default};
`;

export const ProjectList = () => {
  const { projects, tasks, addProject, setActiveProject } = useTaskStore();
  const { activeFilters, setFilter } = useUiStore();

  const handleProjectClick = (projectId) => {
    setFilter('project', projectId);
  };

  const handleAddProject = () => {
    const name = prompt('Enter project name:');
    if (name?.trim()) {
      addProject(name.trim());
    }
  };

  const getProjectProgress = (projectId) => {
    const projectTasks = tasks.filter((task) => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter((task) => task.completed).length;
    return (completedTasks / projectTasks.length) * 100;
  };

  return (
    <Container>
      <Header>
        <Title>Projects</Title>
        <AddButton onClick={handleAddProject} aria-label="Add new project">
          <Plus size={16} />
        </AddButton>
      </Header>
      <ProjectListContainer>
        {projects.map((project) => {
          const projectTasks = tasks.filter(
            (task) => task.projectId === project.id
          );
          const progress = getProjectProgress(project.id);
          const isActive = activeFilters.project === project.id;

          return (
            <ProjectItem key={project.id}>
              <ProjectButton
                onClick={() => handleProjectClick(project.id)}
                active={isActive}
              >
                <ProjectName>{project.name}</ProjectName>
                <ProjectCount>{projectTasks.length}</ProjectCount>
              </ProjectButton>
              <ProgressBar>
                <Progress progress={progress} />
              </ProgressBar>
            </ProjectItem>
          );
        })}
      </ProjectListContainer>
    </Container>
  );
}; 