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
          <TaskerFilter />
          <TaskerSearch />
          <TaskerCollection onSelectTask={handleTaskClick} />
          <TaskerInput />
        </div>
        <div
          style={{
            flex: 1,
            paddingLeft: '10px',
          }}
        >
          {selectedTaskId && <TaskerDetail taskId={selectedTaskId} />}
        </div>
      </div>
    </div>
  );
};

export default TaskerPage;
