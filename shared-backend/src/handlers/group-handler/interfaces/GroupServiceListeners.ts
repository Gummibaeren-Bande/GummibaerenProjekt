interface GroupServiceListeners {
  addGroup: (
    name: string,
    callback: (response: { success: boolean; message: string }) => void,
  ) => void;
}

export default GroupServiceListeners;
