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
interface Classroom {
  classroomID: number;
  classroomName: string;
}

const TeacherClassroom: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [allocated, setAllocated] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [notification, setNotification] = useState<{ state: string, text: string } | null>(null);

  useEffect(() => {
    fetchClasses();
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get<Teacher[]>(
        `${api_url}/Teacher/GetTeachers`
      );
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get<Classroom[]>(
        `${api_url}/api/Classroom/GetClassroom`
      );
      setClasses(response.data);
    } catch (error) {
      console.error('Error fetching classes', error);
    }
  };

  const onTeacherSelect = (teacher: Teacher) => {
    console.log("selected teacher",teacher)
    setSelectedTeacher(teacher);
  };

  const onClassroomSelect = (classroom: Classroom) => {
    console.log("selected class",classroom)
    setSelectedClassroom(classroom);
  };

  const onSubmit = async () => {
    if (selectedClassroom && selectedTeacher) {
      const allocation = {
        teacherID: selectedTeacher,
        classroomID: selectedClassroom,
      };
      try {
        console.log(allocation);
        const response = await axios.post(`${api_url}/AllocateClassroom`, allocation);
        console.log("allocated taecher and classroom",response.data)
        setAllocated([...allocated, allocation]);
        setNotification({ state: 'success', text: 'Allocation created successfully' });
      } catch (error) {
        console.error('Error creating allocation', error);
        setNotification({ state: 'error', text: 'Error creating allocation' });
      }
    }
  };
  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setNotification(null);
    }, 2000);
    return () => clearTimeout(notificationTimeout); 
  }, [notification]); 

  function onDeallocation(teacherID: number, classroomID: number): void {
    console.log(classroomID)
    console.log(teacherID)
    try {
      axios.delete(`${api_url}/AllocateClassroom/DeleteByClassroomIDAndTeacherID/${classroomID}/${teacherID}`);
      const updatedAllocated = allocated.filter(
        (allocation) =>
          allocation.teacherID !== teacherID && allocation.classroomID !== classroomID
      );
      setAllocated(updatedAllocated);
      setNotification({ state: 'success', text: 'Deallocation successful' });
    } catch (error) {
      console.error('Error during deallocation', error);
      setNotification({ state: 'error', text: 'Error during deallocation' });
    }
  }

  return (
    <div>
       <TopNavbar />
    {notification && <Notification state={notification.state} text={notification.text} />}

      <FormTable
     
      tag1='teacherID'
      tag2='classroomID'
      tag3='teacherName'
          options1Name='Select Teacher'
          options2Name='Select Classroom'
        btntxt="Add Classroom"
        img="/images/allocateclass.svg"
        name="Teacher Classroom Form"
        text1="Allocated Teacher"
        text2="Allocated Classroom"
        options1={teachers.map((teacher) => ({
          value: teacher.teacherID,
          label: teacher.firstName + ' ' + teacher.lastName,
        }))}
        options2={classes.map((classroom) => ({
          value: classroom.classroomID,
          label: classroom.classroomName,
        }))}
        data={allocated}
        onSelection1={onTeacherSelect}
        onSelection2={onClassroomSelect}
        onSubmit={onSubmit}
        onDeAllocation={onDeallocation}
        selectedClass={selectedClassroom}
        selectedTeacher={selectedTeacher}
      />
    </div>
  );
};

export default TeacherClassroom;
