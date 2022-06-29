import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
`;

const TextareaInput = ({ spaces = 4, onTextChange }) => {
  const [text, setText] = useState({ value: "", caret: -1, target: null });

  useEffect(() => {
    if (text.caret >= 0) {
      text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
    }
  }, [text]);

  const handleTab = (e) => {
    let content = e.target.value;
    let caret = e.target.selectionStart;

    if (e.key === "Tab") {
      e.preventDefault();

      let newText =
        content.substring(0, caret) +
        " ".repeat(spaces) +
        content.substring(caret);

      setText({ value: newText, caret: caret, target: e.target });
    }
  };

  function handleChange(e) {
    handleText(e);
    onTextChange(e);
  }

  const handleText = (e) =>
    setText({ value: e.target.value, caret: -1, target: e.target });

  return (
    <TextArea
      onChange={handleChange}
      onKeyDown={handleTab}
      value={text.value}
    />
  );
};

export default TextareaInput;
