import React, { useState, useEffect } from 'react';


const ErrorBoundaryMyNotes = ({ children }) => {

 const [hasError, setHasError] = useState(false);
 const [errorMessage, setErrorMessage] = useState("");
 
 useEffect(() => {
   
    const handleError = (error, info) => {
     
    setErrorMessage("Error: " + error + ", Info: " + info);
     setHasError(true);
   };
   
   window.addEventListener('error', handleError);
   
   return () => {
     window.removeEventListener('error', handleError);
   
    };
 
}, []); 


 
if (hasError) {
   
    return (<h1>An error occurred: {errorMessage}</h1>);
 }

 return (children);
};

export default ErrorBoundaryMyNotes;