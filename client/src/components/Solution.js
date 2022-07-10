import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
// dark styles
import arta from "react-syntax-highlighter/dist/esm/styles/hljs/arta";
import obsidian from "react-syntax-highlighter/dist/esm/styles/hljs/obsidian";
import dracula from "react-syntax-highlighter/dist/esm/styles/hljs/dracula";
import gml from "react-syntax-highlighter/dist/esm/styles/hljs/gml";
import far from "react-syntax-highlighter/dist/esm/styles/hljs/far";
import hopscotch from "react-syntax-highlighter/dist/esm/styles/hljs/hopscotch";
import monokai from "react-syntax-highlighter/dist/esm/styles/hljs/monokai";
import pojoaque from "react-syntax-highlighter/dist/esm/styles/hljs/pojoaque";
import purebasic from "react-syntax-highlighter/dist/esm/styles/hljs/purebasic";
import agate from "react-syntax-highlighter/dist/esm/styles/hljs/agate";
import xt256 from "react-syntax-highlighter/dist/esm/styles/hljs/xt256";
import sunburst from "react-syntax-highlighter/dist/esm/styles/hljs/sunburst";
import railscasts from "react-syntax-highlighter/dist/esm/styles/hljs/railscasts";
import srcery from "react-syntax-highlighter/dist/esm/styles/hljs/srcery";
import nord from "react-syntax-highlighter/dist/esm/styles/hljs/nord";
import ocean from "react-syntax-highlighter/dist/esm/styles/hljs/ocean";
import vs2015 from "react-syntax-highlighter/dist/esm/styles/hljs/vs2015";
import lioshi from "react-syntax-highlighter/dist/esm/styles/hljs/lioshi";
// light styles
import magula from "react-syntax-highlighter/dist/esm/styles/hljs/magula";
import nnfx from "react-syntax-highlighter/dist/esm/styles/hljs/nnfx";
import routeros from "react-syntax-highlighter/dist/esm/styles/hljs/routeros";
import tomorrow from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow";
import vs from "react-syntax-highlighter/dist/esm/styles/hljs/vs";
import xcode from "react-syntax-highlighter/dist/esm/styles/hljs/xcode";
import ascetic from "react-syntax-highlighter/dist/esm/styles/hljs/ascetic";
import Comment from "./Comment";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

const SolutionContainer = styled.div`
  width: 100%;
  text-align: center;
  background-color: rgb(100, 100, 100);
  margin: 10px;
`;

const DetailsContainer = styled.div`
  background-color: rgb(57, 57, 57);
  text-align: center;
  width: 20%;
`;

const Divider = styled.div`
  border-top: 1px solid #555;
  height: 1px;
  position: relative;
  margin: 4px 12px 4px 12px;
`;

const ShowHideButton = styled.p`
  text-align: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bolder;
  color: #222;
`;

const SolutionInfo = styled.p`
  font-size: 0.8rem;
  margin: 7px 0 7px 0;
  text-align: center;
`;

const CategoryTitle = styled.p`
  font-size: 0.6rem;
  text-align: center;
  color: #999;
`;

const NotesTitle = styled.p`
  font-size: 0.9rem;
  color: #fefefe;
  margin-bottom: 4px;
  text-align: center;
`;

const NotesContainer = styled.div``;

const NotesCanvas = styled.div`
  background-color: rgb(57, 57, 57);
  font-size: 0.7rem;
  color: #ddd;
  width: 67%;
  margin: 0 auto 10px auto;
  padding: 20px;
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
  user-select: text;
`;

const Input = styled.input`
  margin: 8px 20px 4px 4px;
  background-color: rgb(57, 57, 57);
  color: #fefefe;
  border: none;
  border-radius: 5%;
  width: 80%;
  padding: 4px;
`;

const Number = styled.p`
  background-color: rgb(170, 170, 170);
  color: black;
  display: inline-block;
  padding: 1px 3px 1px 3px;
`;

function Solution({ selectedSolution, index, user, codeStyle }) {
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
  }, [selectedSolution, id]);

  function getCodeStyle(str) {
    switch (str) {
      case "arta":
        return arta;
      case "ocean":
        return ocean;
      case "obsidian":
        return obsidian;
      case "dracula":
        return dracula;
      case "gml":
        return gml;
      case "lioshi":
        return lioshi;
      case "pojoaque":
        return pojoaque;
      case "purebasic":
        return purebasic;
      case "far":
        return far;
      case "hopscotch":
        return hopscotch;
      case "monokai":
        return monokai;
      case "nnfx":
        return nnfx;
      case "agate":
        return agate;
      case "sunburst":
        return sunburst;
      case "xt256":
        return xt256;
      case "magula":
        return magula;
      case "railscasts":
        return railscasts;
      case "routeros":
        return routeros;
      case "srcery":
        return srcery;
      case "tomorrow":
        return tomorrow;
      case "nord":
        return nord;
      case "vs":
        return vs;
      case "xcode":
        return xcode;
      case "ascetic":
        return ascetic;
      default:
        return vs2015;
    }
  }

  function getLanguage(str) {
    switch (str) {
      case "csharp":
        return "C#";
      case "cpp":
        return "C++";
      case "php":
        return "PHP";
      case "javascript":
        return "JavaScript";
      case "typescript":
        return "TypeScript";
      case "coffeescript":
        return "CoffeeScript";
      case "sql":
        return "SQL";
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
              style={getCodeStyle(codeStyle)}
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
          <Divider />
          <CategoryTitle>Author</CategoryTitle>
          <SolutionInfo>{user_name}</SolutionInfo>
          <Divider />
          <CategoryTitle>Language</CategoryTitle>
          <SolutionInfo>{getLanguage(language)}</SolutionInfo>
          <Divider />
          <CategoryTitle>Time Complexity</CategoryTitle>
          <SolutionInfo>{time_complexity}</SolutionInfo>
          <Divider />
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
