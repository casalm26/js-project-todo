import styled from 'styled-components';
import { useUiStore } from '../../store/useUiStore';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Illustration = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.8;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  max-width: 400px;
  margin: 0 auto;
`;

const KeyboardShortcut = styled.kbd`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-family: monospace;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0 0.25rem;
`;

export const EmptyState = ({ type = 'no-tasks' }) => {
  const { isDarkMode } = useUiStore();

  const getContent = () => {
    switch (type) {
      case 'no-tasks':
        return {
          title: 'No tasks yet',
          description: (
            <>
              Press <KeyboardShortcut>Q</KeyboardShortcut> to add your first task
            </>
          ),
          illustration: isDarkMode ? '🌙' : '☀️',
        };
      case 'all-done':
        return {
          title: 'All done!',
          description: 'Time to celebrate your productivity',
          illustration: '🎉',
        };
      case 'no-results':
        return {
          title: 'No matching tasks',
          description: 'Try adjusting your filters',
          illustration: '🔍',
        };
      default:
        return {
          title: 'Nothing here',
          description: 'This space is empty',
          illustration: '📭',
        };
    }
  };

  const content = getContent();

  return (
    <Container>
      <Illustration>{content.illustration}</Illustration>
      <Title>{content.title}</Title>
      <Description>{content.description}</Description>
    </Container>
  );
}; 