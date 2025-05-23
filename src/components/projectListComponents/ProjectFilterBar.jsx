import styled from 'styled-components';
import { device } from '../../styles/media';

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
  border: 0.0625rem solid ${({ theme }) => theme.colors.border};
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  ${device.desktop} {
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