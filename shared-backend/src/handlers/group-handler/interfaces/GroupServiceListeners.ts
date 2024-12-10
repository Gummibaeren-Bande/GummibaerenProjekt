import IoSocket from "../../../types/IoSocket";

interface GroupServiceListeners {
    addGroup: (name: string, callback: (response: { success: boolean; message: string }) => void) => boolean;
}

export default GroupServiceListeners