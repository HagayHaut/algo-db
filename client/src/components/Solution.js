import React from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";

const SolutionContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  text-align: left;
  margin-top: 10px;
`;

const NotesContainer = styled.div`
  border: 1px solid black;
`;

const CommentContainer = styled.div`
  border: 1px solid black;
`;

function Solution({ selectedSolution, index, user }) {
  const {
    solution,
    time_complexity,
    space_complexity,
    notes,
    language,
    comments,
    user_name,
  } = selectedSolution;

  async function getUsername(id) {
    // const response = await
  }

  function getLanguage(str) {
    switch (str) {
      case "csharp":
        return "C#";
      case "cpp":
        return "C++";
      case "php":
        return "PHP";
      default:
        return str[0].toUpperCase() + str.slice(1);
    }
  }

  function displayComments() {
    const commentList = comments.map((com, i) => (
      <CommentContainer>
        <h5>{com.user_id}</h5>
        <p>{com.comment}</p>
      </CommentContainer>
    ));

    return <>{commentList}</>;
  }

  return (
    <SolutionContainer>
      <h4>{index + 1}.</h4>
      <SyntaxHighlighter
        language={language}
        style={obsidian}
        wrapLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {solution}
      </SyntaxHighlighter>
      <NotesContainer>
        <h5>Author</h5>
        <p>{user_name}</p>
        <h5>Language</h5>
        <p>{getLanguage(language)}</p>
        <h5>Time Complexity</h5>
        <p>{time_complexity}</p>
        <h5>Space Complexity</h5>
        <p>{space_complexity}</p>
        <h5>Notes</h5>
        <p>{notes}</p>
      </NotesContainer>
      {comments.length > 0 && displayComments()}
    </SolutionContainer>
  );
}

export default Solution;
