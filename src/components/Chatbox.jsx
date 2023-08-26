import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import registrationimg from "../assets/registrationimg.png";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { getDatabase, ref, set,push,onValue  } from "firebase/database";
import moment from "moment/moment";
const Chatbox = () => {
  const db = getDatabase();
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let activeChat = useSelector((state) => state.activeChat.activeChat);

  let [msg, setMsg] = useState("");
  let [msglist,setMsglist] = useState([])
  let [groupmsglist,setGroupmsglist] = useState([])

  let handleChat = () => {
    // console.log(userData);
    // console.log(activeChat);
    // console.log(msg);



    if(activeChat.type == "groupmsg"){
      if(msg != ""){
        set(push(ref(db, 'groupmsg')), {
          whosendname: userData.displayName,
          whosendid: userData.uid,
          whorecivename: activeChat.name,
          whoreciveid: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+ 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
        });
      }
    }else{
      if(msg != ""){
        set(push(ref(db, 'signlemsg')), {
          whosendname: userData.displayName,
          whosendid: userData.uid,
          whorecivename: activeChat.name,
          whoreciveid: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${new Date().getMonth()+ 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
        });
      }
    }


  };

  useEffect(()=>{
    const msgtRef = ref(db, 'signlemsg');
    onValue(msgtRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        console.log(item.val())
        if(item.val().whosendid == userData.uid && item.val().whoreciveid == activeChat.id || item.val().whosendid == activeChat.id && item.val().whoreciveid == userData.uid){
          arr.push(item.val())
        }
      })
      setMsglist(arr)
    });
  },[activeChat.id])

  useEffect(()=>{
    const msgtRef = ref(db, 'groupmsg');
    onValue(msgtRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        console.log(item.val())
        if(item.val().whosendid == userData.uid && item.val().whoreciveid == activeChat.id ){
          arr.push(item.val())
        }
      })
      setGroupmsglist(arr)
    });
  },[activeChat.id])

  

  let handleKeyPress = (e)=>{
    if(e.key == "Enter"){
      if(activeChat.type == "groupmsg"){
        if(msg != ""){
          set(push(ref(db, 'groupmsg')), {
            whosendname: userData.displayName,
            whosendid: userData.uid,
            whorecivename: activeChat.name,
            whoreciveid: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+ 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
          });
        }
      }else{
        if(msg != ""){
          set(push(ref(db, 'signlemsg')), {
            whosendname: userData.displayName,
            whosendid: userData.uid,
            whorecivename: activeChat.name,
            whoreciveid: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${new Date().getMonth()+ 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
          });
        }
      }
    }
  }


  let handleMsg = (e)=>{
    setMsg(e.target.value)
  }

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
        {/* <div className="msg">
          <p className="getaudio">
            <audio controls></audio>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div> */}
        {/* <div className="msg">
          <p className="sendaudio">
            <audio controls></audio>
          </p>
          <p className="time">Today, 2:01pm</p>
        </div> */}
        {/* <div className="msg">
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
        </div> */}
        
        {activeChat.type == "singlemsg"?
        msglist.map(item=>(

          
          
          item.whosendid == userData.uid && item.whoreciveid == activeChat.id  
           ?
          <div className="msg">
            <p className="sendmsg">{item.msg}</p>
            <p className="time">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
          </div>
          : item.whosendid == activeChat.id && item.whoreciveid == userData.uid &&
          <div className="msg">
            <p className="getmsg">{item.msg}</p>
            <p className="time">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
          </div>
        )):
        groupmsglist.map(item=>(

          
          
          item.whosendid == userData.uid && item.whoreciveid == activeChat.id  
           ?
          <div className="msg">
            <p className="sendmsg">{item.msg}</p>
            <p className="time">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
          </div>
          : item.whosendid == activeChat.id && item.whoreciveid == userData.uid &&
          <div className="msg">
            <p className="getmsg">{item.msg}</p>
            <p className="time">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</p>
          </div>
        ))
        }
        
        
      </div>
      <div className="msgcontainer">
        <div className="msgwritecon">
          <input
            onChange={handleMsg}
            className="msgwrite"
            onKeyUp={handleKeyPress}
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
