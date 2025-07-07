import React from 'react';
import { getPatients,getUsers } from '../utils/storage';

const TopPatient = ({ patient }) => {

  const allUsers = getUsers();

  return (
    
      <div>

        {allUsers.map((user) => {
          if(user.patientId === patient.patientId){
            
            return <div key={user.id} className='patient_info'>
              <img src={user.avatar} alt="avatar" />
              <div className='patient_info_content'>
              <p className='patient_info_content_p'>Name: {user.name}</p>
              <p className='patient_info_content_p'>Patient ID: {user.patientId}</p>
              <p className='patient_info_content_p'>Email: {user.email}</p>
            <p className='patient_info_content_p'>Visit Count: {patient.patientCount}</p>
              </div>
            </div>
          }
        })}
        
       
      </div>
    
  );
};

export default TopPatient; 