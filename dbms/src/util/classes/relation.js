class RelationClass{
    id
    name
    attr = []
    relation = [] // This is the Type of constraints like Many-to-Many , One-to-Many
    type // This is the Type of the Relation like Noraml or Weak

    constructor(id,name,type="Normal"){
        this.id = id
        this.name = name
        this.type = type
        
    }

    pushAttr(attr){
        this.attr.push(attr)
    }

     // Getter for id
  get id() {
    return this._id;
  }

  // Getter for name
  get name() {
    return this._name;
  }

  // Setter for name
  set name(newName) {
    this._name = newName;
  }

  // Getter for attr
  get attr() {
    return this._attr;
  }

  // Setter for attr
  set attr(newattr) {
    this._attr = newattr;
  }

  get type(){
    return this.type
  }

}

export {RelationClass}