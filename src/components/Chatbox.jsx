import React from 'react'
import profile from "../assets/profile.png";
import registrationimg from "../assets/registrationimg.png";
import ModalImage from "react-modal-image";
import Button from '@mui/material/Button';
const Chatbox = () => {
  return (
    <div className='chatbox'>

    <div className='msgprofile'>
        <div className='signal'>
            <img width="50" src={profile} />
            
            <div className='round'></div>
        </div>
        <div>
            <h3>Shawon Islam</h3>
        <p>Online</p>
        </div>
    </div>
    <div className='msgbox'>
        {/* <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div> */}
        {/* <div className='msg'>
            <p className='getimg'>

                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendimg'>
                
                <ModalImage
                small={registrationimg}
                large={registrationimg}
                />
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div> */}
        <div className='msg'>
            <p className='getaudio'>
                <audio controls></audio>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
                <audio controls></audio>
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getaudio'>
               <video width="320" height="240" controls></video>
            </p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendaudio'>
               <video width="320" height="240" controls></video>
            </p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        <div className='msg'>
            <p className='getmsg'>Hello SM</p>
             <p className='time'>Today, 2:01pm</p>   
        </div>
        <div className='msg'>
            <p className='sendmsg'>Hello SM</p>
            <p className='time'>Today, 2:01pm</p> 
        </div>
        
    </div>
    <div className='msgcontainer'>
       <div className='msgwritecon'>
        <input className='msgwrite'/>
       </div>
       <Button variant="contained">Contained</Button>
    </div>




    </div>
  )
}

export default Chatbox