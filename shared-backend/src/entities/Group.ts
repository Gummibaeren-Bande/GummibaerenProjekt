class Group {

    private readonly name: string;
    // TODO: add the real type of the class list
    private readonly taskList: any;

    
    constructor(name: string) {
        this.name = name;
        // TODO: initialize the task list
        this.taskList = null;
    }

    public getName() {
        return this.name;
    }
    
    /**
     * get the next task for this group
     */
    public nextTask(): any {
        throw new Error("Not implemented yet!")
    }
}

export default Group