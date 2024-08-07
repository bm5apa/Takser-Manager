import React, { useState, useCallback } from 'react';
import CommentCollection from './CommentCollection';
import CommentInput from './CommentInput';

const CommentManager = ({ taskId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [existingContent, setExistingContent] = useState('');

  const handleEditClick = useCallback((commentId, content) => {
    setEditCommentId(commentId);
    setExistingContent(content);
    setIsEditing(true);
  }, []);

  const handleAddClick = useCallback(() => {
    setEditCommentId(null);
    setExistingContent('');
    setIsEditing(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsEditing(false);
    setEditCommentId(null);
    setExistingContent('');
  }, []);

  return (
    <div>
      <CommentCollection taskId={taskId} onEditClick={handleEditClick} />
      {isEditing && (
        <CommentInput
          taskId={taskId}
          editCommentId={editCommentId}
          existingContent={existingContent}
          onClose={handleClose}
        />
      )}
      {!isEditing && <button onClick={handleAddClick}>Add Comment</button>}
    </div>
  );
};

export default CommentManager;
