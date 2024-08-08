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
      if (!content.trim()) {
        onClose();
        return;
      }
      if (editCommentId) {
        editComment(taskId, editCommentId, content);
      } else {
        addComment(taskId, content);
      }
      onClose();
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <textarea
          value={content}
          onChange={handleChange}
          style={{
            width: '80%',
            height: '100px',
            marginLeft: '70px',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingTop: '10px',
          }}
        >
          <button
            className="btn-reset"
            onClick={handleSubmit}
            style={{
              textDecoration: 'underline 2px',
            }}
          >
            Submit
          </button>
          <button
            className="btn-reset"
            onClick={onClose}
            style={{
              textDecoration: 'underline 2px',
            }}
          >
            Cancel
          </button>
        </div>
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
