import React, { useCallback } from 'react';
import styled from 'styled-components';
import useStore from '../../store/store';

const StyledComment = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  margin-right: 20px;
  .btn-delete:after {
    content: '×';
    font-size: 28px;
  }
`;

const CommentCollection = React.memo(({ taskId, onEditClick }) => {
  const comments = useStore(
    (state) => state.tasks.find((task) => task.id === taskId)?.comments || [],
  );
  const deleteComment = useStore((state) => state.deleteComment);

  const handleDoubleClick = useCallback(
    (commentId, content) => {
      if (onEditClick) {
        onEditClick(commentId, content);
      }
    },
    [onEditClick],
  );

  const handleDeleteClick = (commentId) => {
    deleteComment(taskId, commentId);
  };

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.id}
          onDoubleClick={() => handleDoubleClick(comment.id, comment.text)}
          style={{ cursor: 'pointer' }}
        >
          <StyledComment>
            <p>{comment.text}</p>
            <button
              className="btn-reset btn-delete"
              onClick={() => handleDeleteClick(comment.id)}
            ></button>
          </StyledComment>
        </div>
      ))}
    </div>
  );
});

export default CommentCollection;
