import { Box, Button } from "@mui/material";
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import React from "react";
import { Relation } from "./Relation";
import { v4 as uuidv4 } from "uuid";
import Entity from "./Entity";
import Attribute from "./Attribute";
import CustomDailog from "./CustomDialog";
import CustomAlert from "./CustomAlert";
import CustomEdge from "./CustomEdge";
import { mock } from "../util/classes/mock";
import EntityClass from "../util/classes/entity";
import { RelationClass } from "../util/classes/relation";
import AttributeClass from "../util/classes/attribute";

const nodeTypes = {
  relation: Relation,
  entity: Entity,
  attribute: Attribute,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = mock.nodes

const initialEdges = mock.edges

const getType = (handle) => {
  let source
  switch (handle[0]) {
    case "a":
      source = "attribute";
      break;
    case "r":
      source = "relation";
      break;
    case "e":
      source = "entity";
  }
  return source
}

const generatEdge = 
  (source_id, target_id, sourceHandle, targetHandle) => {
    let source = getType(sourceHandle)
    let target = getType(targetHandle)
    const edge = {
      id: `${source_id}-${target_id}`,
      source: source_id,
      target: target_id,
      data: { source: source, target: target, relation:"Many-to-Many" },
      type: "customEdge",
      style:{strokeWidth:2},
      markerEnd:{},
      sourceHandle:sourceHandle,
      targetHandle:targetHandle
    };
    return edge;
  };

  const generateNode = (id, data, type) => {
    const node = {
      id: id,
      data: { label: data, type:"Normal" },
      type: type,
      position: { x: 0, y: 0 },
    };
    console.log(node);
    return node;
  };



const ERD = () => {
  // const initialEdges = [];
  // const initialNodes = [];



  

  
  const [nodes, setNodes] = useState(initialNodes)
  const [edges, setEdges] = useState(initialEdges);
  const [modal, setModal] = useState(false);
  const [label, setLabel] = useState("");
  const [cb, setCallback] = useState();
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [severity, setSeverity] = useState("");
  
  

  
  

  const addNodes = useCallback((id, label, type) => {
    const node = generateNode(id, label, type);
    setNodes((prev) => {
      return [...prev, node];
    });
  }, []);

  const triggerModal = useCallback((label, cbb) => {
    setCallback(() => cbb);
    setLabel(label);
    setModal(true);
  }, []);

  const triggerAlert = useCallback((severity, msg) => {
    setSeverity(severity);
    setAlertMsg(msg);
    setAlert(true);
  });

  const handleAlert = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback((params) => {
    let edge = params
    if(params.sourceHandle[0]!=="a"){
      edge = generatEdge(params.source,params.target,params.sourceHandle,params.targetHandle)
    }else{
      console.log(edge);
      edge.data = {source:getType(params.sourceHandle),target:getType(params.targetHandle)}
    }
    setEdges((eds) => addEdge(edge, eds));
  }, []);

  const addRelations = useCallback((name) => {
    let id = uuidv4();
    addNodes(id, name, "relation");
  });

  const addEntity = useCallback((name) => {
    let id = uuidv4();
    addNodes(id, name, "entity");
    // id = uuidv4();
    // addNodes(id, pk, "attribute");
  }, []);

  const addAttributes = useCallback( (name) => {
    let id = uuidv4();
    addNodes(id, name, "attribute");
  });


  function generateEntityObject(node){
    const entity = new EntityClass(node.id,node.data.label,node.data.type)
    return entity
  }

  function generatRelationObject(node){
    const relation = new RelationClass(node.id,node.data.label,node.data.type)
    return relation
  }
  function generatAttributeObject(node){
    const attribute = new AttributeClass(node.id,node.data.label,node.data.type)
    return attribute
  }

  const handleGenerate = useCallback(()=>{

    console.log(nodes.length,edges.length);
    
    
    const Entities = {}
    const Relations = {}
    const Attributes = {}

    nodes.forEach((node)=>{
      if(node.type === "entity") Entities[node.id] = generateEntityObject(node)
      if(node.type === "relation") Relations[node.id] = generatRelationObject(node)
      if(node.type === "attribute") Attributes[node.id] = generatAttributeObject(node)
    })
    
    
    for(const edge of edges){
      const source = edge.data.source
      const target = edge.data.target
      // console.log(`${source} => ${target}`);
      if(source == "attribute" && target == "entity"){
        if(Attributes[edge.source].type == "Primary-Key"){
          if(!Entities[edge.target].primary_key){
            Entities[edge.target].primary_key = edge.source
          }else{
            console.error("More than one primary key not allowed for an Entity");
            triggerAlert("warning","More than one primary key not allowed for an Entity")
            return
          }
          
        }
        Entities[edge.target].attr.push(Attributes[edge.source])
      }
      if(source == "attribute" && target == "relation"){
        Relations[edge.target].attr.push(Attributes[edge.source])
      }
      if(source == "entity" && target == "relation"){   
        let relations  = {source:edge.source,target:edge.target,relation:edge.data.relation}
        if( Relations[edge.target].relation.length < 2 ){
          Relations[edge.target].relation.push(relations)
        }else{
          console.error("A Relation can have only two Entities related to it");
          triggerAlert("warning","A Relation can have only two Entities related to it")
          return
        }
        let temp  = {...Relations[edge.target],relation:edge.data.relation}
        Entities[edge.source].relations.push(temp)
      }
    }

    let temp  = Object.values(Relations)
    for (const x of temp){
      if(x.relation.length != 2){
        triggerAlert("error","A relation should have two Entities connected to it")
        console.error("A relation should have two Entities connected to it");
        return
      }
    }

    if(edges.length != (nodes.length-1)){
      triggerAlert("error","There's some unconnected node in your diagram, Please make sure everything is connected")
      console.error("There's some unconnected node in your diagram, Please make sure everything is connected");
      return
    }

    console.log(Entities);
    console.log(Relations);
    
    
    

  },[nodes,edges])

  return (
    <Box className="w-full h-screen grid grid-cols-[350px_1fr] bg-brand-light">
      <Box className="border flex flex-col justify-center items-stretch gap-2 p-2">
        <Button
        variant="outlined"
          onClick={() => {
            triggerModal("Relation", addRelations);
          }}
        >
          {" "}
          Add Relation{" "}
        </Button>
        <Button
          onClick={() => {
            triggerModal("Entity", addEntity);
          }}
          variant="outlined"
        >
          {" "}
          Add Entity{" "}
        </Button>
        <Button
          onClick={() => {
            triggerModal("Attribute", addAttributes);
          }}
          variant="outlined"
        >
          {" "}
          Add Attribute{" "}
        </Button>
        <Button
         onClick={handleGenerate}
          variant="contained"
        >
          {" "}
          Generate{" "}
        </Button>
      </Box>
      <Box className="border w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onEdgesChange={onEdgesChange}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Background bgColor="#F9FFE9" />
          <Controls />
        </ReactFlow>
      </Box>
      <CustomDailog
        triggerAlert={triggerAlert}
        label={label}
        isOpen={modal}
        setOpen={setModal}
        cb={cb}
      />
      <CustomAlert
        msg={alertMsg}
        open={alert}
        handleAlert={handleAlert}
        severity={severity}
      />
    </Box>
  );
};

export default ERD;

// const initialNodes = [
//   {
//     id: "1", // required
//     position: { x: 0, y: 0 }, // required
//     data: { label: "Hello" }, // required
//     type: "textUpdater",
//   },

//   {
//     id: "2", // required
//     position: { x: 100, y: 100 }, // required
//     data: { label: "Hello 2" }, // required
//   },
// ];

// const initialEdges = [
//   { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
// ];
