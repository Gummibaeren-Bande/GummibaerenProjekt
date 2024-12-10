import GroupCollection from "../../entities/GroupCollection";

class GroupService implements GroupServiceEmits, GroupServiceListeners {
    
    private readonly groupCollection: GroupCollection
    
    constructor() {
        this.groupCollection = new GroupCollection();
    }
    
    addGroup(name: string): void {
        const successful = this.groupCollection.addNewGroup(name)
        
        if(!successful) {
            console.log("group with name " + name + " already exists");
            return;
        }
        
        console.log("added group with name " + name);
    }
    groupAlreadyExists(): void {
        return
    }
}

export default GroupService