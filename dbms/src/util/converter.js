import AttributeClass from "./classes/attribute";
import EntityClass from "./classes/entity.js";
import RelationClass from "./classes/relation.js";

function generateSQL(nodes, edges) {
    const entities = new Map();
    const relations = new Map();
    const attributes = new Map();

    nodes.forEach((node) => {
        if (node.type === "entity")
            entities[node.id] = new EntityClass(node.id, node.data.label, node.data.type);
        if (node.type === "relation")
            relations[node.id] = new RelationClass(node.id, node.data.label, node.data.type);
        if (node.type === "attribute")
            attributes[node.id] = new AttributeClass(node.id, node.data.label, node.data.type);
    });

    for (const edge of edges) {
        const source = edge.data.source;
        const target = edge.data.target;
        // console.log(`${source} => ${target}`);
        if (source === "attribute" && target === "entity") {
            if (attributes[edge.source].type === "Primary-Key") {
                if (!entities[edge.target].primary_key) {
                    entities[edge.target].primary_key = edge.source;
                } else {
                    console.error(
                        "More than one primary key not allowed for an Entity"
                    );
                   throw "More than one primary key not allowed for an Entity";
                }
            }
            entities[edge.target].attr.push(attributes[edge.source]);
        }
        if (source === "attribute" && target === "relation") {
            relations[edge.target].attr.push(attributes[edge.source]);
        }
        if (source === "entity" && target === "relation") {
            let relations = {
                source: edge.source,
                target: edge.target,
                relation: edge.data.relation,
            };
            if (relations[edge.target].relation.length < 2) {
                relations[edge.target].relation.push(relations);
            } else {
                console.error("A Relation can have only two Entities related to it");
                throw "A Relation can have only two Entities related to it"
            }
            let temp = { ...relations[edge.target], relation: edge.data.relation };
            entities[edge.source].relations.push(temp);
        }
    }

    let temp = Object.values(relations);
    for (const x of temp) {
        if (x.relation.length !== 2) {
            console.error("A relation should have two Entities connected to it");
            throw "A relation should have two Entities connected to it";
        }
    }

    if (edges.length !== nodes.length - 1) {
        console.error(
            "There are unconnected nodes in your diagram, Please make sure everything is connected"
        );
        throw "There are unconnected nodes in your diagram, Please make sure everything is connected";
    }
}

// CREATE TABLE {{name}} (
// {{attr}} {{value}} PRIMARY KEY,
// {{attr}} {{value}}
//
// );