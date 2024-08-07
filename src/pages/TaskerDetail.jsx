import React, { useMemo } from 'react';
import useStore from '../store/store';
import CommentManager from '../components/comments/CommentManager';

const TaskerDetail = ({ taskId }) => {
  const tasks = useStore((state) => state.tasks);

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [tasks, taskId]);

  if (!task) return <div>Task not found</div>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Due Date: {task.dueDate}</p>
      <p>Status: {task.isDone ? 'Completed' : 'Pending'}</p>
      <CommentManager taskId={taskId} />
    </div>
  );
};

export default TaskerDetail;
