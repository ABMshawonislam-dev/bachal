import React, { useEffect, useState } from 'react'
import profile from "../assets/profile.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set,push,remove } from "firebase/database";
import { getAuth } from "firebase/auth";
const UserList = () => {
    const db = getDatabase();
    const auth = getAuth();
    let [userList,setUserList] = useState([])
    let [friendRequest,setFriendRequest] = useState([])


    useEffect(()=>{
        const usersRef = ref(db, 'friendrequest/');
            onValue(usersRef, (snapshot) => {
                let arr = []
            snapshot.forEach(item=>{
                arr.push(item.val().whoreceiveid+item.val().whosendid)
             })
             setFriendRequest(arr)
        });
    },[])

    useEffect(()=>{
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            let arr = []
        snapshot.forEach(item=>{
            arr.push({...item.val(),id:item.key})
        })

        setUserList(arr)
        
        });


  
    },[])



    let handlefriendRequest = (item)=>{

         set(push(ref(db, 'friendrequest/')), {
            whosendid: auth.currentUser.uid,
            whosendname: auth.currentUser.displayName,
            whoreceiveid:item.id,
            whoreceivename: item.username
        });
    }

    let handleCancel = (item)=>{
        console.log(item.id)

        remove(ref(db, 'friendrequest/'+item.id))
    }



  return (
    <div className='box'>
    <h3 >User List</h3>

    {userList.map(item=>(
        <div className="list">
                <div className="img">
                    <img src={profile}/>
                </div>
                <div className="details">
                    <h4>{item.username}</h4>
                    <p>{item.email}</p>
                </div>
                <div className="button">
                    {friendRequest.includes(item.id+auth.currentUser.uid)
                    ?
                      <Button onClick={()=>handleCancel(item)} size="small" variant="contained">cancel</Button>
                    :
                      <Button onClick={()=>handlefriendRequest(item)} size="small" variant="contained">+</Button>
                    }
                  
                </div> 
            </div>
    ))}
    
   
    
</div>
  )
}

export default UserList