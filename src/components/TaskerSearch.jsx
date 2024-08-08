import React, { useCallback } from 'react';
import useStore from '../store/store';

const TaskerSearch = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleSearchChange = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery],
  );

  return (
    <div>
      <label>
        Search:
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearchChange}
        />
      </label>
    </div>
  );
};

export default TaskerSearch;
