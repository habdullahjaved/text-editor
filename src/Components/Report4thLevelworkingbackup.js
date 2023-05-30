import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify, { clearConfig } from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
const Report4thLevelworkingbackup = () => {
  const [jsonForReportEditing, setJsonForReportEditing] = useState({
    executive_summary: [],
  });

  console.log(jsonForReportEditing);

  const [isEditable, setIsEditable] = useState(false);
  const [mainHeading, setMainHeading] = useState('');
  const [summaryContents, setSummaryContents] = useState('');
  const [editedItemId, setEditedItemId] = useState(null);
  //
  console.log(isEditable);
  // level 2
  const [isEditableSubcontents, setIsEditableSubContents] = useState([]);
  console.log(isEditableSubcontents);
  const [subcontentHeading, setSubcontentHeading] = useState('');
  const [subcontentContents, setSubcontentContents] = useState('');
  const [subcontentId, setSubcontentId] = useState(null);
  // level 3

  const [isEditableSubcontentsL3, setIsEditableSubContentsL3] = useState([]);
  console.log(isEditableSubcontentsL3);
  const [subcontentSubheadingL3, setSubcontentSubheadingL3] = useState('');
  const [subcontentContentsL3, setSubcontentContentsL3] = useState('');
  const [subcontentL3Id, setSubcontentL3Id] = useState(null);
  // level 4
  const [isEditableSubcontentsL4, setIsEditableSubContentsL4] = useState([]);
  const [subcontentSubheadingL4, setSubcontentSubheadingL4] = useState('');
  const [subcontentContentsL4, setSubcontentContentsL4] = useState('');
  const [subSubcontentL4Id, setSubSubcontentL4Id] = useState(null);
  // level 1
  const handleEditClick = (id, dataField, value) => {
    setIsEditable(true);
    setEditedItemId(id);
    const item = jsonForReportEditing.executive_summary.find(
      (dataItem) => dataItem.id === id
    );

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
    const updatedData = jsonForReportEditing.executive_summary?.map(
      (dataItem) =>
        dataItem.id === id
          ? {
              ...dataItem,
              mainheading: mainHeading ? mainHeading : dataItem.mainheading,
              contents: summaryContents ? summaryContents : dataItem.contents,
            }
          : dataItem
    );
    setJsonForReportEditing((prevState) => ({
      ...prevState,
      executive_summary: updatedData,
    }));
    setEditedItemId(null);
    localStorage.setItem('test', mainHeading);
    localStorage.setItem('reportJson', JSON.stringify(updatedData));
    setIsEditable(false);
  };
  // Level 2
  const handleEditSubcontent = (id, dataField, value) => {
    console.log(id, dataField, value);
    setIsEditableSubContents((prev) => {
      const newState = prev?.map((editable) => {
        return Object.keys(editable)?.reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {});
      });
      newState?.forEach((editable) => {
        if (editable[id] !== undefined) {
          editable[id] = true;
        }
      });
      return newState;
    });
    setSubcontentId(id);
    const summary = jsonForReportEditing.executive_summary?.flatMap(
      (summary) => summary.subcontents
    );
    const item = summary?.find((dataItem) => dataItem.id === id);
    if (item.id === id && dataField === 'heading') {
      setSubcontentHeading(value);
      setSubcontentContents('');
    }
    if (item.id === id && dataField === 'contents') {
      setSubcontentContents(value);
      setSubcontentHeading('');
    }
  };
  const handleSubcontentHeadingChange = (value) => {
    setSubcontentHeading(value);
  };
  const handleSubcontentContentChange = (value) => {
    setSubcontentContents(value);
  };

  const handleSaveSubcontent = (id) => {
    const newSummary = jsonForReportEditing.executive_summary?.map(
      (summary) => {
        const newSubcontents = summary.subcontents?.map((subcontent) => {
          if (subcontent.id === subcontentId) {
            return {
              ...subcontent,
              heading: subcontentHeading
                ? subcontentHeading
                : subcontent.heading,
              contents: subcontentContents
                ? subcontentContents
                : subcontent.contents,
            };
          } else {
            return subcontent;
          }
        });

        return {
          ...summary,
          subcontents: newSubcontents,
        };
      }
    );
    localStorage.setItem('reportJson', JSON.stringify(newSummary));
    setJsonForReportEditing({
      ...jsonForReportEditing,
      executive_summary: newSummary,
    });
    setIsEditableSubContents((prev) => {
      const newState = prev?.map((editable) => {
        return Object.keys(editable).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {});
      });
      newState?.forEach((editable) => {
        if (editable[id] !== undefined) {
          editable[id] = false;
        }
      });
      return newState;
    });
  };
  // Level 3
  const handleSubcontentL3Edit = (parentId, id, dataField, value) => {
    console.log(parentId, id, dataField, value);
    setIsEditableSubContentsL3((prevState) => {
      const newState = [...prevState];
      newState?.forEach((parent) => {
        parent.subcontents?.forEach((subcontentL3) => {
          subcontentL3.isEditable = false;
        });
      });
      const parentIndex = newState.findIndex((s) => s.id === parentId);
      if (parentIndex !== -1 && newState[parentIndex].subcontents) {
        const subcontentIndex = newState[parentIndex].subcontents.findIndex(
          (s) => s.id === id
        );
        if (subcontentIndex !== -1) {
          newState[parentIndex].subcontents[subcontentIndex].isEditable = true;
        }
      }
      return newState;
    });
    setSubcontentL3Id(id);
    const summary = jsonForReportEditing.executive_summary?.flatMap(
      (summary) => summary.subcontents
    );
    const item = summary?.find((dataItem) => dataItem.id === parentId);
    const subItem = item.subcontents?.find((dataItem) => dataItem.id === id);
    if (
      item.id === parentId &&
      subItem.id === id &&
      dataField === 'subheading'
    ) {
      setSubcontentSubheadingL3(value);
      setSubcontentContentsL3('');
    }
    if (item.id === parentId && subItem.id === id && dataField === 'contents') {
      setSubcontentContentsL3(value);
      setSubcontentSubheadingL3('');
    }
  };

  const handleSubheadingChangeL3 = (value) => {
    setSubcontentSubheadingL3(value);
  };

  const handleSubcontentChangeL3 = (value) => {
    setSubcontentContentsL3(value);
  };
  const handleSaveSubcontentL3 = (parentId, id) => {
    const newSummary = jsonForReportEditing.executive_summary?.map(
      (summary) => {
        const newSubcontents = summary.subcontents?.map((subcontent) => {
          if (subcontent.id === parentId) {
            const newSubcontentsL3 = subcontent.subcontents?.map(
              (subcontentL3) => {
                if (subcontentL3.id === id) {
                  return {
                    ...subcontentL3,
                    subheading: subcontentSubheadingL3
                      ? subcontentSubheadingL3
                      : subcontentL3.subheading,
                    contents: subcontentContentsL3
                      ? subcontentContentsL3
                      : subcontentL3.contents,
                  };
                } else {
                  return subcontentL3;
                }
              }
            );

            return {
              ...subcontent,
              subcontents: newSubcontentsL3,
            };
          } else {
            return subcontent;
          }
        });

        return {
          ...summary,
          subcontents: newSubcontents,
        };
      }
    );

    localStorage.setItem('reportJson', JSON.stringify(newSummary));
    setJsonForReportEditing({
      ...jsonForReportEditing,
      executive_summary: newSummary,
    });

    setIsEditableSubContentsL3((prevState) => {
      const newState = [...prevState];
      newState?.forEach((parent) => {
        parent.subcontents?.forEach((subcontentL3) => {
          subcontentL3.isEditable = false;
        });
      });
      const parentIndex = newState.findIndex((s) => s.id === parentId);
      const subcontentIndex = newState[parentIndex].subcontents.findIndex(
        (s) => s.id === id
      );
      newState[parentIndex].subcontents[subcontentIndex].isEditable = false;
      return newState;
    });
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
  const handleSubcontentL4Edit = (parentId, childId, id, dataField, value) => {
    console.log(parentId, childId, id, dataField, value);
    setIsEditableSubContentsL4((prevState) => {
      const newState = [...prevState];

      const findSubcontentL4 = (subcontents, parentId, childId, id) => {
        for (let i = 0; i < subcontents.length; i++) {
          const subcontentL3 = subcontents[i];
          if (subcontentL3.id === parentId) {
            for (let j = 0; j < subcontentL3.subcontents.length; j++) {
              const subcontentL4 = subcontentL3.subcontents[j];
              if (subcontentL4.id === childId) {
                for (let k = 0; k < subcontentL4.subcontents.length; k++) {
                  const subcontentL4Nested = subcontentL4.subcontents[k];
                  if (subcontentL4Nested.id === id) {
                    return subcontentL4Nested;
                  }
                }
                // If the subcontentL4 is not found, but childId matches, create a new subcontentL4
                const newSubcontentL4 = { id, isEditable: true };
                subcontentL4.subcontents.push(newSubcontentL4);
                return newSubcontentL4;
              }
            }
          }
          if (subcontentL3.subcontents) {
            const foundSubcontentL4 = findSubcontentL4(
              subcontentL3.subcontents,
              parentId,
              childId,
              id
            );
            if (foundSubcontentL4) {
              return foundSubcontentL4;
            }
          }
        }
        return null;
      };

      newState.forEach((parent) => {
        parent.subcontents?.forEach((child) => {
          child.subcontents?.forEach((subcontentL3) => {
            subcontentL3.subcontents?.forEach((subcontentL4) => {
              subcontentL4.isEditable = false;
            });
          });
        });
      });

      const subcontentL4 = findSubcontentL4(newState, parentId, childId, id);
      if (subcontentL4) {
        subcontentL4.isEditable = true;
      }

      return newState;
    });

    const summary = jsonForReportEditing.executive_summary?.flatMap(
      (summary) => summary.subcontents
    );
    const item = summary?.find((dataItem) => dataItem.id === parentId);
    const subItem = item.subcontents?.find(
      (dataItem) => dataItem.id === childId
    );
    const subcontentItem = subItem.subcontents?.find(
      (dataItem) => dataItem.id === id
    );

    if (
      item.id === parentId &&
      subItem.id === childId &&
      subcontentItem.id === id &&
      dataField === 'subheadingL4'
    ) {
      setSubcontentSubheadingL4(value);
      setSubcontentContentsL4('');
    }
    if (
      item.id === parentId &&
      subItem.id === childId &&
      subcontentItem.id === id &&
      dataField === 'subcontentsL4'
    ) {
      setSubcontentContentsL4(value);
      setSubcontentSubheadingL4('');
    }
  };

  const handleSubheadingChangeL4 = (value) => {
    setSubcontentSubheadingL4(value);
  };
  const handleSubcontetChangeL4 = (value) => {
    setSubcontentContentsL4(value);
  };

  const handleSaveSubcontentL4 = (parentId, childId, id) => {
    const newSummary = jsonForReportEditing.executive_summary?.map(
      (summary) => {
        const newSubcontents = summary.subcontents?.map((subcontent) => {
          if (subcontent.id === parentId) {
            const newSubcontentsL3 = subcontent.subcontents?.map(
              (subcontentL3) => {
                if (subcontentL3.id === childId) {
                  const newSubcontentsL4 = subcontentL3.subcontents?.map(
                    (subcontentL4) => {
                      if (subcontentL4.id === id) {
                        return {
                          ...subcontentL4,
                          subheading: subcontentSubheadingL4
                            ? subcontentSubheadingL4
                            : subcontentL4.subheading,
                          contents: subcontentContentsL4
                            ? subcontentContentsL4
                            : subcontentL4.contents,
                        };
                      } else {
                        return subcontentL4;
                      }
                    }
                  );

                  return {
                    ...subcontentL3,
                    subcontents: newSubcontentsL4,
                  };
                } else {
                  return subcontentL3;
                }
              }
            );

            return {
              ...subcontent,
              subcontents: newSubcontentsL3,
            };
          } else {
            return subcontent;
          }
        });

        return {
          ...summary,
          subcontents: newSubcontents,
        };
      }
    );

    localStorage.setItem('reportJson', JSON.stringify(newSummary));
    setJsonForReportEditing({
      ...jsonForReportEditing,
      executive_summary: newSummary,
    });

    setIsEditableSubContentsL4((prevState) => {
      const newState = [...prevState];
      newState?.forEach((parent) => {
        parent.subcontents?.forEach((subcontentL3) => {
          subcontentL3.subcontents?.forEach((subcontentL4) => {
            subcontentL4.isEditable = false;
          });
        });
      });
      const parentIndex = newState.findIndex((s) => s.id === parentId);
      const childIndex = newState[parentIndex].subcontents.findIndex(
        (s) => s.id === childId
      );
      const subcontentIndex = newState[parentIndex].subcontents[
        childIndex
      ].subcontents.findIndex((s) => s.id === id);
      newState[parentIndex].subcontents[childIndex].subcontents[
        subcontentIndex
      ].isEditable = false;
      return newState;
    });
  };

  const getReportJson = async () => {
    try {
      const response = await axios.post(
        'http://misr.pacemis.com:78/final_report'
      );
      const jsonData = response.data;
      const newJson = jsonData[0];
      setJsonForReportEditing(newJson);
      console.log(newJson);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getReportJson();

    if (getReportJson && jsonForReportEditing) {
    }
  }, []);

  useEffect(() => {
    if (jsonForReportEditing && jsonForReportEditing.executive_summary) {
      const updatedIsEditableSubContents =
        jsonForReportEditing.executive_summary.map((summary) =>
          summary.subcontents?.reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
          }, {})
        );
      setIsEditableSubContents(updatedIsEditableSubContents);
    }

    if (jsonForReportEditing && jsonForReportEditing.executive_summary) {
      setIsEditableSubContentsL3(() => {
        const subcontentsL3 = [];
        jsonForReportEditing.executive_summary?.forEach((summary) => {
          summary.subcontents?.forEach((subcontent) => {
            subcontent.subcontents?.forEach((subcontentL3) => {
              const parentId = subcontent.id;
              const id = subcontentL3.id;
              const newSubcontentL3 = { id, isEditable: false };
              const parent = subcontentsL3.find((s) => s.id === parentId);
              if (parent) {
                if (!parent.subcontents) {
                  parent.subcontents = [newSubcontentL3];
                } else {
                  parent.subcontents.push(newSubcontentL3);
                }
              } else {
                subcontentsL3.push({
                  id: parentId,
                  subcontents: [newSubcontentL3],
                });
              }
            });
          });
        });
        return subcontentsL3;
      });
    }

    if (jsonForReportEditing && jsonForReportEditing.executive_summary) {
      setIsEditableSubContentsL4(() => {
        const subcontentsL4 = [];
        jsonForReportEditing.executive_summary?.forEach((summary) => {
          summary.subcontents?.forEach((subcontent) => {
            const parentId = subcontent.id;
            const parent = subcontentsL4.find((s) => s.id === parentId);

            subcontent.subcontents?.forEach((subcontentL3) => {
              const childId = subcontentL3.id;
              const child = parent?.subcontents?.find((s) => s.id === childId);

              subcontentL3.subcontents?.forEach((subcontentL4) => {
                const id = subcontentL4.id;
                const newSubcontentL4 = { id, isEditable: false };

                if (child) {
                  if (!child.subcontents) {
                    child.subcontents = [newSubcontentL4];
                  } else {
                    child.subcontents.push(newSubcontentL4);
                  }
                } else {
                  const newSubcontentL3 = {
                    id: childId,
                    subcontents: [newSubcontentL4],
                  };
                  if (parent) {
                    parent.subcontents.push(newSubcontentL3);
                  } else {
                    subcontentsL4.push({
                      id: parentId,
                      subcontents: [newSubcontentL3],
                    });
                  }
                }
              });
            });
          });
        });

        return subcontentsL4;
      });
    }
  }, [jsonForReportEditing]);

  return (
    <div className='mt-2'>
      {jsonForReportEditing.executive_summary &&
        jsonForReportEditing.executive_summary?.map((summary) => {
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
                <div
                  className='executive-sumary-subcontent'
                  key={subcontent.id}
                >
                  {isEditableSubcontents
                    ?.map((editable) => editable[subcontent.id])
                    ?.some((editable) => editable) &&
                  subcontentHeading !== '' ? (
                    <>
                      <ReactQuill
                        theme='snow'
                        value={subcontentHeading}
                        onChange={handleSubcontentHeadingChange}
                        modules={modules}
                        formats={formats}
                      />
                      <button
                        className='btn btn-success savebtn'
                        onClick={() => handleSaveSubcontent(subcontent.id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <p
                      key={subcontent.id}
                      className='subcontent-heading-level-1'
                      onClick={() =>
                        handleEditSubcontent(
                          subcontent.id,
                          'heading',
                          subcontent.heading
                        )
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(subcontent?.heading),
                      }}
                    ></p>
                  )}

                  {isEditableSubcontents
                    ?.map((editable) => editable[subcontent.id])
                    ?.some((editable) => editable) &&
                  subcontentContents !== '' ? (
                    <>
                      <ReactQuill
                        theme='snow'
                        value={subcontentContents}
                        onChange={handleSubcontentContentChange}
                        modules={modules}
                        formats={formats}
                      />
                      <button
                        className='btn btn-success savebtn'
                        onClick={() => handleSaveSubcontent(subcontent.id)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <p
                      onClick={() =>
                        handleEditSubcontent(
                          subcontent.id,
                          'contents',
                          subcontent?.contents
                        )
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(subcontent?.contents),
                      }}
                    ></p>
                  )}
                  {subcontent.subcontents?.map((subcontentL3) => (
                    <div className='ms-3' key={subcontentL3.id}>
                      {isEditableSubcontentsL3
                        ?.find((s) => s.id === subcontent.id)
                        ?.subcontents?.find((s) => s.id === subcontentL3.id)
                        ?.isEditable && subcontentSubheadingL3 !== '' ? (
                        <>
                          <ReactQuill
                            theme='snow'
                            value={subcontentSubheadingL3}
                            onChange={handleSubheadingChangeL3}
                            modules={modules}
                            formats={formats}
                          />
                          <button
                            className='btn btn-success savebtn'
                            onClick={() =>
                              handleSaveSubcontentL3(
                                subcontent.id,
                                subcontentL3.id
                              )
                            }
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <p
                          className='subcontent-heading-level-2'
                          onClick={() =>
                            handleSubcontentL3Edit(
                              subcontent.id,
                              subcontentL3.id,
                              'subheading',
                              subcontentL3?.subheading
                            )
                          }
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              subcontentL3?.subheading
                            ),
                          }}
                        ></p>
                      )}

                      {isEditableSubcontentsL3
                        ?.find((s) => s.id === subcontent.id)
                        ?.subcontents?.find((s) => s.id === subcontentL3.id)
                        ?.isEditable && subcontentContentsL3 !== '' ? (
                        <>
                          <ReactQuill
                            theme='snow'
                            value={subcontentContentsL3}
                            onChange={handleSubcontentChangeL3}
                            modules={modules}
                            formats={formats}
                          />
                          <button
                            className='btn btn-success savebtn'
                            onClick={() =>
                              handleSaveSubcontentL3(
                                subcontent.id,
                                subcontentL3.id
                              )
                            }
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <p
                          onClick={() =>
                            handleSubcontentL3Edit(
                              subcontent.id,
                              subcontentL3.id,
                              'contents',
                              subcontentL3?.contents
                            )
                          }
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(subcontentL3?.contents),
                          }}
                        ></p>
                      )}

                      {subcontentL3.subcontents?.map((subcontentL4) => (
                        <div className='ms-3' key={subcontentL4.id}>
                          {isEditableSubcontentsL4
                            .find((s) => s.id === subcontent.id)
                            ?.subcontents?.find((s) => s.id === subcontentL3.id)
                            ?.subcontents?.find((s) => s.id === subcontentL4.id)
                            ?.isEditable && subcontentSubheadingL4 !== '' ? (
                            <>
                              <ReactQuill
                                theme='snow'
                                value={subcontentSubheadingL4}
                                onChange={handleSubheadingChangeL4}
                                modules={modules}
                                formats={formats}
                              />
                              <button
                                className='btn btn-success savebtn'
                                onClick={() =>
                                  handleSaveSubcontentL4(
                                    subcontent.id,
                                    subcontentL3.id,
                                    subcontentL4.id
                                  )
                                }
                              >
                                Save
                              </button>
                            </>
                          ) : (
                            <p
                              className='subcontent-heading-level-2'
                              onClick={() =>
                                handleSubcontentL4Edit(
                                  subcontent.id,
                                  subcontentL3.id,
                                  subcontentL4.id,
                                  'subheadingL4',
                                  subcontentL4?.subheading
                                )
                              }
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  subcontentL4?.subheading
                                ),
                              }}
                            ></p>
                          )}

                          {isEditableSubcontentsL4
                            .find((s) => s.id === subcontent.id)
                            ?.subcontents?.find((s) => s.id === subcontentL3.id)
                            ?.subcontents?.find((s) => s.id === subcontentL4.id)
                            ?.isEditable && subcontentContentsL4 !== '' ? (
                            <>
                              <ReactQuill
                                theme='snow'
                                value={subcontentContentsL4}
                                onChange={handleSubcontetChangeL4}
                                modules={modules}
                                formats={formats}
                              />
                              <button
                                className='btn btn-success savebtn'
                                onClick={() =>
                                  handleSaveSubcontentL4(
                                    subcontent.id,
                                    subcontentL3.id,
                                    subcontentL4.id
                                  )
                                }
                              >
                                Save
                              </button>
                            </>
                          ) : (
                            <p
                              onClick={() =>
                                handleSubcontentL4Edit(
                                  subcontent.id,
                                  subcontentL3.id,
                                  subcontentL4.id,
                                  'subcontentsL4',
                                  subcontentL4?.contents
                                )
                              }
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  subcontentL4?.contents
                                ),
                              }}
                            ></p>
                          )}
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
export default Report4thLevelworkingbackup;
