import React, { useCallback } from 'react';
import useStore from '../../store/store';

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
          <p>{comment.text}</p>
          <small>{comment.date}</small>
          <button onClick={() => handleDeleteClick(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
});

export default CommentCollection;
