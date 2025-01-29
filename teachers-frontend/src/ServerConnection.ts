import { io, Socket } from 'socket.io-client'
import CallbackSuccessDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackSuccessDTO'
import CurrentStateDTO from '../../shared-backend/src/dtos/CurrentStateDTO'

class ServerConnection {
  socket: Socket

  /**
   * Creates a new ServerConnection
   */
  constructor() {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/teachers'
    console.log('Connecting to Server: ' + serverUrl)
    this.socket = io(serverUrl)
    this.connect()
  }

  /**
   * Connects to the Server.
   */
  private connect() {
    this.socket.on('connect', () => {
      console.log(`connected to socket id ${this.socket.id}`)
    })
  }

  /**
   * defines the listener with the action as a callback
   *
   * @param callback the callback that should be carried out on server update.
   */
  public onServerUpdateDo(callback: (groupSet: CurrentStateDTO) => void) {
    this.socket.on('stateChanged', callback)
  }

  /**
   * Request the server to send an emit of the current state
   * @returns {Promise<CallbackSuccessDTO>} - Returns CallbackSuccesDTO with the reults of the Server.
   */
  async requestCurrentState(): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit('requestCurrentState', (response: CallbackSuccessDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * sets a specific task as skipped by id and group name
   *
   * @param taskId the id of the task to set as skipped
   * @param groupName the name of the group to skip the task for
   * @returns a CallbackSucces
   */
  async skipTask(taskId: string, groupName: string): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit('skipTask', taskId, groupName, (response: CallbackSuccessDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * revert the skiped marking of the task with the given id for the given group.
   *
   * @param taskId the id of the task to unskip
   * @param groupName the name of the group to unskip the task for
   */
  revertTaskSkip(taskId: string, groupName: string): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit('revertTaskSkip', taskId, groupName, (response: CallbackSuccessDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * chooses an alternative exercise for the task id and given group name.
   *
   * @param taskId the id of the task to change the exercise for
   * @param groupName the name of the group for which the change should occur
   * @param exerciseId the id of the new exercise
   * @returns a CallbackSucces
   */
  async chooseAlternativForTask(
    taskId: string,
    groupName: string,
    exerciseId: string,
  ): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit(
        'chooseAlternativForTask',
        taskId,
        groupName,
        exerciseId,
        (response: CallbackSuccessDTO) => {
          console.log(response.message)
          resolve(response)
        },
      )
    })
  }
}

export default ServerConnection
