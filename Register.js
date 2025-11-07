import React, { useState } from 'react';
      
export default function Register() {
  const      [username, setUserName] = useState('');
  const      [password, setPassword] = useState('');    
  function handleChange1(e)  {
      
    setUserName(e.target.value);
  };
  function handleChange2(e)  {
       
    setPassword(e.target.value);
  }; 
  function handleDemo(e) {
   setUserName("Ramu Sharma");
  }    
  return (
     <div>
       <h1 align="Center">New User Registration</h1>
        Username:
        <input
          type='text'
          value={username}
          onChange={handleChange1}
        />
     password:
        <input
          type='text'
          value={password}
          onChange={handleChange2}
        />
 Your UserName is: {username} Password is:{password}

 <button
        type="button"
        onClick={handleDemo}  >Change Username</button>
      </div>
      
                
  );
}
