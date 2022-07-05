import React from "react";
import styled from "styled-components";

const CommentBox = styled.div`
  background-color: rgb(80, 80, 80);
  margin: 4px;
  padding: 4px;
  text-align: left;
  color: black;
`;

const Author = styled.h5`
  margin: 5px;
  font-size: 0.7rem;
`;

const CommentContent = styled.p`
  margin-left: 10px;
  margin-bottom: 5px;
  font-size: 0.8rem;
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
