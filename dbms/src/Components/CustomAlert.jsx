import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const CustomAlert = ({open,handleAlert,severity,msg}) => {
  return (
    <Snackbar open={open} onClose={handleAlert} autoHideDuration={5000}>
        <Alert variant='outlined' sx={{bgcolor:"background.paper",width:"100%",textAlign:"center"}} severity={severity} >
            {msg}
        </Alert>
    </Snackbar>
  )
}

export default CustomAlert