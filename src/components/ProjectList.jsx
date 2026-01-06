import styled from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import { ProjectListHeader } from './projectListComponents/ProjectListHeader';
import { ProjectFilterBar } from './projectListComponents/ProjectFilterBar';
import { ProjectListItems } from './projectListComponents/ProjectListItems';
import { DateViewFilters } from './projectListComponents/DateViewFilters';
import { TagManager } from './projectListComponents/TagManager';
import { device } from '../styles/media';

const DrawerOverlay = styled.div`
  display: none;
  ${device.mobile} {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.3);
    z-index: 1000;
  }
`;

const DrawerContainer = styled.div`
  width: 17.5rem;
  min-width: 17.5rem;
  height: 100vh;
  background: ${({ theme }) => theme.colors.surface};
  padding: 0;
  border-right: none;
  display: flex;
  flex-direction: column;

  ${device.desktop} {
    position: static;
    z-index: 100;
    box-shadow: none;
  }

  ${device.mobile} {
    position: fixed;
    top: 0;
    right: 0;
    left: auto;
    z-index: 1001;
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: -0.125rem 0 1rem rgba(0,0,0,0.16);
    min-width: 80vw;
    max-width: 20rem;
  }
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Divider = styled.hr`
  border: none;
  border-top: 0.0625rem solid ${({ theme }) => theme.colors.border};
  margin: 0 0 1rem 0;
`;

const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 1rem;
  margin: 0 0 0.5rem 0;
`;

export const ProjectList = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <>
      <DrawerOverlay $open={sidebarOpen} onClick={toggleSidebar} />
      <DrawerContainer $open={sidebarOpen}>
        <ProjectListHeader />
        <ScrollableContent>
          <DateViewFilters />
          <Divider />
          <ProjectFilterBar />
          <SectionTitle>Projects</SectionTitle>
          <ProjectListItems />
          <Divider />
          <TagManager />
        </ScrollableContent>
      </DrawerContainer>
    </>
  );
}; 