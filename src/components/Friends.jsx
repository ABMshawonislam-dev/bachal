import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Friends = () => {
  let [friends, setFriends] = useState([]);

  const db = getDatabase();

  let userData = useSelector((state) => state.loggedUser.loginUser);

  useEffect(() => {
    const friendsRef = ref(db, "friends");
    onValue(friendsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          item.val().whosendid == userData.uid ||
          item.val().whoreceiveid == userData.uid
        ) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  return (
    <div className="box">
      <h3>Friend Request</h3>

      {friends.map((item) => (
        <div className="list">
          <div className="img">
            <img src={profile} />
          </div>
          <div className="details">
            {item.whoreceiveid == userData.uid ? (
              <h4>{item.whosendname}</h4>
            ) : (
              <h4>{item.whoreceivename}</h4>
            )}
            <p>Hi Guys, Wassup!</p>
          </div>
          <div className="button">
            <Button size="small" variant="contained">
              Block
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friends;
