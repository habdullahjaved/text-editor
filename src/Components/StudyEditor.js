import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';

const StudyEditor = () => {
  const [studyDesign, setStudyDesign] = useState([
    {
      id: 1,
      design: 'Randomised Controlled Trial 1',
      content: 'Multicentre, analyst-blinded',
    },
    {
      id: 2,
      design: 'Randomised Controlled Trial 2',
      content: 'Multicentre, analyst-blinded',
    },
    {
      id: 3,
      design: 'Randomised Controlled Trial 3',
      content: 'Multicentre, analyst-blinded',
    },
  ]);
  const [isEditableStudy, setIsEditableStudy] = useState(false);
  const [studyDesignId, setStudyDesignId] = useState(null);
  const [design, setDesign] = useState('');
  const [content, setContent] = useState('');
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

  const handleStudyEdit = (id, dataField, value) => {
    setIsEditableStudy(true);
    setStudyDesignId(id);
    const item = studyDesign.find((dataItem) => dataItem.id === id);
    if (item.id === id && dataField === 'design') {
      setDesign(value);
    }
    if (item.id === id && dataField === 'content') {
      setContent(value);
    }
  };
  // const [isEditable, setIsEditable] = useState(
  //   jsonForReportEditing.executive_summary?.reduce((acc, item) => {
  //     acc[item.id] = false;
  //     return acc;
  //   }, {})
  // );
  const handleDesignChange = (value) => {
    setDesign(value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSaveStudy = () => {
    const updatedStudy = studyDesign.map((dataItem) =>
      dataItem.id === studyDesignId
        ? {
            ...dataItem,
            design: design ? design : dataItem.design,
            content: content ? content : dataItem.content,
          }
        : dataItem
    );
    setStudyDesign(updatedStudy);
    console.log(studyDesign);
    localStorage.setItem('studyDesign', JSON.stringify(updatedStudy));
    setDesign('');
    setContent('');
    setIsEditableStudy(false);
  };

  useEffect(() => {
    const reportJsonString = localStorage.getItem('studyDesign');

    if (reportJsonString) {
      setStudyDesign(JSON.parse(reportJsonString));
    }
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Study Design</h1>
          {isEditableStudy ? (
            <>
              {design !== '' ? (
                <ReactQuill
                  theme='snow'
                  value={design}
                  onChange={handleDesignChange}
                  modules={modules}
                  formats={formats}
                />
              ) : (
                <ReactQuill
                  theme='snow'
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                />
              )}
            </>
          ) : (
            studyDesign.map((study) => {
              return (
                <div key={study.id}>
                  <h3
                    onClick={() =>
                      handleStudyEdit(study.id, 'design', study.design)
                    }
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(study.design),
                    }}
                  ></h3>
                  <p
                    onClick={() =>
                      handleStudyEdit(study.id, 'content', study.content)
                    }
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(study.content),
                    }}
                  ></p>
                </div>
              );
            })
          )}
          {isEditableStudy && <button onClick={handleSaveStudy}>Save</button>}
        </div>
      </div>
    </div>
  );
};

export default StudyEditor;
