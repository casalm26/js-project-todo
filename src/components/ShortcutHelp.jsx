import styled from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import { FiX } from 'react-icons/fi';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ShortcutList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const ShortcutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Description = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;

const Keys = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const Key = styled.kbd`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: color ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const shortcuts = [
  { description: 'Quick add task', keys: ['q'] },
  { description: 'Submit form', keys: ['⌘', 'Enter'] },
  { description: 'Complete selected task', keys: ['x'] },
  { description: 'Complete all tasks', keys: ['⌥', 'Shift', 'x'] },
  { description: 'Navigate up', keys: ['↑'] },
  { description: 'Navigate down', keys: ['↓'] },
  { description: 'Show shortcuts help', keys: ['?'] },
];

export const ShortcutHelp = () => {
  const { isShortcutHelpOpen, toggleShortcutHelp } = useUiStore();
  
  if (!isShortcutHelpOpen) return null;

  return (
    <ModalOverlay onClick={toggleShortcutHelp}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Title>Keyboard Shortcuts</Title>
        <ShortcutList>
          {shortcuts.map(({ description, keys }) => (
            <ShortcutItem key={description}>
              <Description>{description}</Description>
              <Keys>
                {keys.map((key) => (
                  <Key key={key}>{key}</Key>
                ))}
              </Keys>
            </ShortcutItem>
          ))}
        </ShortcutList>
        <CloseButton onClick={toggleShortcutHelp} aria-label="Close shortcuts help">
          <FiX size={20} />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
}; 