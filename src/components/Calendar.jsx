import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import './Calendar.css'
import { FaBars } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getAppointments } from '../utils/storage';

const Calendar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateAppointments, setSelectedDateAppointments] = useState([]);
    const previous = '<<';
    const next = '>>';
    
    const navigate = useNavigate();
    
   
    useEffect(() => {
        setAppointments(getAppointments());
    }, []);
    
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };
    
    const handleNavigation = (route) => {
        navigate(route);
        setIsNavOpen(false); 
    };
    
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };
    
    const getAppointmentsForDate = (date) => {
        const dateString = date.toDateString();
        const filteredAppointments = [];
        for (let i = 0; i < appointments.length; i++) {
            const appointment = appointments[i];
            const appointmentDate = new Date(appointment.appointmentDateTime);
            if (appointmentDate.toDateString() === dateString) {
                filteredAppointments.push(appointment);
            }
        }
        return filteredAppointments;
    };
    
    const handleDateClick = (date) => {
        setSelectedDate(date);
        const dateAppointments = getAppointmentsForDate(date);
        setSelectedDateAppointments(dateAppointments);
    };
    
    const goToPreviousMonth = () => {
        setSelectedDate(null);
        setSelectedDateAppointments([]);
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };
    
    const goToNextMonth = () => {
        setSelectedDate(null);
        setSelectedDateAppointments([]);
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };
    

    
    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(
                <div key={`empty-${i}`} className='calendar-day empty'></div>
            );
        }
        
        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayAppointments = getAppointmentsForDate(date);
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const hasAppointments = dayAppointments.length > 0;
            
            days.push(
                <div 
                    key={day} 
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${hasAppointments ? 'has-appointments' : ''}`}
                    onClick={() => handleDateClick(date)}
                >
                    <span className='day-number'>{day}</span>
                    {dayAppointments.length > 0 && (
                        <div className='appointment-indicator'>{dayAppointments.length}</div>
                    )}
                </div>
            );
        }
        
        return days;
    };
    
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
                <h2 className='dashboard-title'>Calendar</h2>
                <div className='dashboard-content'>
                    <div className='calendar-container'>
                        <div className='calendar-header'>
                            <button onClick={goToPreviousMonth} className='calendar-nav-btn'>{previous}</button>
                            <h3>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                            <button onClick={goToNextMonth} className='calendar-nav-btn'>{next}</button>
                        </div>
                        
                        <div className='calendar-grid'>
                            <div className='calendar-weekdays'>
                                <div>Sun</div>
                                <div>Mon</div>
                                <div>Tue</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                            </div>
                            
                            <div className='calendar-days'>
                                {renderCalendarDays()}
                            </div>
                        </div>
                        
                        {selectedDate && (
                            <div className='selected-date-appointments'>
                                <h4>Appointments for {selectedDate.toLocaleDateString('en-US', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}</h4>
                                {selectedDateAppointments.length > 0 ? (
                                    <div className='appointments-list'>
                                        {selectedDateAppointments.map((appointment, index) => (
                                            <div key={index} className='appointment-item'>
                                                <div className='appointment-time'>
                                                    {new Date(appointment.appointmentDateTime).toLocaleTimeString('en-US', { 
                                                        hour: '2-digit', 
                                                        minute: '2-digit' 
                                                    })}
                                                </div>
                                                <div className='appointment-details'>
                                                    <div className='appointment-title'>{appointment.title}</div>
                                                    <div className='appointment-patient'>{appointment.patientName}</div>
                                                    <div className={`appointment-status-${appointment.status.toLowerCase()}`}>{appointment.status}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{color:'#1d4ed8'}}>No appointments scheduled for this date.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Calendar