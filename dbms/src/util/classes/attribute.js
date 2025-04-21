

class AttributeClass{
    id;
    name;
    primaryKey = false;
    type; // Data type

    constructor(id,name,primary_key,type){
        this.id = id;
        this.name = name;
        this.primaryKey = primary_key;
        this.type = type;
    }

}

export default AttributeClass