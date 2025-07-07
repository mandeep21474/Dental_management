import React, { useState, useEffect } from 'react'
import { useAuth } from '../contextapi/context';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import './Profile.css';
import { getPatients ,getAppointments} from '../utils/storage';

// Function to check if the user is on a mobile device
const isMobileDevice = () => {
    // Get the user's browser information
    const userAgent = navigator.userAgent;
    
    // List of mobile device keywords to look for
    const mobileKeywords = [
        'Android',
        'webOS', 
        'iPhone',
        'iPad',
        'iPod',
        'BlackBerry',
        'IEMobile',
        'Opera Mini'
    ];
    
    // Check if any mobile keyword is found in the user agent string
    for (let keyword of mobileKeywords) {
        if (userAgent.includes(keyword)) {
            return true;
        }
    }
    
    // If no mobile keywords found, it's not a mobile device
    return false;
};

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

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [appointmentDetails, setAppointmentDetails] = useState([]);
    const [patientDetails, setPatientDetails] = useState(null);

    useEffect(() => {
        const allpatient = getPatients();
        const allappointment = getAppointments();
        if (!user) {
            navigate('/');
        } else if (user.patientId) {
            let found = null;
            for (let i = 0; i < allpatient.length; i++) {
                if (allpatient[i].id === user.patientId) {
                    found = allpatient[i];
                    break;
                }
            }
            setPatientDetails(found);
            const appointments = allappointment.filter(a => a.patientId === user.patientId);
            setAppointmentDetails(appointments);
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="profile">
            <header className="profile-header">
                <h1>Patient Profile</h1>
                <div className="user-info">
                    <span>Welcome, {user.name}</span>
                    <FiLogOut className="logout-icon" onClick={handleLogout} title="Logout" style={{ cursor: 'pointer', fontSize: '1.5rem' }} />
                </div>
            </header>
            
            <main className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <img src={user.avatar} alt={user.name} />
                    </div>
                    <div className="profile-details">
                      
                        <h2>{user.name}</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        {user.patientId && <p><strong>Patient ID:</strong> {user.patientId}</p>}
                        {patientDetails && <p><strong>Address:</strong> {patientDetails.address}</p>}
                        {patientDetails && <p><strong>Contact:</strong> {patientDetails.contact}</p>}
                        {patientDetails && <p><strong>Blood Type:</strong> {patientDetails.bloodType}</p>}
                        {patientDetails && <p><strong>DOB:</strong> {patientDetails.dob}</p>}
                        

                    
                      
                    </div>
                </div>
                
                <div className="profile-extra">
                    {patientDetails ? (
                        <div className='extra_info'>
                            <div className='extra_info_div'><p><strong>Allergies:</strong> {patientDetails.allergies}</p></div>
                            <div className='extra_info_div'><p><strong>Emergency Contact:</strong> {patientDetails.emergencyContact}</p></div>
                            <div className='extra_info_div'><p><strong>Medical History:</strong> {patientDetails.medicalHistory}</p></div>
                        </div>
                    ) : (
                        <p>No patient details found.</p>
                    )}
                </div>
                
                <div className='Appointment'>
                <h2>Appointment History</h2>
                {/* {console.log(appointmentDetails)} */}
                <div className='Appointment_card'>
                    {appointmentDetails && appointmentDetails.length > 0 ? (
                        appointmentDetails.map((appointment, idx) => (
                            <div
                                className={`Appointment_card_div ${appointment.status === 'Completed' ? 'completed' : appointment.status === 'Pending' ? 'pending' : 'cancelled'}`}
                                key={appointment.id}
                            >
                                <h3>Appointment {idx + 1}</h3>
                                <p>Date: {formatDateTime(appointment.appointmentDateTime)}</p>
                                <p>Status: {appointment.status}</p>
                                {appointment.status === 'Completed' && appointment.treatment && (
                                    <div className="treatment-info">
                                        <strong>Treatment:</strong> {appointment.treatment}
                                    </div>
                                )}
                                {appointment.status === 'Completed' && appointment.comments && (
                                    <div className="comment-info">
                                        <strong>Comment:</strong> {appointment.comments}
                                    </div>
                                )}
                                {appointment.status === 'Completed' && appointment.cost && (
                                    <div className="cost-info">
                                        <strong>Cost:</strong> ₹{appointment.cost}
                                    </div>
                                )}
                                {appointment.status === 'Completed' && appointment.nextDate && (
                                    <div className="next-appointment-info">
                                        <strong>Next Appointment:</strong> {formatDateTime(appointment.nextDate)}
                                    </div>
                                )}
                                {
                                   appointment.files && appointment.files.length > 0 && (
                                        <div className="files-info">
                                            <strong>Files:</strong>
                                            {appointment.files.map((file, idx) => (
                                                <li key={idx} style={{ marginBottom: '5px' ,color:'white'}}>
                                                    <span> {file.name}</span>
                                                    <br />
                                                    {isMobileDevice() ? (
                                                        <a 
                                                            href={file.url} 
                                                            download={file.name}
                                                            style={{ 
                                                                display: 'inline-block', 
                                                                padding: '8px 16px', 
                                                                backgroundColor: '#007bff', 
                                                                color: 'white', 
                                                                textDecoration: 'none', 
                                                                borderRadius: '4px',
                                                                marginTop: '5px'
                                                            }}
                                                        >
                                                            Download {file.name}
                                                        </a>
                                                    ) : (
                                                        <>
                                                            {file.name.toLowerCase().endsWith('.pdf') ? (
                                                                <iframe 
                                                                    src={file.url} 
                                                                    width="100%" 
                                                                    height="400px" 
                                                                    title={`PDF Preview ${idx}`} 
                                                                    style={{ border: '1px solid #ccc', borderRadius:'20px' }} 
                                                                />
                                                            ) : (
                                                                <img 
                                                                    src={file.url} 
                                                                    alt={`Preview ${file.name}`} 
                                                                    style={{ width: '200px', height: 'auto', marginTop: '5px', borderRadius:'20px'}} 
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    ) : (
                        <p>No appointments found.</p>
                    )}
                </div>
                </div>
            </main>
        </div>
    );
}

export default Profile