import { io, Socket } from 'socket.io-client'
import CallbackSuccessDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackSuccessDTO'
import type CallbackExerciseDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackExerciseDTO'
import type CallbackNumberDTO from '../../shared-backend/src/dtos/CallbackDTOs/CallbackNumberDTO'
import Answer from '../../shared-backend/src/types/Answer'

class ServerConnection {
  socket: Socket

  /**
   * Creates a new ServerConnection
   */
  constructor() {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000/students'
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
   * Sends the given answer to the server and returns a CallbackSucces with that reflects wether the
   * answer was right or wrong.
   * @param groupName name of the group.
   * @param exerciseId Id of the current Exercise.
   * @param answer given answer by the User.
   * @returns a CallbackSucces.
   */
  async answerCurrentExercise(
    groupName: string,
    exerciseId: string,
    answer: Answer,
  ): Promise<CallbackSuccessDTO> {
    return new Promise((resolve) => {
      console.log('Sende Antwort: ' + answer)
      this.socket.emit(
        'answerCurrentExercise',
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
   * Request the Current exercise from the server. Returns the answer from the server
   * in a CallbackExerciseDTO.
   * @param groupName the name of the group.
   * @returns the current Exercise.
   */
  async getCurrentExerciseOfGroup(groupName: string): Promise<CallbackExerciseDTO> {
    return new Promise((resolve) => {
      console.log("Lade aktuelle Aufgabe.")
      this.socket.emit('getCurrentExerciseOfGroup', groupName, (response: CallbackExerciseDTO) => {
        resolve(response)
      })
    })
  }

  /**
   * Requests the Curren Number of soved Exercises by a group.
   * @param groupName the name of the group.
   * @returns a CallbackNumberDTO with the number of solved Questions.
   */
  async getNumberOfFinishedTasks(groupName: string): Promise<CallbackNumberDTO> {
    return new Promise((resolve) => {
      console.log(
        'Anfrage an den Server zur der Anzahl an gelösten Aufgaben von Gruppe: ' + groupName,
      )
      this.socket.emit('getNumberOfFinishedTasks', groupName, (response: CallbackNumberDTO) => {
        if (response.message !== "")
          console.log(response.message)
        resolve(response)
      })
    })
  }

  /**
   * Requests the next exercise from the Server.
   * @param groupName the name of the group.
   * @returns the result of the request.
   */
  async getNextExerciceOfGroup(groupName: string): Promise<CallbackExerciseDTO> {
    return new Promise((resolve) => {
      console.log('Anfrage nach nächster Aufgabe.')
      this.socket.emit('getNextExerciceOfGroup', groupName, (response: CallbackExerciseDTO) => {
        if (response.message !== "") 
          console.log(response.message)
        resolve(response)
      })
    })
  }
}

export default ServerConnection
