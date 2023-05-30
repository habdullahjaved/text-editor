import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewEditor = () => {
  const [text, setText] = useState(
    '<p>Example Text to edit</p><p>Example Text to edit</p>'
  );
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block',
  ];

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={setText}
        modules={modules}
        formats={formats}
      />
      <button
        onClick={() => {
          const updatedText = document.querySelector('.ql-editor').innerHTML;
          setText(updatedText);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default NewEditor;
