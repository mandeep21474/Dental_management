import { Routes, Route } from 'react-router-dom';
import Loginfunc from './components/Authentication';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import Calendar from './components/Calendar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Loginfunc />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
}

export default App;
