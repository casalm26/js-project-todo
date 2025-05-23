import styled, { useTheme } from 'styled-components';
import { useUiStore } from '../store/useUiStore';
import Weightless from './Weightless';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
`;

const Illustration = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg} auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 25rem;
  margin: 0 auto;
  color: #181818;
  font-weight: 500;
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
  const theme = useTheme();
  const { isDarkMode } = useUiStore();

  // Convert theme color to hex if needed
  const getHexColor = (color) => {
    // If already a hex, return as is
    if (typeof color === 'string' && color.startsWith('#')) return color;
    // If rgb/rgba, convert to hex
    if (typeof color === 'string' && color.startsWith('rgb')) {
      const rgb = color.match(/\d+/g);
      if (!rgb) return '#333333';
      return (
        '#' + rgb.slice(0, 3).map(x => (+x).toString(16).padStart(2, '0')).join('')
      );
    }
    // Fallback
    return '#333333';
  };

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
          illustration: (
            <Weightless
              lineColor={getHexColor(theme.colors.textSecondary)}
              backgroundColor={getHexColor(theme.colors.background)}
            />
          ),
        };
      case 'all-done':
        return {
          title: 'All done!',
          description: 'Take the rest of the day off!',
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