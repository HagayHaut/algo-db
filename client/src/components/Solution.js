import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";
import Comment from "./Comment";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SolutionContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  text-align: center;
  margin-top: 10px;
  background-color: rgb(100, 100, 100);
`;

const DetailsContainer = styled.div`
  color: white;
  background-color: rgb(57, 57, 57);
  text-align: center;
  width: 20%;
`;

const ShowHideButton = styled.p`
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bolder;
  color: black;
`;

const SolutionInfo = styled.p`
  font-size: 1.1rem;
  margin-bottom: 7px;
  text-align: center;
`;

const CategoryTitle = styled.h5`
  font-size: 0.7rem;
  text-align: center;
`;

const NotesTitle = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin: 8px 0 8px 0;
  color: black;
`;

const NotesContainer = styled.div``;

const NotesCanvas = styled.div`
  background-color: rgb(57, 57, 57);
  color: white;
  width: 67%;
  margin: auto;
  padding: 20px;
  border-radius: 5%;
`;

const MDContainer = styled.div`
  text-align: left;
`;

const CodeAndDesc = styled.div`
  display: flex;
  flex-direction: row;
`;

const CodeContainer = styled.div`
  width: 80%;
  text-align: left;
`;

const Code = styled.div`
  text-align: left;
`;

const Input = styled.input`
  margin-bottom: 4px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
`;

const Number = styled.p`
  background-color: rgb(80, 80, 80);
  color: rgb(40, 40, 40);
  display: inline-block;
  padding: 1px 3px 1px 3px;
  border-radius: 20%;
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
  }, [selectedSolution]);

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

  function handleCommentToggle() {
    setShowComments(!showComments);
  }

  return (
    <SolutionContainer>
      <CodeAndDesc>
        <CodeContainer>
          <Number>{index + 1}</Number>
          <Code>
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
          </Code>
        </CodeContainer>
        <DetailsContainer>
          <CategoryTitle>Author</CategoryTitle>
          <SolutionInfo>{user_name}</SolutionInfo>
          <CategoryTitle>Language</CategoryTitle>
          <SolutionInfo>{getLanguage(language)}</SolutionInfo>
          <CategoryTitle>Time Complexity</CategoryTitle>
          <SolutionInfo>{time_complexity}</SolutionInfo>
          <CategoryTitle>Space Complexity</CategoryTitle>
          <SolutionInfo>{space_complexity}</SolutionInfo>
        </DetailsContainer>
      </CodeAndDesc>
      <MDContainer>
        <NotesTitle>Notes</NotesTitle>
        <NotesContainer>
          <NotesCanvas>
            <ReactMarkdown>{notes}</ReactMarkdown>
          </NotesCanvas>
        </NotesContainer>
      </MDContainer>
      {showComments && (
        <form onSubmit={handleCommentSubmit}>
          {commentList}
          <Input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
          />
        </form>
      )}

      <ShowHideButton onClick={handleCommentToggle}>
        {showComments ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </ShowHideButton>
    </SolutionContainer>
  );
}

export default Solution;
