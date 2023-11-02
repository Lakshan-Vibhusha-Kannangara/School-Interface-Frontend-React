import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login/Login.tsx';
import SignUp from './components/SignUp/SignUp.tsx';
import StudentRegister from './components/StudentRegister/StudentRegister.tsx';
import SubjectTeacher from './components/SubjectTeacher/SubjectTeacher.tsx';
import TeacherClassroom from './components/TeacherClassroom/TeacherClassroom.tsx';
import TopNavbar from './components/TopNavBar/TopNavBar.tsx';
import Classroom from './components/Classroom/Classroom';
import Teacher from './components/Teacher/Teacher';
import StudentReport from './components/Report/Report';
import Subject from './components/Subject/Subject'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/subjects" element={<Subject />} />
          <Route path="/subject-teacher" element={<SubjectTeacher />} />
          <Route path="/teacher-classroom" element={<TeacherClassroom />} />
          <Route path="/teacher-register" element={<Teacher />} />
          <Route path="/student-report" element={<StudentReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
