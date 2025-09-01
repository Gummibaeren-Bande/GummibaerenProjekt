import CallbackSuccess from "../../../types/callback-types/CallbackSuccess";

interface GroupSetServiceListeners {
  /**
   * this listener adds a new group, with a unique given group name
   *
   * @param name the given group name
   * @param callback calls back if the operation was successful or not
   */
  addGroup: (name: string, callback: CallbackSuccess) => void;
  /**
   * this listener tries to add the current socket to a existing group, with the given group name
   *
   * @param name the given group name
   * @param callback calls back if the operation was successful or not
   */
  reconnectToGroup: (name: string, callback: CallbackSuccess) => void;

  /**
   * ask the server to send an emit of the current state to all teacher frontends
   *
   * @param callback calls back if the operation was successful or not
   */
  requestCurrentState: (callback: CallbackSuccess) => void;
}

export default GroupSetServiceListeners;
