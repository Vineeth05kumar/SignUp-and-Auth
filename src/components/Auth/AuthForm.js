import React, { useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import classes from './AuthForm.module.css';

const supabaseUrl = 'https://bfnnrbxpeqmfcfortrgh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbm5yYnhwZXFtZmNmb3J0cmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMzM1NjcsImV4cCI6MjAzNzgwOTU2N30.rLyJENl3x46Bd7FomHLdVo4dRmhavQfGptqsRvAuPts';
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userEmailRef = useRef();
  const userPassRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null); // Reset error state when switching modes
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = userEmailRef.current.value;
    const enteredPassword = userPassRef.current.value;

    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signIn({
          email: enteredEmail,
          password: enteredPassword,
        });
        if (error) {
          throw new Error(error.message);
        }
        // Handle successful login (redirect, show message, etc.)
        console.log('User logged in successfully');
      } else {
        const { user, error } = await supabase.auth.signUp({
          email: enteredEmail,
          password: enteredPassword,
        });
        if (error) {
          throw new Error(error.message);
        }
        // Handle successful sign-up (send verification email, show message, etc.)
        console.log('User signed up successfully:', user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={userEmailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={userPassRef} required />
        </div>
        <div className={classes.actions}>
          <button type='submit' className={classes.toggle} disabled={isLoading}>
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            disabled={isLoading}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
