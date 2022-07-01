import React from "react";
import styled from "styled-components";

const CommentBox = styled.div`
  border: 1px solid black;
  text-align: left;
`;

const Author = styled.h5`
  margin: 5px;
  font-size: 1rem;
`;

const CommentContent = styled.p`
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 0.9rem;
`;

function Comment({ comment }) {
  return (
    <CommentBox>
      <Author>{comment.user_name}</Author>
      <CommentContent>{comment.comment}</CommentContent>
    </CommentBox>
  );
}

export default Comment;
