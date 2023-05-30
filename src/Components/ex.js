import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const Report = () => {
  const [jsonForReportEditing, setJsonForReportEditing] = useState({
    executive_summary: [
      {
        id: 1,
        mainheading: 'Executive Summary',
        contents: '1111111111111111111111111',
        subcontents: [
          {
            id: 1,
            heading: 'Background',
            contents: 'Healthcare workers (HCW) are  ',
            subcontents: [],
          },

          {
            id: 4,
            heading: 'Methods',
            contents: '',
            subcontents: [
              {
                id: 1,
                subheading: 'Searching',
                contents:
                  'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
                subcontents: [],
              },
            ],
          },
          {
            id: 5,
            subheading: 'Results and Discussions',
            contents: 'The evidence on ',
            subcontents: [
              {
                id: 1,
                subheading: 'Critical Appraisal of the Literatures',
                contents: 'Multicentre, analyst-blinded, ',
                subcontents: [],
              },
              {
                id: 2,
                subheading: 'Efficacy / Effectiveness',
                contents: 'Multicentre, analyst-blinded, ',
                subcontents: [
                  {
                    id: 1,
                    subheading: 'Needle sticks injuries',
                    contents: 'Multicentre, analyst-blinded, ',
                    subcontents: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const [isEditable, setIsEditable] = useState(
    jsonForReportEditing.executive_summary?.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {})
  );
  const [mainHeading, setMainHeading] = useState('');
  const [summaryContents, setSummaryContents] = useState('');
  const [editedItemId, setEditedItemId] = useState(null);

  // {

  //  mainheading,contents,heading,subcontent.contents,subcontent.subheading,subcontent.contents
  // }

  const handleEditClick = (id) => {
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log('iseditable', isEditable);
    setEditedItemId(id);
    const item = jsonForReportEditing.executive_summary.find(
      (dataItem) => dataItem.id === id
    );
    setMainHeading(item.mainheading);
  };
  const handleEditorChange = (value) => {
    setMainHeading(value);
  };
  const handleSaveClick = (id) => {
    const updatedData = jsonForReportEditing.executive_summary?.map(
      (dataItem) =>
        dataItem.id === editedItemId
          ? { ...dataItem, mainheading: mainHeading }
          : dataItem
    );
    console.log(updatedData);
    setJsonForReportEditing({ executive_summary: updatedData });
    setEditedItemId(null);
    localStorage.setItem('test', mainHeading);
    localStorage.setItem('reportJson', JSON.stringify(updatedData));
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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

  const handleEditSummaryContents = (id) => {
    setIsEditable((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleChangeSummaryContents = (value) => {
    setSummaryContents(value);
  };
  const handleSaveSummaryContents = (id) => {};
  useEffect(() => {
    const jsonDataString = localStorage.getItem('reportJson');

    if (jsonDataString) {
      setJsonForReportEditing({
        executive_summary: JSON.parse(jsonDataString),
      });
    }
  }, []);
  return (
    <div className='mt-2'>
      {jsonForReportEditing.executive_summary?.map((summary) => {
        return (
          <>
            {isEditable[summary.id] ? (
              <>
                <ReactQuill
                  theme='snow'
                  value={mainHeading}
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                />
                <button
                  className='btn savebtn'
                  onClick={() => handleSaveClick(summary.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <p
                className='excutive-summary-heading'
                key={summary.id}
                onClick={() => handleEditClick(summary.id)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(summary.mainheading),
                }}
              ></p>
            )}
            {isEditable[summary.id] && summary.contents ? (
              <>
                <ReactQuill
                  theme='snow'
                  value={summaryContents}
                  onChange={handleChangeSummaryContents}
                  modules={modules}
                  formats={formats}
                />
                <button
                  className='btn savebtn'
                  onClick={() => handleSaveSummaryContents(summary.id)}
                >
                  Save
                </button>
              </>
            ) : (
              <p
                className=''
                onClick={() => handleEditSummaryContents(summary.id)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(summary?.contents),
                }}
              ></p>
            )}
            {summary.subcontents?.map((subcontent) => (
              <div className='executive-sumary-subcontent' key={subcontent.id}>
                <p>
                  <strong>{subcontent.heading}</strong>
                </p>
                {<p>{subcontent?.contents}</p>}
                {subcontent.subcontents?.map((subcontent) => (
                  <div className='ms-2' key={subcontent.id}>
                    <p>
                      <strong>{subcontent.subheading}</strong>
                    </p>
                    {<p>{subcontent?.contents}</p>}
                    {subcontent.subcontents?.map((subcontent) => (
                      <div className='ms-2' key={subcontent.id}>
                        <p>
                          <strong>{subcontent.subheading}</strong>
                        </p>
                        {<p>{subcontent?.contents}</p>}
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

export default Report;
// "Improve above code in context of display logic at
