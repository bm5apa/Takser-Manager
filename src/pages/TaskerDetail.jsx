import React, { useMemo } from 'react';
import styled from 'styled-components';
import useStore from '../store/store';
import CommentManager from '../components/comments/CommentManager';

const StyledCommentManager = styled.div`
  padding-bottom: 30px;
  font-size: 1.1rem;
`;

const TaskerDetail = ({ taskId }) => {
  const tasks = useStore((state) => state.tasks);

  const task = useMemo(() => {
    return tasks.find((t) => t.id === taskId);
  }, [tasks, taskId]);

  if (!task) return <div>Not Found</div>;

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Due Date: {task.dueDate}</p>
      <h3>Comment Section</h3>
      <StyledCommentManager>
        <CommentManager taskId={taskId} />
      </StyledCommentManager>
    </div>
  );
};

export default TaskerDetail;
