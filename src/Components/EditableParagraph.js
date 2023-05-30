import React, { useState } from 'react';

function EditableParagraph() {
  const [content, setContent] = useState('Hello, world! Paragraph');
  const [isEditable, setIsEditable] = useState(false);

  function handleEditClick() {
    setIsEditable(true);
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleSaveClick() {
    setIsEditable(false);
  }

  return (
    <div>
      {isEditable ? (
        <div>
          <input type='text' value={content} onChange={handleContentChange} />
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <p onClick={handleEditClick}>{content}</p>
      )}
    </div>
  );
}
export default EditableParagraph;
