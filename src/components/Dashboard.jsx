import React, { useState } from 'react'
import './Dashboard.css'
import { FaBars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getPatients,getAppointments } from '../utils/storage';
import { useEffect } from 'react';
import TopPatient from './TopPatient';


const Dashboard = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const [patients, setPatients] = useState(0);
  const [appointments, setAppointments] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState(0);
  const [topPatients, setTopPatients] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  

  useEffect(() => {
    const all_data = getPatients();
    const all_appointments = getAppointments();
    setAllAppointments(all_appointments);
    
    setPatients(all_data.length);
    setAppointments(all_appointments.length);
    
    let totalRevenue = 0;
    for (let i = 0; i < all_appointments.length; i++) {
        totalRevenue += all_appointments[i].cost;
    }
    setRevenue(totalRevenue);
    
    let completedCount = 0;
    for (let i = 0; i < all_appointments.length; i++) {
        if (all_appointments[i].status === 'Completed') {
            completedCount++;
        }
    }
    setCompletedAppointments(completedCount);
  }, []); // Empty dependency array

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
    setIsNavOpen(false); 
  };

  useEffect(() => {
    const findTopPatients = () => {
      const allAppointments = getAppointments();
      const allPatients = getPatients();

      // Count appointments for each patient
      const patientAppointmentCounts = {};
      
      allAppointments.forEach(appointment => {
        const patientId = appointment.patientId;
        if (patientAppointmentCounts[patientId]) {
          patientAppointmentCounts[patientId]++;
        } else {
          patientAppointmentCounts[patientId] = 1;
        }
      });

      const patientArray = Object.entries(patientAppointmentCounts);
      
      const patientsWithCounts = patientArray.map((entry) => {
        const patientId = entry[0];
        const appointmentCount = entry[1];
        return {
          patientId: patientId,
          appointmentCount: appointmentCount
        };
      });
      
      const sortedPatients = patientsWithCounts.sort((patientA, patientB) => {
        return patientB.appointmentCount - patientA.appointmentCount;
      });

      const topThreePatients = sortedPatients.slice(0, 3);

      setTopPatients(topThreePatients);
      console.log('Top 3 Patients:', topThreePatients);
    };

    findTopPatients();
  }, []); // Empty dependency array
  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

  return (
    <div className="dashboard-container">
      <header>
        <nav className={`dashboard-nav ${isNavOpen ? 'nav-open' : ''}`}> 
          <FaBars className='dashboard-nav-icon' onClick={toggleNav} />
          <ul className="nav-menu">
            <li onClick={() => handleNavigation('/dashboard')}>Dashboard</li>
            <li onClick={() => handleNavigation('/appointments')}>Appointments</li>
            <li onClick={() => handleNavigation('/patients')}>Patients</li>
            <li onClick={() => handleNavigation('/calendar')}>Calendar</li>
            <li onClick={() => handleNavigation('/')}>
              <FiLogOut className="nav-icon" />
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {/* dashboard content */}
        <h2 className='dashboard-title'>Welcome to your dental management dashboard</h2>
        <div className='dashboard-content'>
            <div className='total-patients'>
                <h2>Total Patients</h2>
                <p>{patients}</p>
            </div>
            <div className='total-appointments'>
                <h2>Total Appointments</h2>
                <p>{appointments}</p>
            </div>
            <div className='total_revenue'>
                <h2>Total Revenue</h2>
                <p>{revenue}</p>
            </div>
            <div className='Completed_appointments'>
                <h2>Completed Appointments</h2>
                <p>{completedAppointments}</p>
            </div>
        </div>

          {/* upcoming appointments */}
          <div className='upcoming_appointments'>
            <h2>Upcoming Appointments</h2>
           
            {
              allAppointments.map((appointment,index) => {
                if(appointment.status === 'Scheduled'){
                return <div key={index} className='upcoming_appointments_content'>
                  <p>{appointment.patientName}</p>
                  <p>{appointment.patientId}</p>
                  <p>{appointment.title}</p>
                  <p>{formatDateTime(appointment.appointmentDateTime)}</p>  
                  <p>{appointment.status}</p>
                </div>
                }
              })
            }
          </div>

        {/* top patients */}
        <div className='top_patients'>
          <h2>Top 3 Patients</h2>
          <p className='top_patients_p'>Patients with most appointments</p>
        {topPatients.map((patient, index) => {
          console.log(patient); 
          return <TopPatient key={index} patient={{patientId: patient.patientId, patientCount: patient.appointmentCount}} />
        })}
        </div>

      </main>
    </div>
  )
}

export default Dashboard