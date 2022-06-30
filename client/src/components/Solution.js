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
        <p>{formattedNotes()}</p>
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
