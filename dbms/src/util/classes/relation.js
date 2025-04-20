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

  //   pushAttr(attr){
  //       this.attr.push(attr)
  //   }
  //
  //    // Getter for id
  // get id() {
  //   return this.id;
  // }
  //
  // // Getter for name
  // get name() {
  //   return this.name;
  // }
  //
  // // Setter for name
  // set name(newName) {
  //   this.name = newName;
  // }
  //
  // // Getter for attr
  // get attr() {
  //   return this.attr;
  // }
  //
  // // Setter for attr
  // set attr(newattr) {
  //   this.attr = newattr;
  // }
  //
  // get type(){
  //   return this.type
  // }

}

export default RelationClass