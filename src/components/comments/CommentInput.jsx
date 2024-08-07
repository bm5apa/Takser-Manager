import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useStore from '../../store/store';

const CommentInput = React.memo(
  ({ taskId, editCommentId, existingContent, onClose }) => {
    const [content, setContent] = useState(existingContent);
    const addComment = useStore((state) => state.addComment);
    const editComment = useStore((state) => state.editComment);

    useEffect(() => {
      setContent(existingContent);
    }, [existingContent]);

    const handleChange = (e) => {
      setContent(e.target.value);
    };

    const handleSubmit = () => {
      if (editCommentId) {
        editComment(taskId, editCommentId, content);
      } else {
        addComment(taskId, content);
      }
      onClose();
    };

    return (
      <div>
        <textarea value={content} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  },
);

CommentInput.propTypes = {
  taskId: PropTypes.number.isRequired,
  editCommentId: PropTypes.number,
  existingContent: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CommentInput;
