import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditableContent from './Components/EditableContent';
import EditableContentJson from './Components/EditableContentJson';
import EditableReport from './Components/EditableReport';
import Navbar from './Components/Navbar';
import StudyEditor from './Components/StudyEditor';
import PropsPage from './Components/PropsPage';
import Report from './Components/Report';
import Report2 from './Components/Report2';
import ParentComponent from './Components/ParentComponent';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<EditableContent />} />
          <Route path='/multiple' element={<EditableContentJson />} />
          <Route path='/report' element={<StudyEditor />} />
          {/* <Route path='/props' element={<PropsPage />} /> */}
          <Route path='/props' element={<Report />} />
          <Route path='/report2' element={<ParentComponent />} />
        </Routes>
      </Router>
    </div>
    // <div className='container-fluid'>
    //   {/* <EditableContent /> */}
    //   {/* <EditableContentJson /> */}
    //   <EditableReport />
    // </div>
  );
}
export default App;
