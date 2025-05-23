import styled from 'styled-components';
import { useTaskStore } from '../../store/useTaskStore';
import { useUiStore } from '../../store/useUiStore';
import { ProjectListItem } from './ProjectListItem';

const ProjectListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProgressBar = styled.div`
  height: 0.125rem;
  background-color: ${({ theme }) => theme.colors.border};
  margin-top: 0.25rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${({ $progress }) => `${$progress}%`};
  transition: width ${({ theme }) => theme.transitions.default};
`;

export const ProjectListItems = () => {
  const { projects, tasks } = useTaskStore();
  const { activeFilters, setFilter, toggleSidebar } = useUiStore();

  const handleProjectClick = (projectId) => {
    setFilter('project', projectId);
    if (window.innerWidth <= 768) toggleSidebar();
  };

  const getProjectProgress = (projectId) => {
    const projectTasks = tasks.filter((task) => task.projectId === projectId);
    if (projectTasks.length === 0) return 0;
    const completedTasks = projectTasks.filter((task) => task.completed).length;
    return (completedTasks / projectTasks.length) * 100;
  };

  return (
    <ProjectListContainer>
      <ProjectListItem
        name="All tasks"
        count={tasks.length}
        active={!activeFilters.project}
        onClick={() => handleProjectClick(null)}
      />
      {projects.map((project) => {
        const projectTasks = tasks.filter((task) => task.projectId === project.id);
        const progress = getProjectProgress(project.id);
        const isActive = activeFilters.project === project.id;
        return (
          <ProjectListItem
            key={project.id}
            name={project.name}
            count={projectTasks.length}
            active={isActive}
            onClick={() => handleProjectClick(project.id)}
          >
            <ProgressBar>
              <Progress $progress={progress} />
            </ProgressBar>
          </ProjectListItem>
        );
      })}
    </ProjectListContainer>
  );
}; 