class GroupService implements GroupServiceEmits, GroupServiceListeners {
    
    addGroup(name: string): void {
        console.log("added group with name " + name);
    }
    sendErrorMessage(): void {
        return
    }
}

export default GroupService