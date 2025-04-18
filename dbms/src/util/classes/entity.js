

class EntityClass {
  id
  name;
  attr = [];
  primary_key;
  relations = [];
  fKeys = [];
  type

  constructor(id,name,type="strong") {
    this.id = id
    this.name = name;
    this.type = type
  }


  pushAttributes(attr){
    this.attr.push(attr)
  }

  pushRelations(reltn){
    this.relations.push(reltn)
  }

  get id(){
    return this.id
  }

  get name() {
    return this._name;
  }

  // Setter for name
  set name(newName) {
    this._name = newName;
  }

  get type(){
    return this.type
  }

  set type(newType){
    this.type = newType
  }

  // Getter for attr
  get attr() {
    return this.attr;
  }

  // Setter for attr

  set attr (newAttr) {
    this.attr = newAttr;
  }

  // Getter for primaryKeys
  get primaryKeys() {
    return this._primaryKeys;
  }

  // Setter for primaryKeys
  set primaryKeys(newPrimaryKeys) {
    this._primaryKeys = newPrimaryKeys;
  }

  // Getter for relations
  get relations() {
    return this.relations;
  }

  // Setter for relations
  set relations(newRelations) {
    this.relations = newRelations;
  }

  // Getter for fKeys
  get fKeys() {
    return this.fKeys;
  }

  // Setter for fKeys
  set fKeys(newFKeys) {
    this.fKeys = newFKeys;
  }

  // Getter for typeOfEntity
  get typeOfEntity() {
    return this.typeOfEntity;
  }

  // Setter for typeOfEntity
  set typeOfEntity(newTypeOfEntity) {
    this.typeOfEntity = newTypeOfEntity;
  }
}

export default EntityClass
