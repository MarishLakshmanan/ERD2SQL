import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Handle, Position, useReactFlow } from '@xyflow/react'
import React, { useState } from 'react'

const typeStyles = {
  "normal":"",
  "primary-key":"underline",
  "candidate-key":"underline decoration-dashed"
}

const Attribute = ({data,id}) => {
  const {updateNode} = useReactFlow()
  const [type,setType] = useState(data?.type || "Normal")
  const types = ["Normal","Primary-Key","Candidate-Key"]
  const [style,setStyle] = useState("")
  const handleChange = (event)=>{
    setType(event.target.value)
    setStyle(typeStyles[event.target.value.toLowerCase()])
    updateNode(id,((node)=>{
      node.data.type = event.target.value
      return node
    }))
  }
  return (
    <Box className="rounded-[50%] border-1 border-black bg-white py-[10px] px-[20px] shadow-xl flex gap-4 items-center min-w-[100px] h-[60px]">
        <Typography variant='body1' className={style}>{data.label}</Typography>
        <FormControl sx={{minWidth:80,'& .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{padding:"5px"}}} className='nodrag'>
          <InputLabel id="demo-simple-select-label2"  >Type</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            {types.map((value,index)=>{
                return <MenuItem key={index} style={{pointerEvents:"all"}} value={value}>{value}</MenuItem>
            })}
          </Select>
        </FormControl>
        <Handle type='source' position={Position.Bottom} id={"a-a"} isConnectable={(connections) => connections.length < 1} />
    </Box>
  )
}

export default Attribute