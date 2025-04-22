import {Box, Button, Typography} from "@mui/material";
import {addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow,} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, {useCallback, useState} from "react";
import {Relation} from "./Relation";
import {v4 as uuidv4} from "uuid";
import Entity from "./Entity";
import Attribute from "./Attribute";
import CustomDialog from "./CustomDialog";
import CustomAlert from "./CustomAlert";
import CustomEdge from "./CustomEdge";
import {mock} from "../util/classes/mock";
import EntityClass from "../util/classes/entity";
import RelationClass from "../util/classes/relation";
import AttributeClass from "../util/classes/attribute";
import SaveIcon from "@mui/icons-material/Save";
import generateSQL from "../util/converter.js";

// Passage of token from Flask to Node to Oracle
import { useEffect } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import EdgeClass from "../util/classes/edge.js";

const nodeTypes = {
  relation: Relation,
  entity: Entity,
  attribute: Attribute,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const initialNodes = mock.nodes;
const initialEdges = mock.edges;

const getType = (handle) => {
  let source;
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
  return source;
};

const generateEdge = (source_id, target_id, sourceHandle, targetHandle) => {
  let source = getType(sourceHandle);
  let target = getType(targetHandle);
  return {
    id: `${source_id}-${target_id}`,
    source: source_id,
    target: target_id,
    data: {source: source, target: target, relation: "Many-to-Many"},
    type: "customEdge",
    style: {strokeWidth: 2},
    markerEnd: {},
    sourceHandle: sourceHandle,
    targetHandle: targetHandle,
  };
};

const generateNode = (id, data, type) => {
  const node = {
    id: id,
    data: { label: data },
    type: type,
    position: { x: 0, y: 0 },
  };
  console.log(node);
  return node;
};

function generateEntityObject(node) {
  return new EntityClass(node.id, node.data.label, node.data?.weak);
}

function generateRelationObject(node) {
  return new RelationClass(node.id, node.data.label, node.data?.weak);
}
function generateAttributeObject(node) {
  return new AttributeClass(
      node.id,
      node.data.label,
      (node.data.type === "Primary-Key"),
      node.data.dataType
  );
}

function generateEdgeObject(edge){
  
  
  return new EdgeClass(edge.source,edge.target,edge.sourceHandle,edge.targetHandle,edge.data.source,edge.data.target,edge.many,edge.mandatory)
}

const ERD = ({id,savedNodes,savedEdges}) => {
  // const initialEdges = [];
  // const initialNodes = [];

  const [nodes, setNodes] = useState((savedNodes)?savedNodes : initialNodes);
  const [edges, setEdges] = useState((savedEdges)?savedEdges: initialEdges);
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
    let edge = params;
    if (params.sourceHandle[0] !== "a") {
      edge = generateEdge(
        params.source,
        params.target,
        params.sourceHandle,
        params.targetHandle
      );
    } else {
      console.log(edge);
      edge.data = {
        source: getType(params.sourceHandle),
        target: getType(params.targetHandle),
      };
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

  const addAttributes = useCallback((name) => {
    let id = uuidv4();
    addNodes(id, name, "attribute");
  });

  const handleGenerate = useCallback(() => {
    console.log(nodes.length, edges.length);

    const Entities = new Map();
    const Relations = new Map();
    const Attributes = new Map();
    const Edges = new Map();

    if (edges.length !== nodes.length - 1) {
      console.error(
          "There are unconnected nodes in your diagram, Please make sure everything is connected"
      );
      triggerAlert(
          "warning",
          "There are unconnected nodes in your diagram, Please make sure everything is connected"
      );
      return;
    }

    nodes.forEach((node) => {
      if (node.type === "entity")
        Entities.set(node.id, generateEntityObject(node));
      if (node.type === "relation")
        Relations.set(node.id, generateRelationObject(node));
      if (node.type === "attribute")
        Attributes.set(node.id, generateAttributeObject(node));
    });


    // generateEdgeObject(edges[0])



    // console.log(Entities);
    // console.log(Relations);
    // console.log(Attributes);
    

    // try {
    //   generateSQL(Entities, Attributes, Relations, edges);
    // } catch (e) {
    //   console.error(e);
    //   triggerAlert("warning", e);
    // }

    // for (const edge of edges) {
    //   const source = edge.source.id;
    //   const target = edge.data.target;
    //   // console.log(`${source} => ${target}`);
    //   if (source === "attribute" && target === "entity") {
    //     if (Attributes[edge.source].type === "Primary-Key") {
    //       if (!Entities[edge.target].primary_key) {
    //         Entities[edge.target].primary_key = edge.source;
    //       } else {
    //         console.error(
    //           "More than one primary key not allowed for an Entity"
    //         );
    //         triggerAlert(
    //           "warning",
    //           "More than one primary key not allowed for an Entity"
    //         );
    //         return;
    //       }
    //     }
    //     Entities[edge.target].attrs.push(Attributes[edge.source]);
    //   }
    //   if (source === "attribute" && target === "relation") {
    //     Relations[edge.target].attrs.push(Attributes[edge.source]);
    //   }
    //   if (source === "entity" && target === "relation") {
    //     let relations = {
    //       source: edge.source,
    //       target: edge.target,
    //       relation: edge.data.relation,
    //     };
    //     if (Relations[edge.target].relation.length < 2) {
    //       Relations[edge.target].relation.push(relations);
    //     } else {
    //       console.error("A Relation can have only two Entities related to it");
    //       triggerAlert(
    //         "warning",
    //         "A Relation can have only two Entities related to it"
    //       );
    //       return;
    //     }
    //     let temp = { ...Relations[edge.target], relation: edge.data.relation };
    //     Entities[edge.source].relations.push(temp);
    //   }
    // }
    //
    // let temp = Object.values(Relations);
    // for (const x of temp) {
    //   if (x.relation.length !== 2) {
    //     triggerAlert(
    //       "error",
    //       "A relation should have two Entities connected to it"
    //     );
    //     console.error("A relation should have two Entities connected to it");
    //     return;
    //   }
    // }
    //
    // console.log(Entities);
    // console.log(Relations);
  }, [nodes, edges]);

  const [searchParams] = useSearchParams();
    useEffect(() => {
      const token = searchParams.get('token');
      if (token) {
        localStorage.setItem('jwt', token); // or use a global auth context
        console.log("Token received:", token);
      }
    }, [searchParams]);
    
  const handleSave = useCallback(() => {
    const url = "http://127.0.0.1:5000/api/create-diagram";
    const token = localStorage.getItem('jwt');
    const data = {
      id:(id) ? id : uuidv4(),
      nodes: nodes,
      edges: edges,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    };
    console.log(data);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Success:", responseData);
        triggerAlert("success","ERD Diagram Saved")
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

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
        <Button onClick={handleGenerate} variant="contained">
          {" "}
          Generate{" "}
        </Button>
        <Button onClick={() => window.location.href = 'http://localhost:5000/logout'} variant="contained">
          {" "}
          Log Out{" "}
        </Button>
      </Box>
      <Box className="border w-full h-full relative">
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
        <Button
          sx={{ position: "absolute" }}
          className="top-[10px] right-[10px] z-100"
          onClick={handleSave}
          variant="contained"
          endIcon={<SaveIcon />}
        >
          <Typography variant="body1" sx={{ color: "white" }}>
            {" "}
            Save{" "}
          </Typography>
        </Button>
      </Box>
      <CustomDialog
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
