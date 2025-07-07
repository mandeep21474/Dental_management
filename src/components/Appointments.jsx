import React, { useState, useEffect } from 'react'   
import './Appointments.css'
import { FaBars, FaSearch } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Appointmentcard from './Appointmentcard'
import {getAppointments, addAppointment} from '../utils/storage'
const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [addAppointmentOpen, setAddAppointmentOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [formStatus, setFormStatus] = useState('');
    const [formFiles, setFormFiles] = useState([]);
    const [filePreview, setFilePreview] = useState([]);

    // Clean up object URLs when filePreview changes or component unmounts
    useEffect(() => {
      return () => {
        filePreview.forEach(url => URL.revokeObjectURL(url));
      };
    }, [filePreview]);

    useEffect(() => {
        if(search.length > 0){
            setFilteredAppointments(appointments.filter(appointment => appointment.patientName.toLowerCase().includes(search.toLowerCase())));
        }else{
            setFilteredAppointments(appointments);
        }   
    }, [search, appointments]);
    const fetchAppointments = () => {
        const all_appointments = getAppointments();
        setAppointments(all_appointments);
    };
    useEffect(() => {
        fetchAppointments();
    }, []);
    const handleFileChange = (e) => {
      const files = Array.from(e.target.files);
      const fileObjs = files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      const previewUrls = fileObjs.map(f => f.url);
      setFormFiles(fileObjs);
      setFilePreview(previewUrls);
    };
    const handleAddAppointment = async (e) => {
        e.preventDefault();
        const newAppointment = {
            id: e.target.appointmentId.value,
            patientName: e.target.patientName.value,
            patientId: e.target.patientId.value,
            title: e.target.title.value,
            appointmentDateTime: e.target.appointmentDateTime.value,
            status: e.target.status.value,
            cost: parseFloat(e.target.cost.value),
            description: e.target.description.value,
            treatment: e.target.treatment.value,
            comments: e.target.comments.value,
            files: formFiles
        };
        await addAppointment(newAppointment);
        setAddAppointmentOpen(false);
        setFormFiles([]);
        setFilePreview([]);
        setFormStatus('');
        fetchAppointments();
    };
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    const handleNavigation = (route) => {
        navigate(route);
        setIsNavOpen(false); 
    };
  return (
    <div className='dashboard-container appointments-dashboard-container'>
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
        <h1>Appointments</h1>
        <div className='appointments_container'>
           
                <input type='text'  placeholder='Search Appointment' value={search} onChange={(e) => setSearch(e.target.value)} />
         

            <button className='add_appointment_button' onClick={() => setAddAppointmentOpen(true)}>Add Appointment</button>
            {addAppointmentOpen && <div className='add_appointment_form'>
                <h2>Add Appointment</h2>
                <form onSubmit={handleAddAppointment}>
                    <input type='text' placeholder='Appointment ID' name='appointmentId' required />
                    <input type='text' placeholder='Patient Name' name='patientName' required />
                    <input type='text' placeholder='Patient ID' name='patientId' required />
                    <input type='text' placeholder='Title' name='title' required />
                    <input type='datetime-local' placeholder='Appointment Date & Time' name='appointmentDateTime' required />
                    <select name='status' required onChange={e => setFormStatus(e.target.value)}>
                        <option value=''>Select Status</option>
                        <option value='Scheduled'>Scheduled</option>
                    </select>
                    <input type='number' placeholder='Cost' name='cost' required />
                    <input type='text' placeholder='Description' name='description' />
                    <input type='text' placeholder='Treatment' name='treatment' />
                    <input type='text' placeholder='Comments' name='comments' />
                   
                        
                    <div className='add_appointment_form_buttons'>
                        <button type='submit'>Submit</button>
                        <button type='button' onClick={() => { setAddAppointmentOpen(false); setFormFiles([]); setFormStatus(''); }}>Cancel</button>
                    </div>
                </form>
            </div>}
            <div className='appointment_card'>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment) => (
                  <Appointmentcard key={appointment.id} appointment={appointment} onAppointmentUpdated={fetchAppointments} />
                ))
              ) : (
                <h2>No appointments found</h2>
              )}
            </div>
        </div>
      </main>
    </div>
  )
}

export default Appointments 