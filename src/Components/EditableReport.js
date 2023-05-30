import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';

const EditableReport = () => {
  const [reportJson, setReportJson] = useState({
    author: 'Alistair Story, Robert W Aldridge, Catherine M Smith et al',
    tittle:
      'Smartphone-enabled video-observed versus directly observed treatment for tuberculosis: a multicentre, analyst-blinded, randomised, controlled superiority trial',
    journal: 'Lancet',
    volume: '393',
    year: '2019',
    pages: '1216–24',
    study_design: [
      {
        id: 1,
        design: 'Randomised Controlled Trial',
        content:
          'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
      },
      {
        id: 2,
        design: 'Randomised Controlled Trial',
        content:
          'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
      },
      {
        id: 3,
        design: 'Randomised Controlled Trial',
        content:
          'Multicentre, analyst-blinded, randomised controlled superiority trial in 22 clinics',
      },
    ],

    objectives: [
      {
        id: 1,
        Objective: 'Improvement with VOT',
        content:
          'To evaluate whether levels of treatment observation were improved with Video-observed therapy (VOT)',
      },
      {
        id: 2,
        Objective: 'Improvement with VOT',
        content:
          'To evaluate whether levels of treatment observation were improved with Video-observed therapy (VOT)',
      },
      {
        id: 3,
        Objective: 'Improvement with VOT',
        content:
          'To evaluate whether levels of treatment observation were improved with Video-observed therapy (VOT)',
      },
    ],
    methodologies: [
      {
        id: 1,
        methodology: 'Improvement with VOT',
        content:
          'multicentre, analyst-blinded, randomised controlled, superiority trial in 22 clinics in England.',
      },
      {
        id: 2,
        methodology: 'Patients were Referred',
        content:
          'Eligible patients were identified by case managers at each participating clinic and referred to the study team.',
      },
      {
        id: 3,
        methodology: 'Randomly Assigned Participants',
        content:
          'Researcher randomly assigned participants to either asynchronous VOT or DOT based in a clinic, community (eg, pharmacy or hostel), or home setting.',
      },
      {
        id: 4,
        methodology: 'Trial Reporting',
        content:
          'Randomisation was provided by Sealed Envelope), a telephone and online software application used for randomly assigning patients in clinical trials. The system used randomisation by minimisation to ensure balance across study sites and the stage of treatment at the time of enrolment (ie, within the first 2 months of treatment and after the first 2 months of treatment).',
      },
      {
        id: 5,
        methodology: 'Balancing in Sampling',
        content:
          'Minimisation allocates patients to best maintain balance in the stratification factors by calculating an imbalance score at each randomisation. It then assigns with higher probability each patient to the treatment that will reduce the imbalance.',
      },
      {
        id: 6,
        methodology: 'Capacity Building',
        content:
          'Patients were trained to record and send videos of every dose ingested 7 days per week using a smartphone app developed by researchers at the University of California (San Diego, CA, USA).14 Trained treatment observers viewed the videos through a password-protected website.',
      },
      {
        id: 7,
        methodology: 'Data Reporting',
        content:
          'Patients were also encouraged to report adverse drug events on the videos. Smartphones and data plans were provided free of charge, paid by the study at commercial rates.',
      },
      {
        id: 8,
        methodology: 'Randomisation and masking',
        content:
          'Patients signed a form agreeing to return the phone at the end of treatment (details on returning the phones in the appendix). DOT and VOT observation records were completed by observers until treatment or study end.',
      },
      {
        id: 9,
        methodology: 'Randomisation and masking',
        content:
          'Patients signed a form agreeing to return the phone at the end of treatment (details on returning the phones in the appendix). DOT and VOT observation records were completed by observers until treatment or study end.',
      },
    ],
    outcomes: [
      {
        id: 1,
        outcome: 'Outcome 1',
        content:
          'Researcher screened 548 patients with tuberculosis for eligibility. Of these, 322 (59%) were ineligible and 226 (41%) were randomly assigned to the study groups.',
      },
      {
        id: 2,
        outcome: 'Outcome 2',
        content:
          'Intention to treat (ITT) analyses included 112 to VOT and 114 patients assigned to DOT.',
      },
    ],
    results: [
      {
        id: 1,
        result: 'Result 1',
        content:
          'Researcher screened 548 patients with tuberculosis for eligibility. Of these, 322 (59%) were ineligible and 226 (41%) were randomly assigned to the study groups.',
      },
      {
        id: 2,
        result: 'Result 2',
        content:
          'Intention to treat (ITT) analyses included 112 to VOT and 114 patients assigned to DOT.',
      },
    ],
    conclusions: [
      {
        id: 1,
        conclusion: 'conclusion 1',
        content:
          'Researcher screened 548 patients with tuberculosis for eligibility. Of these, 322 (59%) were ineligible and 226 (41%) were randomly assigned to the study groups.',
      },
      {
        id: 2,
        conclusion: 'conclusion 2',
        content:
          'Intention to treat (ITT) analyses included 112 to VOT and 114 patients assigned to DOT.',
      },
    ],
    loe: [
      {
        id: 1,
        loe: 'loe',
        content:
          'Researcher screened 548 patients with tuberculosis for eligibility. Of these, 322 (59%) were ineligible and 226 (41%) were randomly assigned to the study groups.',
      },
    ],
  });
  const [author, setAuthor] = useState();
  const [journal, setJournal] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();
  const [volume, setVolume] = useState();
  const [pages, setPages] = useState();
  const [studyDesign, setStudyDesign] = useState(reportJson.study_design);
  const [objectives, setObjectives] = useState(reportJson.objectives);
  const [methodologies, setMethodologies] = useState(reportJson.methodologies);
  const [outcomes, setOutComes] = useState(reportJson.outcomes);
  const [results, setResults] = useState(reportJson.results);
  const [conclusions, setConclusions] = useState(reportJson.conclusions);
  const [loe, setLoe] = useState(reportJson.loe);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditableJournal, setIsEditableJournal] = useState(false);
  const [isEditableStudy, setIsEditableStudy] = useState(false);
  const [studyDesignId, setStudyDesignId] = useState(null);
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
  const handleEditClick = () => {
    setIsEditable(true);
    setContent(reportJson.author);
  };
  const handleEditorChange = (value) => {
    setContent(value);
  };
  const handleSaveClick = () => {
    setIsEditable(false);
    reportJson.author = content;
    localStorage.setItem('reportJson', JSON.stringify(reportJson));
    console.log(reportJson);
  };

  // journal
  const handleJournalEdit = () => {
    setIsEditableJournal(true);
    setContent(reportJson.journal);
  };
  const handleJournalChange = (value) => {
    setContent(value);
  };
  const handleSaveJournal = () => {
    setIsEditableJournal(false);
    reportJson.journal = content;
    localStorage.setItem('reportJson', JSON.stringify(reportJson));
    console.log(reportJson);
  };
  // study deign
  const handleStudyEdit = (id, design, content) => {
    setIsEditableStudy(true);
    setStudyDesignId(id);
    console.log(id);
    console.log(design);
    console.log(content);
    const item = studyDesign.find((dataItem) => dataItem.id === id);
    // item.design === design
    //   ? setContent(item.design)
    //   : item.content === content
    //   ? setContent(item.content)
    //   : '';
  };
  const handleStudyEditorChange = (value) => {
    setContent(value);
  };
  const handleSaveStudy = () => {
    // const updatedStudy = studyDesign.map((dataItem) =>
    //   dataItem.id === editedItemId ? { ...dataItem, design: content } : dataItem
    // );
    // setStudyDesign(updatedStudy);
    // setStudyDesignId(null);
    // localStorage.setItem('reportJson', JSON.stringify(updatedData));
    // setIsEditableStudy(false);
  };
  useEffect(() => {
    const reportJsonString = localStorage.getItem('reportJson');

    if (reportJsonString) {
      setReportJson(JSON.parse(reportJsonString));
    }
  }, []);
  return (
    <div className='container-fluid mt-1'>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          {<h3 className='bg-info text-left p-1'>Report</h3>}
          {isEditable ? (
            <ReactQuill
              theme='snow'
              value={content}
              onChange={handleEditorChange}
              modules={modules}
              formats={formats}
            />
          ) : (
            <div>
              <span>
                <strong>Author:</strong>
              </span>
              <span
                onClick={handleEditClick}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(reportJson.author),
                }}
              ></span>
              <p></p>
            </div>
          )}
          {isEditable && <button onClick={handleSaveClick}>Save</button>}
          {/* Editor for Journal  */}
          {isEditableJournal ? (
            <ReactQuill
              theme='snow'
              value={content}
              onChange={handleJournalChange}
              modules={modules}
              formats={formats}
            />
          ) : (
            <div>
              <span>
                <strong>Journal:</strong>
              </span>
              <span
                onClick={handleJournalEdit}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(reportJson.journal),
                }}
              ></span>
              <p></p>
            </div>
          )}
          {isEditableJournal && (
            <button onClick={handleSaveJournal}>Save</button>
          )}
          <p>Year: {reportJson.year}</p>
          {<p>Title: {reportJson.tittle}</p>}
          {<p>Volume: {reportJson.volume}</p>}
          {<p>Pages: {reportJson.pages}</p>}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Study Design</h1>
          {isEditableStudy ? (
            <ReactQuill
              theme='snow'
              value={content}
              onChange={handleStudyEditorChange}
              modules={modules}
              formats={formats}
            />
          ) : (
            studyDesign.map((study) => {
              return (
                <div key={study.id}>
                  <h3
                    onClick={() => handleStudyEdit(study.id, study.design)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(study.design),
                    }}
                  ></h3>
                  <p
                    onClick={() => handleStudyEdit(study.id, study.content)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(study.content),
                    }}
                  ></p>
                  {isEditableStudy && (
                    <button onClick={handleSaveStudy}>Save</button>
                  )}
                </div>
              );
            })
          )}
          {}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Objectives</h1>
          {objectives.map((objective) => {
            return (
              <div key={objective.id}>
                <h3>{objective.Objective}</h3>
                <p>{objective.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Methodologies</h1>
          {methodologies.map((methodology) => {
            return (
              <div key={methodology.id}>
                <h3>{methodology.methodology}</h3>
                <p>{methodology.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Outcomes</h1>
          {outcomes.map((outcome) => {
            return (
              <div key={outcome.id}>
                <h3>{outcome.outcome}</h3>
                <p>{outcome.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Results</h1>
          {results.map((result) => {
            return (
              <div key={result.id}>
                <h3>{result.result}</h3>
                <p>{result.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Conclusion</h1>
          {conclusions.map((conclusion) => {
            return (
              <div key={conclusion.id}>
                <h3>{conclusion.conclusion}</h3>
                <p>{conclusion.content}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-sm-12'>
          <h1 className='bg-info text-left'>Loe</h1>
          {loe.map((loe) => {
            return (
              <div key={loe.id}>
                <h3>{loe.loe}</h3>
                <p>{loe.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default EditableReport;
// Improve above code in a good manner not too much functions and states should be clean and simple
// how to handle all editor funcionality through single function
