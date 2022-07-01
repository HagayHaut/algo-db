import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";
import Comment from "./Comment";

const SolutionContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  text-align: left;
  margin-top: 10px;
`;

const NotesContainer = styled.div`
  border: 1px solid black;
`;

const ShowHideButton = styled.p`
  text-align: center;
  cursor: pointer;
`;

const SolutionInfo = styled.p`
  font-size: 1.1rem;
  margin-bottom: 7px;
`;

const CategoryTitle = styled.h5`
  font-size: 0.9rem;
`;

function Solution({ selectedSolution, index, user }) {
  const [solutionComments, setSolutionComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const {
    id,
    solution,
    time_complexity,
    space_complexity,
    notes,
    language,
    user_name,
  } = selectedSolution;

  useEffect(() => {
    fetch(`/solutions/${id}/comments`)
      .then((r) => r.json())
      .then(setSolutionComments);
  }, []);

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

  const commentList = solutionComments.map((comment, i) => (
    <Comment comment={comment} key={i} />
  ));

  function showHideText() {
    return solutionComments.length < 1
      ? "No Comments :( Click To Add"
      : showComments
      ? "Hide Comments"
      : "Show Comments";
  }

  function formattedNotes() {
    return notes.split("\n").map((line, i) => {
      return line === "" ? <br></br> : <p>{line}</p>;
    });
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    const newComment = {
      user_id: user.id,
      solution_id: id,
      comment: commentInput,
    };
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((r) => r.json())
      .then((data) => {
        setSolutionComments([...solutionComments, data]);
        setCommentInput("");
      });
  }

  return (
    <SolutionContainer>
      <h4>{index + 1}.</h4>
      <SyntaxHighlighter
        language={language}
        style={obsidian}
        showLineNumbers={true}
        wrapLines={true}
        lineProps={{
          style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
        }}
      >
        {solution}
      </SyntaxHighlighter>
      <NotesContainer>
        <CategoryTitle>Author</CategoryTitle>
        <SolutionInfo>{user_name}</SolutionInfo>
        <CategoryTitle>Language</CategoryTitle>
        <SolutionInfo>{getLanguage(language)}</SolutionInfo>
        <CategoryTitle>Time Complexity</CategoryTitle>
        <SolutionInfo>{time_complexity}</SolutionInfo>
        <CategoryTitle>Space Complexity</CategoryTitle>
        <SolutionInfo>{space_complexity}</SolutionInfo>
        <CategoryTitle>Notes</CategoryTitle>
        <SolutionInfo>{formattedNotes()}</SolutionInfo>
      </NotesContainer>
      {showComments && (
        <form onSubmit={handleCommentSubmit}>
          {commentList}
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
        </form>
      )}

      <ShowHideButton onClick={() => setShowComments(!showComments)}>
        {showHideText()}
      </ShowHideButton>
    </SolutionContainer>
  );
}

export default Solution;
