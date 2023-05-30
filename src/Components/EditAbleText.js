import React from 'react';
import { useState } from 'react';
const EditAbleText = (props) => {
  const [text, setText] = useState(props.text);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    props.onSave(text);
  };

  const handleChange = (event) => {
    setText(event.target.innerText);
  };

  return (
    <div>
      <span
        contentEditable={editing}
        onClick={handleEdit}
        onBlur={handleSave}
        onInput={handleChange}
      >
        {text}
      </span>
      <div>
        <p></p>
      </div>
    </div>
  );
};

export default EditAbleText;
