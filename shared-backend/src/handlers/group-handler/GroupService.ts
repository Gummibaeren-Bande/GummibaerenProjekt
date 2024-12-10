import GroupCollection from "../../entities/GroupCollection";
import IoSocket from "../../types/IoSocket";
import GroupServiceEmits from "./interfaces/GroupServiceEmits";
import GroupServiceListeners from "./interfaces/GroupServiceListeners";

class GroupService implements GroupServiceEmits, GroupServiceListeners {
  private readonly groupCollection: GroupCollection;

  constructor() {
    this.groupCollection = new GroupCollection();
  }

  addGroup(
    name: string,
    callback: (response: { success: boolean; message: string }) => void,
  ): void {
    const successful = this.groupCollection.addNewGroup(name);

    if (!successful) {
      callback({
        success: false,
        message: `Eine Gruppe mit dem Namen "${name}" existiert bereits. Bitte wählt einen anderen Namen`,
      });
      return;
    }
    callback({
      success: true,
      message: `Die Gruppe "${name}" wurde erfolgreich erstellt`,
    });
  }

  groupAlreadyExists(): void {}
}

export default GroupService;
