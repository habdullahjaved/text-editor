import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import { logDOM } from '@testing-library/react';

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
            id: 2,
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
            id: 3,
            heading: 'Results and Discussions',
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
                  {
                    id: 2,
                    subheading: 'Sample Hemolysis',
                    contents:
                      'The evidence on sample hemolysis is inconclusive whereby one RCT reported a lower hemolysis rate of blood samples drawn from Vacutainer ',
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

  const [isEditable, setIsEditable] = useState(false);
  const [mainHeading, setMainHeading] = useState('');
  const [summaryContents, setSummaryContents] = useState('');
  const [editedItemId, setEditedItemId] = useState(null);
  //
  // level 2
  const [isEditableSubcontents, setIsEditableSubContents] = useState(
    jsonForReportEditing.executive_summary?.map((summary) =>
      summary.subcontents?.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {})
    )
  );
  // console.log(isEditableSubcontents);
  const [subcontentHeading, setSubcontentHeading] = useState('');
  const [subcontentContents, setSubcontentContents] = useState('');
  const [subcontentId, setSubcontentId] = useState(null);
  // level 3

  const [isEditableSubcontentsL3, setIsEditableSubContentsL3] = useState(() => {
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
  // console.log(isEditableSubcontentsL3);
  const [subcontentSubheadingL3, setSubcontentSubheadingL3] = useState('');
  const [subcontentContentsL3, setSubcontentContentsL3] = useState('');
  const [subcontentL3Id, setSubcontentL3Id] = useState(null);
  // level 4
  // const [isEditableSubcontentsL4, setIsEditableSubContentsL4] = useState(() => {
  //   const subcontentsL4 = [];
  //   jsonForReportEditing.executive_summary?.forEach((summary) => {
  //     summary.subcontents?.forEach((subcontent) => {
  //       const parentId = subcontent.id;
  //       const parent = subcontentsL4.find((s) => s.id === parentId);

  //       subcontent.subcontents?.forEach((subcontentL3) => {
  //         const childId = subcontentL3.id;
  //         const child = parent?.subcontents?.find((s) => s.id === childId);

  //         subcontentL3.subcontents?.forEach((subcontentL4) => {
  //           const id = subcontentL4.id;
  //           const newSubcontentL4 = { id, isEditable: false };

  //           if (child) {
  //             if (!child.subcontents) {
  //               child.subcontents = [newSubcontentL4];
  //             } else {
  //               child.subcontents.push(newSubcontentL4);
  //             }
  //           } else {
  //             const newSubcontentL3 = {
  //               id: childId,
  //               subcontents: [newSubcontentL4],
  //             };
  //             if (parent) {
  //               parent.subcontents.push(newSubcontentL3);
  //             } else {
  //               subcontentsL4.push({
  //                 id: parentId,
  //                 subcontents: [newSubcontentL3],
  //               });
  //             }
  //           }
  //         });
  //       });
  //     });
  //   });

  //   return subcontentsL4;
  // });

  const [isEditableSubcontentsL4, setIsEditableSubContentsL4] = useState(() => {
    const subcontentsL4 = [];
    const processSubcontentsL4 = (subcontents, parentIdL3, parentIdL2) => {
      subcontents?.forEach((subcontentL4) => {
        const { id } = subcontentL4;
        const newSubcontentL4 = { id, isEditable: false };

        const parentL3 = subcontentsL4.find((s) => s.id === parentIdL3);
        if (parentL3) {
          const parentL2 = parentL3.subcontents.find(
            (s) => s.id === parentIdL2
          );
          if (parentL2) {
            parentL2.subcontents.push(newSubcontentL4);
          } else {
            parentL3.subcontents.push({
              id: parentIdL2,
              subcontents: [newSubcontentL4],
            });
          }
        } else {
          subcontentsL4.push({
            id: parentIdL3,
            subcontents: [
              {
                id: parentIdL2,
                subcontents: [newSubcontentL4],
              },
            ],
          });
        }

        if (subcontentL4.subcontents && subcontentL4.subcontents.length > 0) {
          processSubcontentsL4(subcontentL4.subcontents, id, parentIdL2);
        }
      });
    };

    jsonForReportEditing.executive_summary?.forEach((summary) => {
      summary.subcontents?.forEach((subcontent) => {
        subcontent.subcontents?.forEach((subcontentL3) => {
          processSubcontentsL4(
            subcontentL3.subcontents,
            subcontentL3.id,
            subcontent.id
          );
        });
      });
    });

    return subcontentsL4;
  });

  console.log(isEditableSubcontentsL4);
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
    // setIsEditableSubContentsL4((prevState) => {
    //   const newState = prevState.map((parent) => {
    //     if (parent.id === parentId) {
    //       const updatedSubcontentsL3 = parent.subcontents.map(
    //         (subcontentL3) => {
    //           if (subcontentL3.id === childId) {
    //             const updatedSubcontentsL4 = subcontentL3.subcontents.map(
    //               (subcontentL4) => {
    //                 if (subcontentL4.id === id) {
    //                   return {
    //                     ...subcontentL4,
    //                     isEditable: true,
    //                   };
    //                 }
    //                 return subcontentL4;
    //               }
    //             );
    //             return {
    //               ...subcontentL3,
    //               subcontents: updatedSubcontentsL4,
    //             };
    //           }
    //           return subcontentL3;
    //         }
    //       );
    //       return {
    //         ...parent,
    //         subcontents: updatedSubcontentsL3,
    //       };
    //     }
    //     return parent;
    //   });

    //   return newState;
    // });
    setIsEditableSubContentsL4((prevSubcontentsL4) => {
      return prevSubcontentsL4.map((subcontentL4) => {
        return {
          ...subcontentL4,
          subcontents: subcontentL4.subcontents.map((subcontentL3) => {
            return {
              ...subcontentL3,
              subcontents: subcontentL3.subcontents.map((subcontentL2) => {
                if (
                  subcontentL4.id === childId &&
                  subcontentL3.id === parentId &&
                  subcontentL2.id === id
                ) {
                  return {
                    ...subcontentL2,
                    isEditable: true, // Add your condition here,
                  };
                } else {
                  return {
                    ...subcontentL2,
                    isEditable: false,
                  };
                }
              }),
            };
          }),
        };
      });
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
      setSubcontentContentsL4('');
      setSubcontentSubheadingL4(value);
    }
    if (
      item.id === parentId &&
      subItem.id === childId &&
      subcontentItem.id === id &&
      dataField === 'subcontentsL4'
    ) {
      setSubcontentSubheadingL4('');
      setSubcontentContentsL4(value);
    }
  };

  const handleSubheadingChangeL4 = (value) => {
    setSubcontentSubheadingL4(value);
  };
  const handleSubcontentChangeL4 = (value) => {
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
    setIsEditableSubContentsL4((prevSubcontentsL4) => {
      return prevSubcontentsL4.map((subcontentL4) => {
        return {
          ...subcontentL4,
          subcontents: subcontentL4.subcontents.map((subcontentL3) => {
            return {
              ...subcontentL3,
              subcontents: subcontentL3.subcontents.map((subcontentL2) => {
                if (
                  subcontentL4.id === childId &&
                  subcontentL3.id === parentId &&
                  subcontentL2.id === id
                ) {
                  return {
                    ...subcontentL2,
                    isEditable: false, // Add your condition here,
                  };
                } else {
                  return {
                    ...subcontentL2,
                    isEditable: false,
                  };
                }
              }),
            };
          }),
        };
      });
    });
  };

  useEffect(() => {
    const jsonDataString = localStorage.getItem('reportJson');

    if (jsonDataString) {
      setJsonForReportEditing((prevState) => ({
        ...prevState,
        executive_summary: JSON.parse(jsonDataString),
      }));
    }
  }, []);

  return (
    <div className='mt-2'>
      {jsonForReportEditing.executive_summary &&
        jsonForReportEditing.executive_summary?.map((summary) => {
          return (
            <>
              {isEditable && mainHeading !== '' ? (
                <div className='mb-1'>
                  <ReactQuill
                    theme='snow'
                    value={mainHeading}
                    onChange={handleMHeadingChange}
                    modules={modules}
                    formats={formats}
                  />
                  <button
                    className='btn btn-success savebtn my-1'
                    onClick={() => handleSaveClick(summary.id)}
                  >
                    Save
                  </button>
                </div>
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
                <div className='mb-1'>
                  <ReactQuill
                    theme='snow'
                    value={summaryContents}
                    onChange={handleContentsChange}
                    modules={modules}
                    formats={formats}
                  />
                  <button
                    className='btn btn-success savebtn my-1'
                    onClick={() => handleSaveClick(summary.id)}
                  >
                    Save
                  </button>
                </div>
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
                    <div className='mb-1'>
                      <ReactQuill
                        theme='snow'
                        value={subcontentHeading}
                        onChange={handleSubcontentHeadingChange}
                        modules={modules}
                        formats={formats}
                      />
                      <button
                        className='btn btn-success savebtn my-1'
                        onClick={() => handleSaveSubcontent(subcontent.id)}
                      >
                        Save
                      </button>
                    </div>
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
                    <div className='mb-1'>
                      <ReactQuill
                        theme='snow'
                        value={subcontentContents}
                        onChange={handleSubcontentContentChange}
                        modules={modules}
                        formats={formats}
                      />
                      <button
                        className='btn btn-success savebtn my-1'
                        onClick={() => handleSaveSubcontent(subcontent.id)}
                      >
                        Save
                      </button>
                    </div>
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
                        <div className='mb-1'>
                          <ReactQuill
                            theme='snow'
                            value={subcontentSubheadingL3}
                            onChange={handleSubheadingChangeL3}
                            modules={modules}
                            formats={formats}
                          />
                          <button
                            className='btn btn-success savebtn my-1'
                            onClick={() =>
                              handleSaveSubcontentL3(
                                subcontent.id,
                                subcontentL3.id
                              )
                            }
                          >
                            Save
                          </button>
                        </div>
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
                        <div className='mb-1'>
                          <ReactQuill
                            theme='snow'
                            value={subcontentContentsL3}
                            onChange={handleSubcontentChangeL3}
                            modules={modules}
                            formats={formats}
                          />
                          <button
                            className='btn btn-success savebtn my-1'
                            onClick={() =>
                              handleSaveSubcontentL3(
                                subcontent.id,
                                subcontentL3.id
                              )
                            }
                          >
                            Save
                          </button>
                        </div>
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
                            .find((s) => s.id === subcontentL3.id)
                            ?.subcontents?.find((s) => s.id === subcontent.id)
                            ?.subcontents?.find((s) => s.id === subcontentL4.id)
                            ?.isEditable && subcontentSubheadingL4 !== '' ? (
                            <div className='mb-1'>
                              <ReactQuill
                                theme='snow'
                                value={subcontentSubheadingL4}
                                onChange={(value) =>
                                  handleSubheadingChangeL4(value)
                                }
                                modules={modules}
                                formats={formats}
                              />
                              <button
                                className='btn btn-success savebtn my-1'
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
                            </div>
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
                            .find((s) => s.id === subcontentL3.id)
                            ?.subcontents?.find((s) => s.id === subcontent.id)
                            ?.subcontents?.find((s) => s.id === subcontentL4.id)
                            ?.isEditable && subcontentContentsL4 !== '' ? (
                            <div className='mb-1'>
                              <ReactQuill
                                theme='snow'
                                value={subcontentContentsL4}
                                onChange={(value) =>
                                  handleSubcontentChangeL4(value)
                                }
                                modules={modules}
                                formats={formats}
                              />
                              <button
                                className='btn btn-success savebtn my-1'
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
                            </div>
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
export default Report;
//
