import styled from 'styled-components';
import { ProjectListItem } from './ProjectListItem';

const ProjectListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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

export const ProjectListItems = ({ projects, tasks, activeProject, onProjectClick, getProjectProgress }) => (
  <ProjectListContainer>
    <ProjectListItem
      name="All tasks"
      count={tasks.length}
      active={!activeProject}
      onClick={() => onProjectClick(null)}
    />
    {projects.map((project) => {
      const projectTasks = tasks.filter((task) => task.projectId === project.id);
      const progress = getProjectProgress(project.id);
      const isActive = activeProject === project.id;
      return (
        <ProjectListItem
          key={project.id}
          name={project.name}
          count={projectTasks.length}
          active={isActive}
          onClick={() => onProjectClick(project.id)}
        >
          <ProgressBar>
            <Progress progress={progress} />
          </ProgressBar>
        </ProjectListItem>
      );
    })}
  </ProjectListContainer>
); 