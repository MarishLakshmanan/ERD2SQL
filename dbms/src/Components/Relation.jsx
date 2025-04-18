import { Handle, Position, useReactFlow } from "@xyflow/react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";

const handleStyle = { left: 10 };

function Relation({ id, data }) {
  const { updateNode } = useReactFlow();
  const [type, setType] = useState(data.type || "Normal");
  const types = ["Normal", "Weak"];

  const handleChange = (event) => {
    setType(event.target.value);
    updateNode(id, (node) => {
      node.data.type = event.target.value;
      return node;
    });
  };

  return (
    <Box
      className={` bg-white rotate-45 ${
        type === "Normal" ? "border-1" : "border-4"
      }  border-black shadow-xl  flex items-center aspect-square scale-[0.7]`}
    >
      <Handle
        type="target"
        position={Position.Top}
        id={"r-a"}
        style={{
          top: 0,
          left: 0,
          width: "10px",
          height: "10px",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Box className="flex p-1 rotate-[-45deg] gap-4 items-center">
        <Typography variant="body1">{data.label}</Typography>
        <FormControl
          sx={{
            minWidth: 80,
            "& .css-w76bbz-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              { padding: "5px" },
          }}
          className="nodrag"
        >
          <InputLabel id="demo-simple-select-label2">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select2"
            value={type}
            label="Type"
            onChange={handleChange}
          >
            {types.map((value, index) => {
              return (
                <MenuItem
                  key={index}
                  sx={{ pointerEvents: "all" }}
                  value={value}
                >
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Handle
        type="target"
        position={Position.Bottom}
        id={"r-b"}
        style={{
          bottom: 0,
          left: 0,
          width: "10px",
          height: "10px",
          transform: "translate(-50%, 50%)",
        }}
      />
       <Handle
        type="target"
        position={Position.Right}
        id={"r-c"}
        style={{
          width:"10px",
          height:"10px",
          top:0,
          right:0
        }}
      />
    </Box>
  );
}

export { Relation };
