import React, { useState, useEffect } from 'react'   
import './Patients.css'
import { FaBars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Patientcard from './Patientcard';
import {getUsers} from '../utils/storage'
import {getPatients, addPatient, setUsers} from '../utils/storage'    
const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [addPatientOpen, setAddPatientOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [allusers, setAllusers] = useState([]);
    useEffect(() => {
        const all_users = getUsers();
        setAllusers(all_users);
        if(search.length > 0){
            setFilteredPatients(patients.filter(patient => patient.name.toLowerCase().includes(search.toLowerCase())));
        }else{
            setFilteredPatients(patients);
        }   
    }, [search, patients]);
    const fetchPatients = () => {
        const all_patients = getPatients();
        setPatients(all_patients);
    };
    useEffect(() => {
        fetchPatients();
    }, []);
    const handleAddPatient = (e) => {
        e.preventDefault();
        const newPatient = {
            name: e.target.name.value,
            email: e.target.email.value,
            id: e.target.patientId.value,
            contact: e.target.contact.value,
            address: e.target.address.value,
            bloodType: e.target.bloodType.value,
            avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
            dob: e.target.dob.value,
            medicalHistory: e.target.medicalHistory.value,
            allergies: e.target.allergies.value,
            emergencyContact: e.target.emergencyContact.value
        };
        const newUser = {
          id:allusers.length + 1 
          , role: "Patient", email: e.target.email.value, password: "patient123", patientId: e.target.patientId.value, name: e.target.name.value, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
        };
        setUsers(newUser);   //for admin to add users
        addPatient(newPatient);
        setAddPatientOpen(false);
        fetchPatients();
    };
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const handleNavigation = (route) => {
        navigate(route);
        setIsNavOpen(false); 
    };
  return (
    <div className='dashboard-container patients-dashboard-container'>
      <header>
        <nav className={`dashboard-nav ${isNavOpen ? 'nav-open' : ''}`}> 
          <FaBars className='dashboard-nav-icon' onClick={toggleNav} />
          <ul className="nav-menu">
            <li onClick={() => handleNavigation('/dashboard')}>Dashboard</li>
            <li onClick={() => handleNavigation('/appointments')}>Appointments</li>
            <li onClick={() => handleNavigation('/patients')}>Patients</li>
            <li onClick={() => handleNavigation('/calendar')}>Calendar</li>
            <li onClick={() => handleNavigation('/')}> <FiLogOut className="nav-icon" /> </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Patients</h1>
        <div className='patients_container'>
            <input type='text' placeholder='Search Patient' value={search} onChange={(e) => setSearch(e.target.value)} />


            <button className='add_patient_button' onClick={() => setAddPatientOpen(true)}>Add Patient</button>
            {addPatientOpen && <div className='add_patient_form'>
                <h2>Add Patient</h2>
                <form onSubmit={handleAddPatient}>
                    <input type='text' placeholder='Name' name='name' required />
                    <input type='email' placeholder='Email' name='email' required />
                    <input type="text" placeholder='Patient ID' name='patientId' required />
                    <input type='text' placeholder='Contact' name='contact' required />
                    <input type='text' placeholder='Address' name='address' />
                    <input type='text' placeholder='Blood Type' name='bloodType' />
                    <input type='text' placeholder='DOB' name='dob' />
                    <input type='text' placeholder='Medical History' name='medicalHistory' />
                    <input type='text' placeholder='Allergies' name='allergies' />
                    <input type='text' placeholder='Emergency Contact' name='emergencyContact' />
                    <div className='add_patient_form_buttons'>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={() => setAddPatientOpen(false)}>Cancel</button>
                    </div>
                </form>
            </div>}
            <div className='patient_card'>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <Patientcard key={patient.id} patient={patient} onPatientUpdated={fetchPatients} />
                ))
              ) : (
                <h2>No patients found</h2>
              )}
            </div>
        </div>
      </main>
    </div>
  )
}

export default Patients