import React, { useState } from 'react'
import {Grid,TextField,Button,Alert} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import registrationimg from "../assets/registrationimg.png"
import google from "../assets/google.png"
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import Headingforreglog from '../components/headingforreglog';
import { Link } from 'react-router-dom';

let initialValues = {
  email: "",
  password: "",
  loading: false
}

const Login = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  let [values,setValues] = useState(initialValues)


  let handleValues = (e)=>{
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })

  }

  let handleSubmit = ()=>{

    let {email,fullName,password}= values

    setValues({
      ...values,
      loading: true
    })
    signInWithEmailAndPassword(auth,email,password).then((user)=>{
      console.log(user)
      setValues({
        email: "",
   
        password: "",
        loading: false
      })
      console.log(user)
    })  

    
  }

  let handleGoogleLogin = ()=>{
    signInWithPopup(auth,provider).then((result) => {
      console.log(result)
    })
  }


  return (
   
 
     <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className='regContainer'>
            <Headingforreglog className="headingreglog" title="Login to your account!"/>
            <img onClick={handleGoogleLogin} className='google' src={google}/>
            <div className='regInput'>
                <TextField value={values.email} onChange={handleValues} name="email" id="outlined-basic" label="Email Address" variant="outlined" />
            </div>
            <div className='regInput'>
                <TextField value={values.password} onChange={handleValues} name="password" id="outlined-basic" label="Password" variant="outlined" />
            </div>

            <Alert severity="info" style={{marginBottom: "20px"}}>
             Don't Have An Account? <strong><Link to="/">Registraiton</Link></strong>
            </Alert>

            {values.loading
            ?
            <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
            :
            <Button onClick={handleSubmit} variant="contained">Login to Continue</Button>
            }
            
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className='regiimg' src={registrationimg}/>
        </Grid>
      </Grid>

  )
}

export default Login