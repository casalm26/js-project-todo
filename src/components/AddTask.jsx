import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useTaskStore } from '../store/useTaskStore';
import { useUiStore } from '../store/useUiStore';
import { FiPlus } from 'react-icons/fi';
import { device } from '../styles/media';

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  ${device.mobile} {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    align-items: center;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  ${device.mobile} {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const DateInput = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  ${device.mobile} {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  transition: background-color ${({ theme }) => theme.transitions.default};
  grid-row: 1 / span 2;
  grid-column: 2 / 3;
  align-self: center;
  ${device.desktop} {
    grid-row: auto;
    grid-column: auto;
    align-self: auto;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
  }
`;

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const inputRef = useRef(null);
  const { addTask } = useTaskStore();
  const { activeFilters } = useUiStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask(title.trim(), activeFilters.project || null, dueDate || null);
    setTitle('');
    setDueDate('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        aria-label="New task title"
      />
      <DateInput
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        aria-label="Due date"
      />
      <AddButton type="submit" disabled={!title.trim()} aria-label="Add task">
        <FiPlus size={20} />
      </AddButton>
    </Form>
  );
}; 