import React, { useState } from "react";
import profile from "../assets/profile.png";
import registrationimg from "../assets/registrationimg.png";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
const Chatbox = () => {
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let activeChat = useSelector((state) => state.activeChat.activeChat);

  let [msg, setMsg] = useState("");

  let handleChat = () => {
    // console.log(userData);
    // console.log(activeChat);
    // console.log(msg);

    let data = {
      whosendname: userData.displayName,
      whosendid: userData.uid,
      whorecivename: activeChat.name,
      whoreciveid: activeChat.id,
      msg: msg,
    };
    console.log(data);
  };

  return (
    <div className="chatbox">
      <div className="msgprofile">
        <div className="signal">
          <img width="50" src={profile} />

          <div className="round"></div>
        </div>
        <div>
          <h3>{activeChat.name}</h3>
          <p>Online</p>
        </div>
      </div>
      <div className="msgbox">
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
        <div className="msg">
          <p className="getaudio">
            <audio controls></audio>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendaudio">
            <audio controls></audio>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getaudio">
            <video width="320" height="240" controls></video>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendaudio">
            <video width="320" height="240" controls></video>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="getmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
        <div className="msg">
          <p className="sendmsg">Hello SM</p>
          <p className="time">Today, 2:01pm</p>
        </div>
      </div>
      <div className="msgcontainer">
        <div className="msgwritecon">
          <input
            onChange={(e) => setMsg(e.target.value)}
            className="msgwrite"
          />
        </div>
        <Button variant="contained" onClick={handleChat}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chatbox;
