import React, { useState } from 'react';
import styled from 'styled-components';
import useStore from '../store/store';
import {
  CheckActiveIcon,
  CheckCircleIcon,
  CheckHoverIcon,
} from 'assets/images';

const StyledTaskItem = styled.div`
  min-height: 52px;
  display: flex;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 12px;
  box-shadow: 0 17px 0 -16px #e5e5e5;
  flex-wrap: wrap;

  .task-item-body-input {
    user-select: none;
    display: none;
    flex: 1;
    padding: 8px 0px;
    border: 0;
    outline: 0;
    font-size: 1rem;

    &::placeholder {
      color: var(--gray);
      font-size: 13px;
    }
  }

  &:hover {
    background: #fff3eb;
    box-shadow: inset 0 0 0 1px #fff3eb;

    .task-item-action .btn-destroy {
      display: inline-flex;
    }
  }

  &.done {
    .task-item-body {
      color: var(--gray);
      text-decoration: line-through;
    }

    .icon-checked {
      background-image: url(${CheckActiveIcon});
    }
  }

  &.edit {
    .task-item-body-input {
      display: block;
    }
    .task-item-body-text {
      display: none;
    }
    .task-item-action {
      display: none;
    }
  }

  .task-item-checked {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .task-item-body {
    font-weight: 400;
    padding: 8px 12px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .task-item-due-date {
    font-size: 0.9rem;
    color: var(--gray);
    margin-top: 4px;
  }

  .task-item-action {
    .btn-destroy {
      display: none;
      font-size: 30px;
      transition: color 0.2s ease-out;
      font-weight: 300;
      &:after {
        content: '×';
      }
    }
  }

  .icon-checked {
    background-image: url(${CheckCircleIcon});
    background-position: center;
    background-repeat: no-repeat;

    &:hover {
      transition: background-image 0.5s;
      background-image: url(${CheckHoverIcon});
    }
  }
`;

const TaskerItem = ({ id, title, isDone, dueDate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDueDate, setNewDueDate] = useState(dueDate);

  const toggleTaskCompletion = useStore((state) => state.toggleTaskCompletion);
  const deleteTask = useStore((state) => state.deleteTask);
  const editTask = useStore((state) => state.editTask);

  const handleEditToggle = () => setIsEditing((prev) => !prev);
  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleDueDateChange = (e) => setNewDueDate(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  const handleSave = () => {
    editTask(id, newTitle, newDueDate);
    setIsEditing(false);
  };

  return (
    <StyledTaskItem
      className={`${isDone ? 'done' : ''} ${isEditing ? 'edit' : ''}`}
    >
      <div className="task-item-checked">
        <span
          className="icon icon-checked"
          onClick={() => toggleTaskCompletion(id)}
        />
      </div>
      <div className="task-item-body">
        {isEditing ? (
          <>
            <input
              className="task-item-body-input"
              value={newTitle}
              onChange={handleTitleChange}
              placeholder="Edit task"
              onKeyDown={handleKeyDown}
            />
            <input
              type="date"
              className="task-item-body-input"
              value={newDueDate}
              onChange={handleDueDateChange}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            <span className="task-item-body-text">{title}</span>
            <span className="task-item-due-date">
              {new Date(dueDate).toLocaleDateString()}
            </span>
          </>
        )}
      </div>
      <div className="task-item-action">
        {isEditing ? (
          <>
            <button className="btn-reset" onClick={handleSave}>
              Save
            </button>
            <button className="btn-reset" onClick={handleEditToggle}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-reset btn-destroy"
              onClick={() => deleteTask(id)}
            />
            <button className="btn-reset" onClick={handleEditToggle}>
              Edit
            </button>
          </>
        )}
      </div>
    </StyledTaskItem>
  );
};

export default TaskerItem;
