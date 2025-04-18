import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import React, { useMemo, useState } from "react";
import { relationStyle } from "../util/classes/relations";

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY,style,markerEnd, markerStart,data }) => {
  const { updateEdge } = useReactFlow();
  const [type,setType] = useState(data?.relation || "Many-to-Many")
  
  const types = useMemo(()=>["Many-to-Many","One-to-Many","Constraint-M-to-M","Constraint-O-to-M"])
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleChange = (event) => {
   
    setType(event.target.value)
    updateEdge(id,(edge)=>{
      edge.data.relation = event.target.value     
        edge = {...edge, ...relationStyle[event.target.value.toLowerCase()]}
        return edge
    })
    
  }
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} markerStart={markerStart} />
      <EdgeLabelRenderer>
        <FormControl sx={{minWidth:80,'& .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input':{padding:"5px"}}} style={{position:"absolute",transform:`translate(-50%,-50%)  translate(${labelX}px,${labelY}px)`,pointerEvents:"all"}}>
          <InputLabel id="demo-simple-select-label">Relation Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Relation Type"
            onChange={handleChange}
          >
            {types.map((value,index)=>{
                return <MenuItem key={index} value={value}>{value}</MenuItem>
            })}
          </Select>
        </FormControl>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
