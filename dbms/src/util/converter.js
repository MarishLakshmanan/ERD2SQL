import AttributeClass from "./classes/attribute";
import EntityClass, {ForeignKey} from "./classes/entity.js";
import RelationClass from "./classes/relation.js";
import relation from "./classes/relation.js";

function handleForeignKey(foreignKey) {
    let sql = "";
    let fKeyStmt = "";
    const foreignKeys = [];
    for (const attr of foreignKey.entity.attrs) {
        if (attr.primaryKey) {
            foreignKeys.push(attr.name);
            sql += `,\n  ${foreignKey.entity.name}_${attr.name} ${attr.type}`;
            if (foreignKey.mandatory) {
                sql += " NOT NULL";
            }
            if (foreignKey.unique) {
                sql += " UNIQUE";
            }
        }
    }
    fKeyStmt += `,\n  FOREIGN KEY (${foreignKey.entity.name}_${foreignKeys[0]}`;
    for (const key of foreignKeys.slice(1)) {
        fKeyStmt += `, ${foreignKey.entity.name}_${key}`;
    }
    fKeyStmt += `) REFERENCES ${foreignKey.entity.name.toUpperCase()} (${foreignKeys[0]}`;
    for (const key of foreignKeys.slice(1)) {
        fKeyStmt += `, ${key}`;
    }
    fKeyStmt += ")";
    return {sql, fKeyStmt, foreignKeys};
}

