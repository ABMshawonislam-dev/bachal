import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import {
  getDatabase,
  set,
  push,
  ref,
  onValue,
  remove,
} from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { activeChat } from "../slices/activechat/activeChatSlice";

const Friends = ({ button }) => {
  const db = getDatabase();

  let [friends, setFriends] = useState([]);

  let userData = useSelector((state) => state.loggedUser.loginUser);
  let dispatch = useDispatch();

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

  let handleUnFriend = (item) => {
    console.log(item.id);
    remove(ref(db, "friends/" + item.id));
  };

  let handleBlock = (item) => {
    console.log(userData.uid == item.whosendid);
    console.log(userData.uid == item.whoreceiveid);

    if (userData.uid == item.whosendid) {
      set(push(ref(db, "block/")), {
        blockedname: item.whoreceivename,
        blockedid: item.whoreceiveid,
        blockbyid: item.whosendid,
        blockbyname: item.whosendname,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    } else {
      set(push(ref(db, "block/")), {
        blockedname: item.whosendname,
        blockedid: item.whosendid,
        blockbyid: item.whoreceiveid,
        blockbyname: item.whoreceivename,
      }).then(() => {
        remove(ref(db, "friends/" + item.id));
      });
    }
  };

  let handleMsg = (item) => {
    if (item.whosendid == userData.uid) {

      dispatch(
        activeChat({
          type: "singlemsg",
          name: item.whoreceivename,
          id: item.whoreceiveid,
        })
      );
    } else {
      dispatch(
        activeChat({
          type: "singlemsg",
          name: item.whosendname,
          id: item.whosendid,
        })
      );
    }
  };

  return (
    <div className="box">
      <h3>Friend Request</h3>

      {friends.map((item) => (
        <>
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
              {button == "msg" ? (
                <Button
                  onClick={() => handleMsg(item)}
                  size="small"
                  variant="contained"
                >
                  msg
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleBlock(item)}
                    size="small"
                    variant="contained"
                  >
                    Block
                  </Button>
                  <Button
                    onClick={() => handleUnFriend(item)}
                    size="small"
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Friends;
