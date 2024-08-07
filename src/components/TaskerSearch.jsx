import React from 'react';
import useStore from '../store/store';

const TaskerSearch = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <label>
        Search Tasks:
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
