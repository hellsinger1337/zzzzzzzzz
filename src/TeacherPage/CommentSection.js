import React, { useState, useEffect } from 'react';
import './CommentSection.css';
import {getComments,commentTeacher,getMe} from '../services/api'

const CommentSection = ({ teacherId}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const fetchComments = async () => {
      
    try {
      const response = await getComments(teacherId);
      if (!response) {
        throw new Error('Network response was not ok');
      }
      const data = await response.data;
      setComments(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [teacherId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await commentTeacher(teacherId,newComment,localStorage.token)

      fetchComments();
      setNewComment('');
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div className="comment-section">
      {(
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment"
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}
     <div className="comments-list">
        {comments.map(comment => (
          <div key={comment.id} className="comment">
            {comment.username? (
              <>
                <strong>{comment.username}</strong>
                <p>{comment.content}</p>
                <small>{new Date(comment.time).toLocaleString()}</small>
              </>
            ) : (
              <p>Invalid comment data</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
