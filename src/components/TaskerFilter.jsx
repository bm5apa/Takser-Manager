import React, { useCallback } from 'react';
import styled from 'styled-components';
import useStore from '../store/store';

const StyledAddTaskerFilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  flex-wrap: wrap;
`;

const TaskerFilter = () => {
  const setFilter = useStore((state) => state.setFilter);

  const handleFilterChange = useCallback(
    (e) => {
      setFilter(e.target.value);
    },
    [setFilter],
  );

  return (
    <StyledAddTaskerFilterContainer>
      <div>
        <label>
          Category:
          <select onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="today">Today</option>
            <option value="thisWeek">This Week</option>
            <option value="thisMonth">This Month</option>
            <option value="completed">Completed</option>
          </select>
        </label>
      </div>
    </StyledAddTaskerFilterContainer>
  );
};

export default TaskerFilter;
