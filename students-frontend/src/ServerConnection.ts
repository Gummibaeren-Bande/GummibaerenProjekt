import { io, Socket } from 'socket.io-client'
import CallbackSuccessDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackSuccessDTO'
import type CallbackExerciseDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackExerciseDTO'
import type CallbackNumberDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackNumberDTO'

class ServerConnection {
  socket: Socket

  /**
   * Creats a new serverConnectio to the server.
   */
  constructor() {
    this.socket = io('http://localhost:3000/students')
    this.connect()
  }

  private connect() {
    this.socket.on('connect', () => {
      console.log(`connected to socket id ${this.socket.id}`)
    })
  }

  /**
   * Authenticates the group by sending the group name to the server.
   * @param {string} name - The name of the group to authenticate.
   * @returns {Promise<boolean>} - Returns CallbackSuccesDTO with the reults of the Server.
   */
  async authentificateGroup(name: string): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit('addGroup', name, (response: CallbackSuccessDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * Authenticates the group by sending the group name to the server.
   * @param {string} name - The name of the group to authenticate.
   * @returns {Promise<boolean>} - Returns CallbackSuccesDTO with the reults of the Server.
   */
  async reconnectToGroup(name: string): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      this.socket.emit('reconnectToGroup', name, (response: CallbackSuccessDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * Sends the given answer to the server and return a CallbackSucces withe the info if the
   * answer was right or false.
   * @param groupName name of the group.
   * @param exerciseId Id of the current Exercise.
   * @param answer given answer by the User.
   * @returns a CallbackSucces.
   */
  async answerCurrentExcercise(
    groupName: String,
    exerciseId: String,
    answer: Number | Number[],
  ): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      console.log('Sende Antwort: ' + answer)
      this.socket.emit(
        'answerCurrentExcercise',
        groupName,
        exerciseId,
        answer,
        (response: CallbackSuccessDTO) => {
          console.log(response.message)
          resolve(response)
        },
      )
    })
  }

  /**
   * Request the Current exercise frome the server. Returns the answer from the server
   * in an CalbackExerciseDTO.
   * @param groupName the name of the group.
   * @returns the current Exercise.
   */
  async getCurrentExcerciceOfGroup(groupName: String): Promise<CallbackExerciseDTO> {
    return new Promise((resolve) => {
      this.socket.emit('getCurrentExcerciceOfGroup', groupName, (response: CallbackExerciseDTO) => {
        resolve(response)
      })
    })
  }

  /**
   * Requests the Curren Number of soved Exercises by a group.
   * @param groupName the name of the group.
   * @returns a CallbackNumberDTO with the number of solved Questions.
   */
  async getNumberOfFinishedTasks(groupName: String): Promise<CallbackNumberDTO> {
    return new Promise((resolve) => {
      console.log('Anfrage an server zur anzahl gelöster Aufgaben von Gruppe: ' + groupName)
      this.socket.emit('getNumberOfFinishedTasks', groupName, (response: CallbackNumberDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * Request the next exercise from the Server.
   * @param groupName the name of the group.
   * @returns the reasult of the Request. (The next Exercise if it was a succes)
   */
  async getNextExerciceOfGroup(groupName: String): Promise<CallbackExerciseDTO> {
    return new Promise((resolve) => {
      console.log('Anfrage nach nächster Aufgabe.')
      this.socket.emit('getNextExerciceOfGroup', groupName, (response: CallbackExerciseDTO) => {
        console.log(response.message)
        resolve(response)
      })
    })
  }

  // We shall over come bekanntes christliches
  // Kinder lieder (Detlef Jöker)
}

export default ServerConnection
