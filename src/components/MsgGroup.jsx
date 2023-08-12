import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { useSelector } from "react-redux";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";

const MsgGroup = () => {
  const db = getDatabase();

  let [myGroupList, setMyGroupList] = useState([]);
  let [member, setMember] = useState([]);

  let loginUser = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupid: item.key });
      });
      setMyGroupList(arr);
    });
  }, []);

  useEffect(() => {
    const groupRef = ref(db, "members");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().userid);
      });
      setMember(arr);
    });
  }, []);

  return (
    <div className="box">

      {myGroupList.map((item) =>
        loginUser.uid == item.adminid || member.indexOf(loginUser.uid) != -1 ? (
          <div className="list">
            <div className="img">
              <img src={profile} />
            </div>
            <div className="details">
              <p style={{ fontSize: "12px" }}>Admin: {item.adminname}</p>
              <h4>{item.groupname}</h4>
              <p>{item.grouptagline}</p>
            </div>
            <div className="button">
              <Button
                onClick={() => handleOpen2(item)}
                size="small"
                variant="contained"
                color="success"
              >
                Member
              </Button>
            </div>
          </div>
        ) : (
          <h1>nai</h1>
        )
      )}
    </div>
  );
};

export default MsgGroup;
