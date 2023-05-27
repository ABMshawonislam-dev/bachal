import React, { useState } from 'react'
import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import registrationimg from "../assets/registrationimg.png"
import Headingforreglog from '../components/headingforreglog';
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
import { useNavigate,Link } from 'react-router-dom';
import {RiEyeFill,RiEyeCloseFill} from "react-icons/ri"

let initialValues = {
  email: "",
  fullName: "",
  password: "",
  loading: false,
  error: "",
  eye: false,
}

const Registration = () => {

  const auth = getAuth();

  let navigate = useNavigate()

  let [values,setValues] = useState(initialValues)

  let handleValues = (e)=>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })

  }

  let handleSubmit = ()=>{

    

    let {email,fullName,password}= values

    if(!email){
      setValues({
        ...values,
        error: "Enter an email"
      })
      return
    }

    if(!fullName){
      setValues({
        ...values,
        error: "Enter an name"
      })
      return
    }

    if(!password){
      setValues({
        ...values,
        error: "Enter an password"
      })
      return
    }

    setValues({
      ...values,
      loading: true
    })
    createUserWithEmailAndPassword(auth,email,password).then((user)=>{
      console.log(user)
      sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log("Email Send")
  });
      setValues({
        email: "",
        fullName: "",
        password: "",
        loading: false
      })
      navigate("/login")
    })  

    
  }


  return (
   
 
     <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className='regContainer'>
            <Headingforreglog className="headingreglog" title="Get started with easily register"/>
            <p>Free register and you can enjoy it</p>
            <div className='regInput'>
                <TextField value={values.email} onChange={handleValues} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
                {values.error.includes("email") && <Alert severity="error">{values.error}</Alert>}
                
            </div>
            <div className='regInput'>
             <TextField value={values.fullName} onChange={handleValues} name="fullName" id="outlined-basic" label="Full Name" variant="outlined" />
             {values.error.includes("name") && <Alert severity="error">{values.error}</Alert>}
            </div>
            <div className='regInput'>
                <TextField value={values.password} type={values.eye ? 'text':'password'} onChange={handleValues} name="password" id="outlined-basic" label="Password" variant="outlined" />
                {values.error.includes("password") && <Alert severity="error">{values.error}</Alert>}
                <div onClick={()=>setValues({...values,eye:!values.eye})} className='eye'>
                  {values.eye
                  ?
                  <RiEyeFill/>
                  :
                  <RiEyeCloseFill/>
                  }
                
                
                </div>
                
            </div>

            <Alert severity="info" style={{marginBottom: "20px"}}>
             Alredy Have An Account? <strong><Link to="/login">Login</Link></strong>
            </Alert>


            {values.loading
            ?
            <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
            :
            <Button onClick={handleSubmit} variant="contained">Sign up</Button>
            }
           
            
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className='regiimg' src={registrationimg}/>
        </Grid>
      </Grid>

  )
}

export default Registration