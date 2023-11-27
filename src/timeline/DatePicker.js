import React, {useState} from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// using mui and disabling past dates;
export default function StaticDatePickerLandscape(props) {
  const [value, setValue] = useState('');


  // disable all the dates which are already booked for the appointment
  const checkDate = (bookedSlots, view) =>{
         let block = false;
         const {$M, $y, $D, $H} = bookedSlots;
        //  const obj = {
        //   '2023-10-23':[1, 2, 4, 6, 8]
        //  }
         const check = `${$y}-${$M}-${$D}`
         if(props.appointments.hasOwnProperty(check)) {
            const getHours = props.appointments[check];
            const found = getHours.find((item)=> item === $H);
            if(found) {
              block = true;
            }
         } 
           // returns true if date and time is in already booked slot
        return block;
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      < StaticDateTimePicker 
        disablePast= {true}
        value={value}
        ampm={false}
        onChange={(newValue) => {
          const {$M, $y, $D, $H} = newValue;
          const dateValue = `${$y}-${$M}-${$D}:${$H}`
          setValue(newValue);
          props.setAppt(dateValue)
        }}
        selectedSections='all'
        shouldDisableTime={checkDate}
        slotProps={{
          actionBar: {
              // The actions will be the same between desktop and mobile
              actions: []
          }
      }}
      />
    </LocalizationProvider>
  );
}
