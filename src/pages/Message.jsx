import Grid from "@mui/material/Grid";
import Group from "../components/Group";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import MyGroups from "../components/MyGroups";
import UserList from "../components/UserList";
import Block from "../components/Block";
import MsgGroup from "../components/MsgGroup";
import Chatbox from "../components/Chatbox";
const Message = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MsgGroup />
          <Friends button="msg" />
        </Grid>
        <Grid item xs={8}>
          <Chatbox />
        </Grid>
      </Grid>
    </>
  );
};

export default Message;
