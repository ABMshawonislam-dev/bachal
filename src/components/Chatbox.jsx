import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import registrationimg from "../assets/registrationimg.png";
import ModalImage from "react-modal-image";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import {
  getStorage,
  ref as imgref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import moment from "moment/moment";
import { AiFillFileImage } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EmojiPicker from "emoji-picker-react";
import { AudioRecorder } from "react-audio-voice-recorder";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Chatbox = () => {
  const db = getDatabase();
  const storage = getStorage();
  let userData = useSelector((state) => state.loggedUser.loginUser);
  let activeChat = useSelector((state) => state.activeChat.activeChat);

  let [msg, setMsg] = useState("");
  let [msglist, setMsglist] = useState([]);
  let [groupmsglist, setGroupmsglist] = useState([]);
  let [progress, setProgress] = useState(0);
  let [showemo, setShowemo] = useState(false);
  let [audiourl, setAudiourl] = useState("");

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudiourl(url);
    console.log(blob);
  };

  let handleChat = () => {
    // console.log(userData);
    // console.log(activeChat);
    // console.log(msg);

    if (activeChat.type == "groupmsg") {
      if (msg != "") {
        set(push(ref(db, "groupmsg")), {
          whosendname: userData.displayName,
          whosendid: userData.uid,
          whorecivename: activeChat.name,
          whoreciveid: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    } else {
      if (msg != "") {
        set(push(ref(db, "signlemsg")), {
          whosendname: userData.displayName,
          whosendid: userData.uid,
          whorecivename: activeChat.name,
          whoreciveid: activeChat.id,
          msg: msg,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
        });
      }
    }
  };

  useEffect(() => {
    const msgtRef = ref(db, "signlemsg");
    onValue(msgtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log(item.val());
        if (
          (item.val().whosendid == userData.uid &&
            item.val().whoreciveid == activeChat.id) ||
          (item.val().whosendid == activeChat.id &&
            item.val().whoreciveid == userData.uid)
        ) {
          arr.push(item.val());
        }
      });
      setMsglist(arr);
    });
  }, [activeChat.id]);

  useEffect(() => {
    const msgtRef = ref(db, "groupmsg");
    onValue(msgtRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });
      setGroupmsglist(arr);
    });
  }, [activeChat.id]);

  let handleKeyPress = (e) => {
    if (e.key == "Enter") {
      if (activeChat.type == "groupmsg") {
        if (msg != "") {
          set(push(ref(db, "groupmsg")), {
            whosendname: userData.displayName,
            whosendid: userData.uid,
            whorecivename: activeChat.name,
            whoreciveid: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        }
      } else {
        if (msg != "") {
          set(push(ref(db, "signlemsg")), {
            whosendname: userData.displayName,
            whosendid: userData.uid,
            whorecivename: activeChat.name,
            whoreciveid: activeChat.id,
            msg: msg,
            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
          });
        }
      }
    }
  };

  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleImageUpload = (e) => {
    console.log(e.target.files[0].name);
    const storageRef = imgref(storage, `${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress);
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProgress(0);
          if (activeChat.type == "groupmsg") {
            set(push(ref(db, "groupmsg")), {
              whosendname: userData.displayName,
              whosendid: userData.uid,
              whorecivename: activeChat.name,
              whoreciveid: activeChat.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          } else {
            set(push(ref(db, "signlemsg")), {
              whosendname: userData.displayName,
              whosendid: userData.uid,
              whorecivename: activeChat.name,
              whoreciveid: activeChat.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
          }
        });
      }
    );
  };

  let handleEmoji = (emo) => {
    console.log(emo.emoji);
    setMsg(msg + emo.emoji);
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

        {activeChat.type == "singlemsg"
          ? msglist.map((item) =>
              item.whosendid == userData.uid &&
              item.whoreciveid == activeChat.id ? (
                <div className="msg">
                  {item.msg ? (
                    <p className="sendmsg">{item.msg}</p>
                  ) : (
                    <p className="sendimg">
                      <ModalImage small={item.img} large={item.img} />
                    </p>
                  )}

                  <p className="time">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                item.whosendid == activeChat.id &&
                item.whoreciveid == userData.uid && (
                  <div className="msg">
                    {item.msg ? (
                      <p className="getmsg">{item.msg}</p>
                    ) : (
                      <p className="getimg">
                        <ModalImage small={item.img} large={item.img} />
                      </p>
                    )}
                    <p className="time">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                )
              )
            )
          : groupmsglist.map((item) =>
              item.whosendid == userData.uid &&
              item.whoreciveid == activeChat.id ? (
                <div className="msg">
                  {item.msg ? (
                    <p className="sendmsg">{item.msg}</p>
                  ) : (
                    <p className="sendimg">
                      <ModalImage small={item.img} large={item.img} />
                    </p>
                  )}
                  <p className="time">
                    {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                  </p>
                </div>
              ) : (
                item.whoreciveid == activeChat.id && (
                  <div className="msg">
                    {item.msg ? (
                      <p className="getmsg">{item.msg}</p>
                    ) : (
                      <p className="getimg">
                        <ModalImage small={item.img} large={item.img} />
                      </p>
                    )}
                    <p className="time">
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                )
              )
            )}
      </div>
      <div className="msgcontainer">
        <div className="msgwritecon">
          <input
            onChange={handleMsg}
            className="msgwrite"
            onKeyUp={handleKeyPress}
            value={msg}
          />
          {audiourl && (
            <audio className="audiocontainer" src={audiourl} controls></audio>
          )}
          <label>
            <AiFillFileImage
              style={{ position: "absolute", top: "15px", right: "5px" }}
            />
            <input onChange={handleImageUpload} type="file" hidden />
          </label>
          <BsEmojiSmile
            onClick={() => setShowemo(!showemo)}
            style={{ position: "absolute", top: "15px", right: "25px" }}
          />
          <AudioRecorder
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            downloadOnSavePress={false}
            downloadFileExtension="webm"
          />
          {showemo && (
            <div className="emojiholder">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>

        <Button variant="contained" onClick={handleChat}>
          Send
        </Button>
        {audiourl && (
          <Button variant="contained" onClick={() => setAudiourl("")}>
            cancel
          </Button>
        )}
      </div>
      {progress != 0 && (
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={progress} />
        </Box>
      )}
    </div>
  );
};

export default Chatbox;
