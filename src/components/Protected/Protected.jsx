import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Protected = (props) => {
    const {Component} = props;
    const navigate = useNavigate()
    
    // token === undefined && localStorage.removeItem('token')
    
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token || token === undefined){
            navigate('/login');
        }
    })
    
    // }, [])
  return (
    <Component />
  )
}

export default Protected