import {useEffect, useState} from 'react'
import profile from "../assets/profile.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import { getDatabase, ref, set,push ,onValue} from "firebase/database";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


let groupData = {
    groupname: "",
    grouptagline: "",
    total: ""
}

const Group = () => {

    const db = getDatabase();

    let userData = useSelector((state)=> state.loggedUser.loginUser)

   

    let [groupInfo,setGroupInfo] = useState(groupData)
    const [open, setOpen] = useState(false);
    let [groupList,setGroupList] = useState([])
    let [groupMemberList,setGroupMemberList] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleChange = (e)=>{

  
    
    setGroupInfo({
        ...groupInfo,
        [e.target.name]: e.target.value,
    })

  }

  let handleSubmit = ()=>{
    
    
    set(push(ref(db, 'groups/')), {
      groupname: groupInfo.groupname,
      grouptagline: groupInfo.grouptagline,
      adminid: userData.uid,
      adminname: userData.displayName
    }).then(()=>{
        setOpen(false)
    })



  }


  useEffect(()=>{
    const groupRef = ref(db, 'groups');
    onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            arr.push({...item.val(),groupid:item.key})
        })
        setGroupList(arr)
    });
  },[])

  let handleGroupJoin = (item)=>{
    set(push(ref(db, 'grouprequest/')), {
        adminid: item.adminid,
        adminname: item.adminname,
        groupid: item.groupid,
        groupname: item.groupname,
        userid: userData.uid,
        username: userData.displayName
      })
  }

  useEffect(()=>{
    const groupRef = ref(db, 'grouprequest');
    onValue(groupRef, (snapshot) => {
        let arr = []
        snapshot.forEach(item=>{
            if(item.val().userid == userData.uid){
                arr.push(item.val().groupid)
            }
        })
        setGroupMemberList(arr)
    });
  },[])


  return (
    <div className='box'>
        <h3 className='title'>Group List
            <Button size="small" variant="contained" onClick={handleOpen}>Create Group</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create Your Group
                </Typography>
                <Typography  id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField onChange={handleChange} name='groupname'  margin="dense" id="outlined-basic" label="Group Name" variant="outlined" />
                    <TextField onChange={handleChange}  name="grouptagline" margin="dense" id="outlined-basic" label="Group Tagline" variant="outlined" />
                <br/>
                <Button onClick={handleSubmit} variant="contained" margin="dense">Contained</Button>
                </Typography>
                </Box>
            </Modal>

        </h3>

        {groupList.map(item=>(
        userData.uid != item.adminid &&
            <div className="list">
            <div className="img">
                <img src={profile}/>
            </div>
            <div className="details">
            <p style={{fontSize:"12px"}}>Admin: {item.adminname}</p>
                <h4>{item.groupname}</h4>
                <p>{item.grouptagline}</p>
            </div>
            <div className="button">
                {groupMemberList.indexOf(item.groupid) != -1 ?
                    <Button size="small" variant="contained" >Request Send</Button>
                    :
                    <Button onClick={()=>handleGroupJoin(item)} size="small" variant="contained" >Join</Button>
                }
            </div> 
        </div>
        ))}
        
        
        
    </div>
  )
}

export default Group