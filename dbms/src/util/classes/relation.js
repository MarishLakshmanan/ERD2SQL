class RelationClass{
    id;
    name;
    attrs = [];
    entities = [];
    mandatory = [];
    many = [];
    weak = false;

    constructor(id,name,is_weak){
        this.id = id;
        this.name = name;
        this.weak = is_weak;
    }
}

export default RelationClass