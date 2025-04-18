import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { useState } from "react";
import { Handle, Position, useReactFlow } from '@xyflow/react'
import React from 'react'

const Entity = ({id,data}) => {

  const {updateNode} = useReactFlow()
    const [type,setType] = useState(data?.type || "Normal")
    const types = ["Normal","Weak"]
  
    const handleChange = (event)=>{
      setType(event.target.value)
      updateNode(id,((node)=>{
        node.data.type = event.target.value
        return node
      }))
    }
  
  
  return (
    <Box className={` bg-white ${type==="Normal"?"border-1":"border-4"}  border-black shadow-xl flex p-4 gap-4 items-center min-w-[100px] h-[60px] `}>
        <Handle type='target' position={Position.Top} id={"e-a"}/>
        <Typography variant='body1'>{data.label}</Typography>
        <FormControl sx={{minWidth:80,'& .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{padding:"5px"}}} className='nodrag'>
            <InputLabel id="demo-simple-select-label2">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label2"
              id="demo-simple-select2"
              value={type}
              label="Type"
              onChange={handleChange}
            >
              {types.map((value,index)=>{
                  return <MenuItem key={index} sx={{pointerEvents:"all"}} value={value}>{value}</MenuItem>
              })}
            </Select>
          </FormControl>
        <Handle type='source' position={Position.Bottom} id={"e-b"}/>
    </Box>
  )
}

export default Entity