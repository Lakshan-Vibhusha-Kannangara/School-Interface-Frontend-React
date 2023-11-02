import React, { useState, useEffect } from 'react';
import FormTable from '../FormTable/FormTable';
import axios from 'axios';
import Notification from '../Notification/Notification';
import TopNavbar from '../TopNavBar/TopNavBar';
import { api_url } from '../env';

interface Teacher {
  teacherID: number;
  firstName: string;
  lastName: string;
}

interface Subject {
  subjectID: number;
  subjectName: string;
}

const SubjectTeacher: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<any | null>(null); 
  const [allocated, setAllocated] = useState<any[]>([]);
  const [notification, setNotification] = useState<{ state: string, text: string } | null>(null);

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
    fetchAllocations();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get<Subject[]>(`${api_url}/api/subject/GetSubjects`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects', error);
    }
  }

  const fetchTeachers = async () => {
    try {
      const response = await axios.get<Teacher[]>('https://localhost:5001/api/teacher/GetTeachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers', error);
    }
  }

  const fetchAllocations = () => {

  }

  const onSubjectSelect = (subject: any) => {
    console.log(subject)
    setSelectedSubject(subject);
  };
  const onDeallocation = (subjectId: number, teacherId: number) => {
    console.log(subjectId)
    console.log(teacherId)
    try {
      axios.delete(`${api_url}/SubjectTeacher/DeleteBySubjectAndTeacher/${teacherId}/${subjectId}`);
      const updatedAllocated = allocated.filter(
        (allocation) =>
          allocation.subjectId !== subjectId && allocation.teacherId !== teacherId
      );
      setAllocated(updatedAllocated);
      setNotification({ state: 'success', text: 'Deallocation successful' });
    } catch (error) {
      console.error('Error during deallocation', error);
      setNotification({ state: 'error', text: 'Error during deallocation' });
    }
  }


  const onTeacherSelect = (teacher: any) => {
    console.log(teacher)
    setSelectedTeacher(teacher);
    
  };

  const onSubmit = async () => {
    if (selectedSubject && selectedTeacher) {
      const allocation = {
        subjectID: selectedSubject,
        teacherID: selectedTeacher,
      };
      try {
        const response = await axios.post(`${api_url}/api/SubjectTeacher/AddSubjectTeacher`, allocation);
        console.log(response.data)
        setAllocated([...allocated, response.data]);
        setNotification({ state: 'success', text: 'Allocation created successfully' });
      } catch (error) {
        console.error('Error creating allocation', error);
        setNotification({ state: 'error', text: 'Error creating allocation' });
      }
    }
  }
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(notificationTimeout); 
  }, [notification]); 

  return (
    <div>
       <TopNavbar />
  {notification && <Notification state={notification.state} text={notification.text} />}

      <FormTable
      tag1='teacherId'
      tag2='subjectId'
      tag3='teacherName'
           options1Name='Select Teacher'
           options2Name='Select Subject'
        btntxt='Add Teacher'
        img='/images/subjectallocation.svg'
        name="Subject Teacher Form"
        text1="Allocated Teacher"
        text2="Allocated Subject"
        options1={teachers.map((teacher) => ({
          value: teacher.teacherID,
          label: teacher.firstName + ' ' + teacher.lastName,
        }))}
        options2={subjects.map((subject) => ({
          value: subject.subjectID,
          label: subject.subjectName,
        }))}
        data={allocated}
        onSelection1={onTeacherSelect}
        onSelection2={onSubjectSelect}
        onSubmit={onSubmit}
        onDeAllocation={onDeallocation}
      />
    </div>
  );
}

export default SubjectTeacher;
