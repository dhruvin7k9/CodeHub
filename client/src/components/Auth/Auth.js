import './Auth.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from '../../utils/ServerHelpers';
import { IconButton } from '@material-ui/core';
import { Height, Visibility, VisibilityOff } from '@material-ui/icons';

const Auth = () => {

  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  const passwordIsValid = (password) => {
    var regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "" || username === "") {
      setError("Required field is missing");
      setLoading(false);
    }
    else if (!passwordIsValid(password)) {
      setError("Password must be 8 character long (1 number and 1 letter)!");
      setLoading(false);
    }
    else {

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const userInfo = {
            email: user.email,
            username: username,
          };

          // Create user in backend
          await createUser(userInfo)
            .then((data) => {
              localStorage.setItem('userData', JSON.stringify(data));
              setLoading(false);
              navigate('/');
            })
            .catch((error) => {
              console.error('Error creating user in backend:', error.message);
              setError(error.message);
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error creating user:', error.code, error.message);
          setError("User already exists, use different email !");
          setLoading(false);
        });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else {
      await signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
        const user = userCredential.user;

        const userInfo = {
          email: user.email
        };

        // log user in backend
        await loginUser(userInfo)
          .then((data) => {
            localStorage.setItem('userData', JSON.stringify(data));
            setLoading(false);
            navigate('/');

          })
          .catch((error) => {
            console.error('Error login user in backend:', error.message);
            setError(error.message);
            setLoading(false);
          });

      }).catch((error) => {
        console.log(error.code);
        setError("Invalid credentials !");
        setLoading(false);
      })
    }
  }


  return (
    <section className='auth-section'>

      <div className='auth-container'>
        {!isSignup && <img src="/askmedev.jpg" style={{borderRadius:'50%', height:250, width:300}} alt='logo' className='login-logo' />}
        <form>
          {
            isSignup && (
              <label htmlFor='name'>
                <h4>Username</h4>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="name" id="name" />
              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name='email' id='email' />
          </label>
          <label htmlFor='password'>
            <div style={{ display: "flex" }}>
              <h4>Password</h4>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '2px',
                  transform: 'translateY(-50%)', // center vertically
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </div>

            {isSignup && <p>Password must contain at least eight <br />characters, including at least 1 leter and 1 <br />number</p>}
          </label>


          <button onClick={isSignup ? handleRegister : handleSignIn} type='submit' className='auth-btn' disabled={loading}>
            {loading ? (isSignup ? 'Signing....' : 'Loging...') : (isSignup ? 'Sign up' : 'Log in')}
          </button>
        </form>
        <p>
          {isSignup ? 'already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignup ? 'Log in' : 'Sign up'}</button>
        </p>

      </div>
      {
        error !== "" && (<p style={{
          color: "red",
          fontSize: "14px"
        }}>
          {error}
        </p>)
      }

    </section>
  )
}

export default Auth