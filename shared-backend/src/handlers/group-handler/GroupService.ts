import GroupCollection from "../../entities/GroupCollection";
import IoSocket from "../../types/IoSocket";
import GroupServiceEmits from "./interfaces/GroupServiceEmits";
import GroupServiceListeners from "./interfaces/GroupServiceListeners";

class GroupService implements GroupServiceEmits, GroupServiceListeners {
    
    private readonly groupCollection: GroupCollection
    
    constructor() {
        this.groupCollection = new GroupCollection();
    }
    
    addGroup(name: string, callback: (response: { success: boolean; message: string }) => void): boolean {
        const successful = this.groupCollection.addNewGroup(name)
        
        if(!successful) {
            callback({ success: false, message: `Group "${name}" already exists.` });
            console.log("group with name " + name + " already exists");
            return false;
        }
        callback({ success: true, message: `Group "${name}" added successfully.` });
        console.log("added group with name " + name);
        return true;
    }

    groupAlreadyExists(): void {

    }
}

export default GroupService