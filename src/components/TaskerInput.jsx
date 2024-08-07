import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from '../store/store';

const StyledAddTodoContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  &.active {
    box-shadow: 0 17px 0 -16px var(--major);
  }
`;

const StyledLabelIcon = styled.label`
  display: inline-flex;
  font-size: 30px;
  transition: color 0.2s ease-out;
  font-weight: 300;
  cursor: pointer;

  &:after {
    content: '+';
  }
`;

const StyledInputContainer = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  flex: 1;
  user-select: none;

  input {
    flex: 1;
    padding: 8px 12px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--major);
      font-size: 13px;
    }
  }

  .active {
    input::placeholder {
      color: var(--gray);
    }
  }
`;

const TodoInput = () => {
  const addTask = useStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (title.trim() && dueDate) {
      addTask(title, dueDate);
      setTitle('');
      setDueDate('');
    }
  };

  return (
    <StyledAddTodoContainer>
      <StyledLabelIcon
        className="icon"
        htmlFor="add-todo-input"
        onClick={handleAddTask}
      />
      <StyledInputContainer>
        <input
          id="add-todo-input"
          type="text"
          placeholder="新增工作"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </StyledInputContainer>
    </StyledAddTodoContainer>
  );
};

export default TodoInput;
