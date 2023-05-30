import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Test from './Test';
import Test2 from './Test2';

const ParentComponent = () => {
  const [jsonForReportEditing, setJsonForReportEditing] = useState({
    executive_summary: [],
    background: [],
  });
  // how to make it optional if feature and resut not exist work fine in api and also in jsx
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
  // useEffect(() => {
  //   getReportJson();
  // }, []);
  useEffect(() => {
    const jsonDataString = localStorage.getItem('reportJson');

    if (jsonDataString) {
      setJsonForReportEditing((prevState) => ({
        ...prevState,
        executive_summary: JSON.parse(jsonDataString),
      }));
    } else {
      getReportJson();
    }
  }, []);
  useEffect(() => {
    const jsonDataString = localStorage.getItem('background');

    if (jsonDataString) {
      setJsonForReportEditing((prevState) => ({
        ...prevState,
        background: JSON.parse(jsonDataString),
      }));
    } else {
      getReportJson();
    }
  }, []);
  return (
    <div>
      {/* <Test /> */}
      <Test
        jsonForReportEditing={jsonForReportEditing}
        setJsonForReportEditing={setJsonForReportEditing}
      />
      <Test2
        jsonForReportEditing={jsonForReportEditing}
        setJsonForReportEditing={setJsonForReportEditing}
      />
    </div>
  );
};

export default ParentComponent;
