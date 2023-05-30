import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const Report3 = ({ jsonForReportEditing, setJsonForReportEditing }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [mainHeading, setMainHeading] = useState('');
  const [summaryContents, setSummaryContents] = useState('');
  const [editedItemId, setEditedItemId] = useState(null);

  const handleEditClick = (id, dataField, value) => {
    setIsEditable(true);
    console.log('iseditable');
    setEditedItemId(id);
    const item = jsonForReportEditing.background.find(
      (dataItem) => dataItem.id === id
    );
    console.log(item);
    if (item.id === id && dataField === 'mainheading') {
      setMainHeading(value);
      setSummaryContents('');
    }
    if (item.id === id && dataField === 'contents') {
      setSummaryContents(value);
      setMainHeading('');
    }
  };

  const handleMHeadingChange = (value) => {
    setMainHeading(value);
  };
  const handleContentsChange = (value) => {
    setSummaryContents(value);
  };

  const handleSaveClick = (id) => {
    const updatedData = jsonForReportEditing.background?.map((dataItem) =>
      dataItem.id === editedItemId
        ? {
            ...dataItem,
            mainheading: mainHeading ? mainHeading : dataItem.mainheading,
            contents: summaryContents ? summaryContents : dataItem.contents,
          }
        : dataItem
    );
    console.log(updatedData);
    setJsonForReportEditing((prevState) => ({
      ...prevState,
      background: updatedData,
    }));

    setEditedItemId(null);
    localStorage.setItem('test', mainHeading);
    localStorage.setItem('reportJson3', JSON.stringify(updatedData));
    setIsEditable(false);
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

  useEffect(() => {
    const jsonDataString = localStorage.getItem('reportJson3');

    if (jsonDataString) {
      setJsonForReportEditing((prevState) => ({
        ...prevState,
        background: JSON.parse(jsonDataString),
      }));
    }
  }, []);

  return (
    <div className='mt-2'>
      {jsonForReportEditing.background?.map((summary) => {
        return (
          <>
            {isEditable && mainHeading !== '' ? (
              <>
                <ReactQuill
                  theme='snow'
                  value={mainHeading}
                  onChange={handleMHeadingChange}
                  modules={modules}
                  formats={formats}
                />
                <button
                  className='btn btn-success savebtn'
                  onClick={() => handleSaveClick(summary.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <p
                className='excutive-summary-heading'
                key={summary.id}
                onClick={() =>
                  handleEditClick(
                    summary.id,
                    'mainheading',
                    summary.mainheading
                  )
                }
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(summary.mainheading),
                }}
              ></p>
            )}
            {isEditable && summaryContents !== '' ? (
              <>
                <ReactQuill
                  theme='snow'
                  value={summaryContents}
                  onChange={handleContentsChange}
                  modules={modules}
                  formats={formats}
                />
                <button
                  className='btn btn-success savebtn'
                  onClick={() => handleSaveClick(summary.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <p
                className=''
                onClick={() =>
                  handleEditClick(summary.id, 'contents', summary.contents)
                }
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(summary?.contents),
                }}
              ></p>
            )}
            {summary?.subcontents?.map((subcontent) => (
              <div className='executive-sumary-subcontent' key={subcontent.id}>
                <p>{subcontent?.heading}</p>
                <p>{subcontent?.contents}</p>
                {subcontent.subcontents?.map((subcontentL3) => (
                  <div className='ms-3' key={subcontentL3.id}>
                    <p className='subcontent-heading-level-2'>
                      {subcontentL3?.subheading}
                    </p>
                    {<p>{subcontentL3?.contents}</p>}
                    {subcontentL3.subcontents?.map((subcontentL4) => (
                      <div className='ms-3' key={subcontentL4.id}>
                        <p>
                          <strong>{subcontentL4.subheading}</strong>
                        </p>
                        {<p>{subcontentL4?.contents}</p>}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </>
        );
      })}
    </div>
  );
};

export default Report3;
