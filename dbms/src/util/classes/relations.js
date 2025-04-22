import { MarkerType } from "@xyflow/react";



const relationStyle = {
    "many-to-many":{
        markerEnd:{type:null},
        style:{strokeWidth:2}
    },
    "one-to-many":{
        markerEnd:{type:MarkerType.ArrowClosed,},
        style:{ strokeWidth:2}
    },
    "constraint-m-to-m":{
        markerEnd:{type:null},
        style:{ strokeWidth:5}
    },
    "constraint-o-to-m":{
        markerEnd:{type:MarkerType.ArrowClosed,},
        style:{ strokeWidth:5}
    }

}




export {relationStyle}