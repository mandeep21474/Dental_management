import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../contextapi/context';
import { useNavigate } from 'react-router-dom';
import './Authentication.css';


const Loginfunc=()=> {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {login}=useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      if (result.user.role === 'Admin') {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };


  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };
  return (
    <>
      <div className='login'>
        <div className='welcome'>
          <h1>Welcome</h1>
          <p>Sign in to your account to continue</p>
        </div>

        <div className='Demo'>
          <div className='info'>
            <h3>Demo Accounts:</h3>
            <br />
            <div className='id'>
              <span className='ids'>Admin</span>
              <span className='ids'>admin@entnt.in</span>
              <span className='ids'>Patient</span>
              <span className='ids'>john@entnt.in</span>
              <span className='passwords grid-item'>
              Password: <b>admin123 / patient123</b></span>
              
            </div>


          </div>
        </div>

       
        <form onSubmit={handleSubmit} className="form">
          <div className="form_inputs">
            {/* Email field */}
            <div className="form_group">
              <label htmlFor="email" className="form_label">
                <FaEnvelope className="form_icon" />
                Email
              </label>
              <input
                id="email"
                type="email"                
                placeholder="Enter email"
                className="form_input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password field */}
            <div className="form_group">
              <label htmlFor="password" className="form_label">
                <FaLock className="form_icon" />
                Password
              </label>

              <div className="password_wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password" 
                  className="form_input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="toggle_icon" onClick={togglePassword}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="error_message">
                {error}
              </div>
            )}
          </div>
          
          <div className='sign_in'>
            <button type="submit" className='button' disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Loginfunc;
