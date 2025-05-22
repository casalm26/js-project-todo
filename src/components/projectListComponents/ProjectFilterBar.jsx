import styled from 'styled-components';

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin-bottom: 0.25rem;
  @media (min-width: 769px) {
    width: auto;
    margin-bottom: 0;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProjectFilterBar = ({ status, setStatus }) => (
  <FilterBar>
    <FilterSelect
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      aria-label="Filter by status"
    >
      <option value="all">All tasks</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
    </FilterSelect>
  </FilterBar>
); 