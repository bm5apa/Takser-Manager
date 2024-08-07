import React, { useState, useCallback } from 'react';
import {
  TaskerCollection,
  TaskerInput,
  TaskerFilter,
  TaskerSearch,
} from '../components';
import TaskerDetail from './TaskerDetail';

const TaskerPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleTaskClick = useCallback((id) => {
    setSelectedTaskId(id);
  }, []);

  return (
    <div>
      Tasker Manager
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <TaskerSearch />
          <TaskerCollection onSelectTask={handleTaskClick} />
          <TaskerInput />
          <TaskerFilter />
        </div>
        <div
          style={{ flex: 1, borderLeft: '1px solid #ccc', paddingLeft: '10px' }}
        >
          {selectedTaskId && <TaskerDetail taskId={selectedTaskId} />}
        </div>
      </div>
    </div>
  );
};

export default TaskerPage;
