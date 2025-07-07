import { mockUsers, mockPatients, mockAppointments } from './mockdata.js';


const STORAGE_KEYS = {
  USERS: 'hospital_users',
  PATIENTS: 'hospital_patients',
  APPOINTMENTS: 'hospital_appointments',
  CURRENT_USER: 'hospital_current_user'
};

// Sets the data if not exists
export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(mockPatients));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(mockAppointments));
  }
};

// User operations
export const getUsers = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
};

export const updateUser = (pid, updates) => {
  const allUsers = getUsers();
  // console.log("allUsers",allUsers);
  let found = false;
  let index=-1;
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].patientId === pid) {
      for (let key in updates) {
        allUsers[i][key] = updates[key];
      }
      index=i;
      found = true;
      break;
    }
  } 
  if (found) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(allUsers));
    return allUsers[index];
  }
  return null;
}
export const setUsers = (users) => {  //for admin to add users
  const alluser= getUsers();


  const newuser={
      // id:generateId(),
      ...users     

  };

  alluser.push(newuser);

  localStorage.setItem(STORAGE_KEYS.USERS,JSON.stringify(alluser));



  return newuser;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
};

export const setCurrentUser = (user) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const clearCurrentUser = () => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};


// Patient operations
export const getPatients = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS) || '[]');
};

export const addPatient=(patient_data)=>{
    const allpatient= getPatients();


    const newpatient={
        // id:generateId(),
        ...patient_data     

    };

    allpatient.push(newpatient);

    localStorage.setItem(STORAGE_KEYS.PATIENTS,JSON.stringify(allpatient));



    return newpatient;




};

export const updatePatient = (patientId, updates) => {
  const allPatients = getPatients();
  let found = false;
  let index=-1;
  for (let i = 0; i < allPatients.length; i++) {
    if (allPatients[i].id === patientId) {
      for (let key in updates) {
        allPatients[i][key] = updates[key];
      }
      index=i;
      found = true;
      break;
    }
  }

  if (found) {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(allPatients));
    for (let i = 0; i < allPatients.length; i++) {
            if (allPatients[i].id === patientId) {
                return allPatients[i];
            }
        }
  }
  return null;
};

export const deletePatient = (patientId) => {
  const patients = getPatients();
  const updatedPatients = [];

  for (let i = 0; i < patients.length; i++) {
    if (patients[i].id !== patientId) {
      updatedPatients.push(patients[i]); 
    }
  }

  localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(updatedPatients));
};


// Appointment operations
export const getAppointments = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
};



export const addAppointment = (appointment) => {
  
  const allAppointments = getAppointments();

  
  const newAppointment = {
    // id:generateId(),
    ...appointment
  };

  allAppointments.push(newAppointment);

  
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(allAppointments));

 
  return newAppointment;
};


export const updateAppointment_on_patient_update = (patientId, updates) => {
  const allAppointments = getAppointments();
  let found = false;
  let index=-1;
  for (let i = 0; i < allAppointments.length; i++) {
    if (allAppointments[i].patientId === patientId) {
        for (let key in updates) {
            allAppointments[i][key] = updates[key];
        }
        index=i;
        found = true;
       
    }
  }
  if (found) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(allAppointments));
    return allAppointments[index];
  }
  return null;
}
 


export const updateAppointment = (appointmentId, updates) => {

  const allAppointments = getAppointments();

  
  for (let i = 0; i < allAppointments.length; i++) {
    if (allAppointments[i].id === appointmentId) {
     
      const updatedAppointment = {
        ...allAppointments[i],  
        ...updates              
      };

    
      allAppointments[i] = updatedAppointment;

     
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(allAppointments));

     
      return updatedAppointment;
    }
  }


  return null;
};




export const deleteAppointment = (appointmentId) => {
  
  const allAppointments = getAppointments();

  
  const updatedAppointments = [];

 
  for (let i = 0; i < allAppointments.length; i++) {
   
    if (allAppointments[i].id !== appointmentId) {
      updatedAppointments.push(allAppointments[i]);
    }
  }


  localStorage.setItem('hospital_appointments', JSON.stringify(updatedAppointments));
};










