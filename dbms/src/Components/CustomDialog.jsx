import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef } from "react";

const CustomDailog = ({ triggerAlert,label, isOpen, setOpen, cb }) => {
  const inputRef = useRef(null)
  function handleSubmit(e) {
    const target = document.getElementById("modal-name-input");
    if(target.value?.trim()===""){
        console.log("please enter something");
        triggerAlert("warning","You can't leave the field empty")
        return
    }

    // if(label === "Entity"){
    //   let target2 =  document.getElementById("modal-pk-input");
    //   console.log(target2.value);
    //   if(target2.value?.trim()===""){
    //     console.log("please enter something");
    //     triggerAlert("warning","You can't leave the field empty")
    //     return
    //   }
    //   cb(target.value.trim(),target2.value.trim())
    //   setOpen(false)
    //   return

    // }

    cb(target.value.trim()) 
    setOpen(false)
  }

  useEffect(()=>{
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0);
    }
  },[isOpen])

  function handleKeyDown (e){
    if(e.key == "Enter"){
      handleSubmit()
    }
    
  }
  return (
    
    <Modal
      open={isOpen}
      onClose={() => {
        setOpen(false);
      }}
     
      
    >
      <Paper>
        <Box className="center-abs bg-white flex flex-col p-10 gap-4 rounded-2xl">
          <Typography  variant="h2">{`Please enter a name for ${label}`}</Typography>
          <TextField
            id="modal-name-input"
            variant="outlined"
            label="Enter a name"
            inputRef={inputRef}
            onKeyUp={handleKeyDown}
          />
          {/* {label == "Entity" &&
          <TextField
            id="modal-pk-input"
            variant="outlined"
            label="Enter a name for Primary key"
          />} */}
          
          <Button  onClick={handleSubmit} variant="contained">
            Enter
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CustomDailog;
