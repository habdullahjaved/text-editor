import React, { useState } from 'react';

const TextEditComponent = () => {
  const [text, setText] = useState([]);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setEdit(true);
  };
  return (
    <div className='textedit'>
      <textarea
        className={edit === true ? 'editclass' : 'editarea'}
        name='text-1'
        id=''
        cols='30'
        rows='10'
        onDoubleClick={handleEdit}
      ></textarea>
    </div>
  );
};

export default TextEditComponent;
