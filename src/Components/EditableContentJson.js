import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const EditableContentJson = () => {
  const [isSave, setIsSave] = useState(false);
  const [content, setContent] = useState('Example Text for Editing');
  const [jsonData, setJsonData] = useState([
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, perspiciatis?',
      isEditable: false,
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, perspiciatis?',
      isEditable: false,
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, perspiciatis?',
      isEditable: false,
    },
  ]);
  const [isEditable, setIsEditable] = useState(
    jsonData.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  const [editedItemId, setEditedItemId] = useState(null);

  useEffect(() => {
    const [x, jsonDataString] = [
      localStorage.getItem('test'),
      localStorage.getItem('jsonData'),
    ];

    if (x) {
      setContent(x);
    }

    if (jsonDataString) {
      setJsonData(JSON.parse(jsonDataString));
    }
  }, []);

  const handleEditClick = (id) => {
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log('iseditable', isEditable);
    setEditedItemId(id);
    const item = jsonData.find((dataItem) => dataItem.id === id);
    setContent(item.text);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSaveClick = (id) => {
    const updatedData = jsonData.map((dataItem) =>
      dataItem.id === editedItemId
        ? { ...dataItem, text: content, isEditable: false }
        : dataItem
    );
    setJsonData(updatedData);
    setEditedItemId(null);
    localStorage.setItem('test', content);
    localStorage.setItem('jsonData', JSON.stringify(updatedData));
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const saveData = () => {
    localStorage.setItem('jsonData', JSON.stringify(jsonData));
    setIsSave(false);
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

  return (
    <div className='container mt-2'>
      {jsonData.map((item) =>
        isEditable[item.id] ? (
          <>
            <ReactQuill
              theme='snow'
              value={content}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
            />
            <button
              className='savebtn'
              onClick={() => handleSaveClick(item.id)}
            >
              Save
            </button>
          </>
        ) : (
          <p
            key={item.id}
            onClick={() => handleEditClick(item.id)}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
          ></p>
        )
      )}
    </div>
  );
};

export default EditableContentJson;
//  improve above code when i open one text editor it will open only button with that {isEditable[item.id] && (
//         <button className='savebtn' onClick={() => handleSaveClick()}>
//           Save
//         </button>
//         where to add this button to work properly on id base editing p
