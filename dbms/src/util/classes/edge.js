class EdgeClass {
    source = {}
    target = {}
    many;
    mandatory;

    constructor(sourceId, targetId, sourceName, targetName, sourceType, targetType, many=false, mandatory=false) {
        this.source.id = sourceId;
        this.target.id = targetId;
        this.source.name = sourceName;
        this.target.name = targetName;
        this.source.type = sourceType;
        this.target.type = targetType;
        this.target.id = targetId;
        this.many = many;
        this.mandatory = mandatory;
    }
}

export default EdgeClass;
