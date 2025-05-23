import styled from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import { ProjectListHeader } from './projectListComponents/ProjectListHeader';
import { ProjectFilterBar } from './projectListComponents/ProjectFilterBar';
import { ProjectListItems } from './projectListComponents/ProjectListItems';
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
  ${device.desktop} {
    position: static;
    z-index: 100;
    box-shadow: none;
    border-right: none;
  }
  ${device.mobile} {
    position: fixed;
    top: 0;
    right: 0;
    left: auto;
    height: 100vh;
    z-index: 1001;
    transform: translateX(${({ $open }) => ($open ? '0' : '100%')});
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
    box-shadow: -0.125rem 0 1rem rgba(0,0,0,0.16);
    min-width: 80vw;
    max-width: 20rem;
    padding: 0;
    border-right: none;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 0.0625rem solid ${({ theme }) => theme.colors.border};
  margin: 0 0 1rem 0;
`;

export const ProjectList = () => {
  const { sidebarOpen, toggleSidebar } = useUiStore();

  // Overlay click closes drawer
  const handleOverlayClick = () => {
    if (sidebarOpen) toggleSidebar();
  };

  return (
    <>
      <DrawerOverlay $open={sidebarOpen} onClick={handleOverlayClick} />
      <DrawerContainer $open={sidebarOpen}>
        <ProjectListHeader />
        <ProjectFilterBar />
        <Divider />
        <ProjectListItems />
      </DrawerContainer>
    </>
  );
}; 