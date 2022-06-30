import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CommentBox = styled.div`
  border: 1px solid black;
`;

function Comment({ comment }) {
  return (
    <CommentBox>
      <h5>{comment.user_name}</h5>
      <p>{comment.comment}</p>
    </CommentBox>
  );
}

export default Comment;