function generateSQL(entities, attributes, relations, edges) {
    // const entities = new Map();
    // const relations = new Map();
    // const attributes = new Map();

    // nodes.forEach((node) => {
    //     if (node.type === "entity")
    //         entities[node.id] = new EntityClass(node.id, node.data.label, node.data.type);
    //     if (node.type === "relation")
    //         relations[node.id] = new RelationClass(node.id, node.data.label, node.data.type);
    //     if (node.type === "attribute")
    //         attributes[node.id] = new AttributeClass(node.id, node.data.label, node.data.type);
    // });

    for (const edge of edges) {
        const source = edge.source.type;
        const target = edge.target.type;
        if (source === "attribute" && target === "entity") {
            entities.get(edge.target.id).attrs.push(attributes.get(edge.source.id));
        } else if (source === "entity" && target === "attribute") {
            entities.get(edge.source.id).attrs.push(attributes.get(edge.target.id));
        } else if (source === "attribute" && target === "relation") {
            relations.get(edge.target.id).attrs.push(attributes.get(edge.source.id));
        } else if (source === "relation" && target === "attribute") {
            relations.get(edge.source.id).attrs.push(attributes.get(edge.target.id));
        } else if (source === "entity" && target === "relation") {
            const entity = entities.get(edge.source.id);
            const relation = relations.get(edge.target.id);
            if (relation.entities.length < 2) {
                relation.entities.push(entity);
                relation.mandatory.push(edge.mandatory);
                relation.many.push(edge.many);
            } else {
                throw `Relations can only relate two entities (${relation.name})`;
            }
        } else if (source === "relation" && target === "entity") {
            const entity = entities.get(edge.target.id);
            const relation = relations.get(edge.source.id);
            if (relation.entities.length < 2) {
                relation.entities.push(entity);
                relation.mandatory.push(edge.mandatory);
                relation.many.push(edge.many);
            } else {
                throw `Relations can only relate two entities (${relation.name})`;
            }
        }
    }

    // Conditions for a relation edge to be considered identifying: singular, mandatory, connects to a weak entity
    for (const relation of relations) {
        if (relation.entities.length !== 2) {
            throw `Relations need to relate two entities (${relation.name})`;
        }

        if (relation.many[0] && relation.many[1]) {
            if (relation.weak) {
                throw `Many-to-many relations can't be weak (${relation.name})`;
            }
            // if (relation.entities[0].weak || relation.entities[1].weak) {
            //     throw `Many-to-many relations can't have weak entities (${relation.name})`;
            // }
            const new_entity = new EntityClass(relation.id, relation.name);
            new_entity.attrs = relation.attrs;
            new_entity.foreignKeys = [
                new ForeignKey(relation.entities[0]),
                new ForeignKey(relation.entities[1])
            ];
            entities.set(relation.id, new_entity);
        } else if (relation.many[0] && !relation.many[1]) {
            if (relation.weak) {
                if (relation.entities[0].weak) {
                    throw `Weak entities must be x-to-one (${relation.entities[0].name})`;
                }
                if (!relation.entities[1].weak || !relation.mandatory[1]) {
                    throw `Weak relations must define a weak entity (${relation.name})`;
                }
                // entities[0] is not weak, entities[1] is weak; identifying relationship of entities[1]
                if (entities[1].identifyingEntity !== undefined) {
                    throw `Entities can not have two identifying relationships ${entities[1].name}`;
                }
                relation.entities[1].attrs.push(relation.attrs);
                relation.entities[1].identifyingEntity = new ForeignKey(relation.entities[0], true);
            } else {
                relation.entities[1].attrs.push(relation.attrs);
                relation.entities[1].foreignKeys.push(new ForeignKey(relation.entities[0], relation.mandatory[0]));
            }
        } else if (!relation.many[0] && relation.many[1]) {
            if (relation.weak) {
                if (relation.entities[1].weak) {
                    throw `Weak entities must be x-to-one (${relation.entities[1].name})`;
                }
                if (!relation.entities[0].weak || !relation.mandatory[0]) {
                    throw `Weak relations must define a weak entity (${relation.name})`;
                }
                // entities[0] is weak, entities[1] is not weak; identifying relationship of entities[0]
                if (entities[0].identifyingEntity !== undefined) {
                    throw `Entities can not have two identifying relationships ${entities[0].name}`;
                }
                relation.entities[0].attrs.push(relation.attrs);
                relation.entities[0].identifyingEntity = new ForeignKey(relation.entities[1], true);
            } else {
                relation.entities[0].attrs.push(relation.attrs);
                relation.entities[0].foreignKeys.push(new ForeignKey(relation.entities[1], relation.mandatory[1]));
            }
        } else { // one-to-one
            if (relation.mandatory[0] && relation.mandatory[1]) {
                if (relation.weak) {
                    if (relation.entities[0].weak && relation.entities[1].weak) {
                        throw `Weak relations can not define two weak entities (${relation.name})`;
                    } else if (relation.entities[0].weak && !relation.entities[1].weak) { // Identifying relation to entities[0]
                        if (entities[0].identifyingEntity !== undefined) {
                            throw `Entities can not have two identifying relationships ${entities[0].name}`;
                        }
                        relation.entities[0].attrs.push(relation.attrs);
                        relation.entities[0].identifyingEntity = new ForeignKey(relation.entities[1], true, true);
                        relation.entities[0].identifyingEntityUnique = true;
                    } else if (!relation.entities[0].weak && relation.entities[1].weak) { // Identifying relation to entities[1]
                        if (entities[1].identifyingEntity !== undefined) {
                            throw `Entities can not have two identifying relationships ${entities[1].name}`;
                        }
                        relation.entities[1].attrs.push(relation.attrs);
                        relation.entities[1].identifyingEntity = new ForeignKey(relation.entities[0], true, true);
                    } else { // neither entity is weak
                        throw `Weak relations must define a weak entity (${relation.name})`;
                    }
                } else {
                    // Maybe ask user? pick left
                    relation.entities[0].attrs.push(relation.attrs);
                    relation.entities[0].foreignKeys.push(new ForeignKey(relation.entities[1], true, true));
                }
            } else if (relation.mandatory[0] && !relation.mandatory[1]) {
                if (relation.weak) {
                    if (relation.entities[0].weak && relation.entities[1].weak) {
                        throw `Weak entities can not define weak entities (${relation.name})`;
                    } else if (relation.entities[0].weak) { // Identifying relation to entities[0]
                        if (entities[0].identifyingEntity !== undefined) {
                            throw `Entities can not have two identifying relationships ${entities[0].name}`;
                        }
                        relation.entities[0].attrs.push(relation.attrs);
                        relation.entities[0].identifyingEntity = new ForeignKey(relation.entities[1], true, true);
                    } else {
                        throw `Weak relations must define a weak entity (${relation.name})`;
                    }
                } else {
                    relation.entities[0].attrs.push(relation.attrs);
                    relation.entities[0].foreignKeys.push(new ForeignKey(relation.entities[1], true, true));
                }
            } else if (!relation.mandatory[0] && relation.mandatory[1]) {
                if (relation.weak) {
                    if (relation.entities[0].weak && relation.entities[1].weak) {
                        throw `Weak entities can not define weak entities (${relation.name})`;
                    } else if (relation.entities[1].weak) { // Identifying relation to entities[1]
                        if (entities[1].identifyingEntity !== undefined) {
                            throw `Entities can not have two identifying relationships ${entities[1].name}`;
                        }
                        relation.entities[1].attrs.push(relation.attrs);
                        relation.entities[1].identifyingEntity = new ForeignKey(relation.entities[0], true, true);
                    } else {
                        throw `Weak relations must define a weak entity (${relation.name})`;
                    }
                } else {
                    relation.entities[1].attrs.push(relation.attrs);
                    relation.entities[1].foreignKeys.push(new ForeignKey(relation.entities[0], true, true));
                }
            } else { // neither mandatory
                if (relation.weak) {
                    throw `Weak relations must define a weak entity (${relation.name})`;
                }
                // Maybe ask user? pick left
                relation.entities[0].attrs.push(relation.attrs);
                relation.entities[0].foreignKeys.push(new ForeignKey(relation.entities[1], false, true));
            }
        }
    }

    let sql = ""

    for (const entity of entities) {
        let fKeyStmt = "";
        const primaryKeys = [];
        sql += `CREATE TABLE ${entity.name.toUpperCase()}(\n`;
        sql += `  ${entity.attrs[0].name} ${entity.attrs[0].type}`;
        for (const attr of entity.attrs.slice(1)) {
            sql += `,\n  ${attr.name} ${attr.type},\n`;
            if (attr.primaryKey) {
                primaryKeys.push(attr.name);
            }
        }
        if (entity.weak) {
            const ret = handleForeignKey(entity.identifyingEntity);
            sql += ret.sql;
            fKeyStmt += ret.fKeyStmt;
            primaryKeys.push(ret.foreignKeys);
        }
        for (const foreignKey of entity.foreignKeys) {
            const ret = handleForeignKey(foreignKey);
            sql += ret.sql;
            fKeyStmt += ret.fKeyStmt;
        }
        sql += `,\n  PRIMARY KEY (${primaryKeys[0]}`
        for (const key in primaryKeys.slice(1)) {
            sql += `, ${key}`
        }
        sql += ")";
        sql += fKeyStmt;
        sql += "\n);\n";
    }
    return sql;

}

export default generateSQL;

// CREATE TABLE {{name}} (
// {{attr}} {{type}},
// {{attr}} {{type}},
// ...
// PRIMARY KEY ({{primary_keys}})
// FOREIGN KEY ({{attr}}) REFERENCES ({{table}}.{{attr}})
// );