class ForeignKey {
  entity;
  mandatory;
  unique;

  constructor(entity, mandatory=false, unique=false) {
    this.entity = entity;
    this.mandatory = mandatory;
    this.unique = unique;
  }
}

class EntityClass {
  id;
  name;
  attrs = [];
  identifyingEntity;
  foreignKeys = [];
  weak = false;

  constructor(id, name, is_weak=false) {
    this.id = id;
    this.name = name;
    this.weak = is_weak;
  }
}

export default EntityClass
export {ForeignKey};
