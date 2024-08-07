import React from 'react';
import {
  TaskerCollection,
  TaskerInput,
  TaskerFilter,
  TaskerSearch,
} from '../components';
import useStore from '../store/store';

const TaskerPage = () => {
  const filteredTasks = useStore((state) => state.getFilteredTasks());

  return (
    <div>
      Tasker Manager
      <TaskerSearch />
      <TaskerCollection tasks={filteredTasks} />
      <TaskerInput />
      <TaskerFilter />
    </div>
  );
};

export default TaskerPage;
