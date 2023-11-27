import React, {useState, useCallback, useEffect} from 'react'
import axios from 'axios';
import "./Homepage.css"
import Sidenav from './navigation/Sidenav';
import DatePicker from './timeline/DatePicker';
import Appointment from './navigation/Appointments';

function Homepage() {
  const [appt, setappt] = useState('');
  const [appointments, setAppointment] = useState({});
  useEffect(()=>{
    axios.get('http://localhost:8080/appt').then((success)=>{
      setAppointment(success.data.time);
    }).catch((err)=>{
      console.log(err);
      setAppointment([]);
    })
}, [])
  const handleChange = useCallback((newValue)=>{
       setappt(newValue)
  }, [appt]);
  return (
    <div className='homepage'>
      <div className='homepage__appt'>
        {/* <Appointment appointments={appointments}/> */}
      </div>
      <div className="homepage__timeline">
        <DatePicker setAppt={handleChange} appointments={appointments}/>
      </div>
      <div className='homepage__nav'>
        <Sidenav appt={appt} />
      </div>
    </div>
  )
}

export default Homepage