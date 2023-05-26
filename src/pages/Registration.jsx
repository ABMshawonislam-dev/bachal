import React from 'react'
import {Grid,TextField,Button} from '@mui/material';
import registrationimg from "../assets/registrationimg.png"
import Headingforreglog from '../components/headingforreglog';

const Registration = () => {
  return (
   
 
     <Grid container spacing={2}>
        <Grid item xs={6}>
          <div className='regContainer'>
            <Headingforreglog className="headingreglog" title="Get started with easily register"/>
            <p>Free register and you can enjoy it</p>
            <div className='regInput'>
                <TextField id="outlined-basic" label="Email Address" variant="outlined" />
            </div>
            <div className='regInput'>
             <TextField id="outlined-basic" label="Full Name" variant="outlined" />
            </div>
            <div className='regInput'>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
            </div>

            <Button variant="contained">Sign up</Button>
          </div>
        </Grid>
        <Grid item xs={6}>
          <img className='regiimg' src={registrationimg}/>
        </Grid>
      </Grid>

  )
}

export default Registration