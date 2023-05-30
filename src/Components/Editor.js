import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Editor = ({ text, headings, images, onSave }) => {
  const [reportContent, setReportContent] = useState(
    'Paragraph 1 of the report\n\nParagraph 2 of the report\n\nParagraph 3 of the report'
  );
  const [editorContent, setEditorContent] = useState('');

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleReportClick = () => {
    setEditorContent(reportContent);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const contentToSave = editorContent || reportContent; // Use editorContent if it exists, otherwise use reportContent
    setReportContent(contentToSave);
    onSave(contentToSave); // Call the onSave function with the content to save
    setEditorContent(''); // Clear the editor after saving
  };

  return (
    <div>
      <h2>Research Report</h2>
      <ReactQuill
        value={reportContent}
        onClick={handleReportClick}
        style={{ backgroundColor: '#eee', cursor: 'pointer' }}
      />
      <h2>Editor</h2>
      <ReactQuill value={editorContent} onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default Editor;
