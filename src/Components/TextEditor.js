// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// function EditableText({ text, onUpdate }) {
//   const [editing, setEditing] = useState(false);
//   const [newText, setNewText] = useState(text);

//   function handleStartEditing() {
//     setEditing(true);
//   }

//   function handleFinishEditing() {
//     setEditing(false);
//     onUpdate(newText);
//   }

//   function handleTextChange(value) {
//     setNewText(value);
//   }

//   if (editing) {
//     return (
//       <div>
//         <ReactQuill value={newText} onChange={handleTextChange} />
//         <button onClick={handleFinishEditing}>Save</button>
//       </div>
//     );
//   } else {
//     return <div onClick={handleStartEditing}>{text}</div>;
//   }
// }
// export default EditableText;
// setJsonData(
//   jsonData.map((item) => {
//     if (item.id === editedItemId) {
//       return { ...item, text: content, isEditable: false };
//     } else {
//       return item;
//     }
//   })
// );
// In above code only first object is clickble and editable from jsonData i want all objects should be editable and also edited updated content shown when save like content and disply updated 3 obects update all on id based
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const EditableContentJson = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState('Example Text for Editing');
  const [jsonData, setJsonData] = useState([
    { id: 1, text: 'This is Text 1', isEditable: true },
    { id: 2, text: 'This is Text 2', isEditable: false },
    { id: 3, text: 'This is Text 3', isEditable: false },
  ]);

  useEffect(() => {
    let x = localStorage.getItem('test');
    if (x) {
      setContent(x);
    }

    let jsonDataString = localStorage.getItem('jsonData');
    if (jsonDataString) {
      setJsonData(JSON.parse(jsonDataString));
    }
  }, []);

  const handleEditClick = (item) => {
    setIsEditable(true);
    setJsonData((prevData) =>
      prevData.map((dataItem) =>
        dataItem.id === item.id ? { ...dataItem, isEditable: true } : dataItem
      )
    );
    setContent(item.text);
  };

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    setJsonData((prevData) =>
      prevData.map((dataItem) =>
        dataItem.isEditable
          ? { ...dataItem, text: content, isEditable: false }
          : dataItem
      )
    );
    localStorage.setItem('test', content);
    localStorage.setItem('jsonData', JSON.stringify(jsonData));
    console.log(content);
    console.log(jsonData);
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
    <div>
      {isEditable ? (
        <ReactQuill
          theme='snow'
          value={content}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
        />
      ) : (
        jsonData.map((item) => (
          <p
            key={item.id}
            onClick={() => item.isEditable && handleEditClick(item)}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.text) }}
          ></p>
        ))
      )}
      {isEditable && <button onClick={handleSaveClick}>Save</button>}
    </div>
  );
};

export default EditableContentJson;

//
// let studyDesign =[
//   {
//     id: 1,
//     design: 'Randomised Controlled Trial',
//     content:
//       'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//   },
//   {
//     id: 2,
//     design: 'Randomised Controlled Trial',
//     content:
//       'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//   },
//   {
//     id: 3,
//     design: 'Randomised Controlled Trial',
//     content:
//       'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//   },
// ];
// const addId = studyDesign.map((study) => ({ ...study, id: 1 }));
// console.log(addId);
// // how to add dynmically id of 1 2 3 in an array

// const saveAll = () => {
//   let reportJson = {
//     id: 'Testing',
//   };
//   reportJson.study_design = studyDesign;
//   reportJson.objectives = objectives;
//   console.log('infunction', reportJson);
// };
//  <button onClick={() => saveAll()}>Save</button>;
// <p>
//   <strong>Author:</strong> {reportJson.author}
// </p>
// <p>
//   <strong>Journal:</strong> {reportJson.journal}
// </p>
// <p>
//   <strong>Year:</strong> {reportJson.year}
// </p>
// {
//   <p>
//     <strong>Title:</strong> {reportJson.tittle}
//   </p>
// }
// {
//   <p>
//     <strong>Volume:</strong> {reportJson.volume}
//   </p>
// }
// {
//   <p>
//     <strong>Pages:</strong> {reportJson.pages}
//   </p>
// }
// import React, { useState } from 'react';

// const StudyEditor = () => {
//   const [studyDesign, setStudyDesign] = useState([
//     {
//       id: 1,
//       design: 'Randomised Controlled Trial',
//       content:
//         'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//     },
//     {
//       id: 2,
//       design: 'Randomised Controlled Trial',
//       content:
//         'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//     },
//     {
//       id: 3,
//       design: 'Randomised Controlled Trial',
//       content:
//         'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
//     },
//   ]);
//   const [isEditableStudy, setIsEditableStudy] = useState(false);
//   const [studyDesignId, setStudyDesignId] = useState(null);
//   const [content, setContent] = useState('');
//   const modules = {
//     toolbar: [
//       [{ font: [] }],
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       [{ color: [] }, { background: [] }],
//       ['link', 'image'],
//       ['clean'],
//     ],
//   };

//   const formats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'color',
//     'background',
//     'link',
//     'image',
//   ];

//   const handleStudyEdit = (id, design, content) => {
//     setIsEditableStudy(true);
//     setStudyDesignId(id);
//     console.log(id);
//     console.log(design);
//     console.log(content);
//     const item = studyDesign.find((dataItem) => dataItem.id === id);
//     item.design === design
//       ? setContent(item.design)
//       : item.content === content
//       ? setContent(item.content)
//       : '';
//   };
//   const handleStudyEditorChange = (value) => {
//     setContent(value);
//   };
//   const handleSaveStudy = () => {
//     const updatedStudy = studyDesign.map((dataItem) =>
//       dataItem.id === editedItemId ? { ...dataItem, design: content } : dataItem
//     );
//     setStudyDesign(updatedStudy);
//     setStudyDesignId(null);
//     localStorage.setItem('reportJson', JSON.stringify(updatedData));
//     setIsEditableStudy(false);
//   };
//   return (
//     <div>
//       <div className='row'>
//         <div className='col-lg-12 col-md-12 col-sm-12'>
//           <h1 className='bg-info text-left'>Study Design</h1>
//           {isEditableStudy ? (
//             <ReactQuill
//               theme='snow'
//               value={content}
//               onChange={handleStudyEditorChange}
//               modules={modules}
//               formats={formats}
//             />
//           ) : (
//             studyDesign.map((study) => {
//               return (
//                 <div key={study.id}>
//                   <h3
//                     onClick={() => handleStudyEdit(study.id, study.design)}
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(study.design),
//                     }}
//                   ></h3>
//                   <p
//                     onClick={() => handleStudyEdit(study.id, study.content)}
//                     dangerouslySetInnerHTML={{
//                       __html: DOMPurify.sanitize(study.content),
//                     }}
//                   ></p>
//                   {isEditableStudy && (
//                     <button onClick={handleSaveStudy}>Save</button>
//                   )}
//                 </div>
//               );
//             })
//           )}
//           {}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudyEditor;
