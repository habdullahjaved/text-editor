import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const EditableContent = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState('Example Text for Editing');

  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleSaveClick = () => {
    setIsEditable(false);
    console.log(content);
    localStorage.setItem('text', content);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'color',
    'background',
    'link',
    'image',
  ];

  let jsonData = [
    { id: 1, text: 'This is Text 1' },
    { id: 2, text: 'This is Text 2' },
    { id: 3, text: 'This is Text 3' },
  ];
  let x = localStorage.getItem('text');
  return (
    <div className='container mt-2'>
      {isEditable ? (
        <ReactQuill
          theme='snow'
          value={content}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
        />
      ) : (
        <p
          onClick={handleEditClick}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        ></p>
      )}
      {isEditable && <button onClick={handleSaveClick}>Save</button>}

      {x && <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(x) }}></p>}
    </div>
  );
};

export default EditableContent;
