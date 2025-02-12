import GroupSet from "../../entities/GroupSet";
import CallbackSuccess from "../../types/callback-types/CallbackSuccess";
import IoSocket from "../../types/IoSocket";
import TaskService from "../task/TaskService";
import TeacherEmitsService from "../teacher-emits/TeacherEmitsService";
import GroupSetServiceListeners from "./interfaces/GroupSetServiceListeners";
import EntityObserver from "./interfaces/EntityObserver";
import CallbackSuccessDTO from "../../dtos/CallbackDTOs/CallbackSuccessDTO";

class GroupSetService implements GroupSetServiceListeners, EntityObserver {
  private readonly MIN_LENGTH_NAME = 3;
  private readonly MAX_LENGTH_NAME = 20;
  private readonly VALID_CHARACTER_REGEX = /^[A-Za-zäöüÄÖÜß0-9\s]+$/;
  private readonly groupSet: GroupSet;
  private readonly taskService: TaskService;
  private readonly teachersEmitsService: TeacherEmitsService;

  constructor(
    taskService: TaskService,
    teachersEmitsService: TeacherEmitsService,
  ) {
    this.taskService = taskService;
    this.teachersEmitsService = teachersEmitsService;
    this.groupSet = new GroupSet(this);
    console.log("Group Set service was successfully started");
  }

  public getGroupSet(): GroupSet {
    return this.groupSet;
  }

  public update(): void {
    this.teachersEmitsService.emitChangedGroupSetToAllSockets(
      this.groupSet,
      this.taskService.getTaskSet(),
    );
  }

  /**
   * ask the server to send an emit of the current state to all teacher frontends
   *
   * @param callback calls back if the operation was successful or not
   */
  requestCurrentState(callback: CallbackSuccess): void {
    try {
      this.update();
    } catch {
      callback(new CallbackSuccessDTO(false, "Etwas ist schief gelaufen."));
    }
    callback(new CallbackSuccessDTO(true, "Anfrage erfolgreich"));
  }

  /**
   * tries to add a new group, with a unique given group name
   *
   * @param name the given group name
   * @param callback calls back if the operation was successful or not
   */
  addGroup(name: string, callback: CallbackSuccess, socket?: IoSocket): void {
    if (!socket) {
      callback(
        new CallbackSuccessDTO(false, "Socket konnte nicht gefunden werden!"),
      );
      return;
    }
    if (!this.validateGroupName(name, callback)) {
      return;
    }
    const successful = this.groupSet.addNewGroup(
      name,
      socket,
      this.taskService.getTaskSet(),
    );

    if (!successful) {
      callback(
        new CallbackSuccessDTO(
          false,
          `Eine Gruppe mit dem Namen "${name}" existiert bereits. Bitte wählt einen anderen Namen`,
        ),
      );
      return;
    }
    callback(
      new CallbackSuccessDTO(
        true,
        `Die Gruppe "${name}" wurde erfolgreich erstellt`,
      ),
    );
  }

  /**
   * tries to add the current socket to a existing group, with the given group name
   *
   * @param name the given group name
   * @param callback calls back if the operation was successful or not
   */
  reconnectToGroup(
    name: string,
    callback: CallbackSuccess,
    socket?: IoSocket,
  ): void {
    if (!socket) {
      callback(
        new CallbackSuccessDTO(false, "Socket konnte nicht gefunden werden!"),
      );
      return;
    }
    const group = this.getGroupSet().getGroupByName(name);
    if (!group) {
      callback(
        new CallbackSuccessDTO(false, `Die Gruppe "${name}" existiert nicht.`),
      );
      return;
    }
    if (group.hasAssignedSocket()) {
      callback(
        new CallbackSuccessDTO(
          false,
          `Die Gruppe "${name}" ist bereits auf einem Gerät eingeloggt. Bitte schließe zunächst das Browserfenster auf diesem Gerät.`,
        ),
      );
      return;
    }
    group.setAssignedSocket(socket);
    callback(
      new CallbackSuccessDTO(
        true,
        `Erfolgreich als existierendes Teams "${name}" eingeloggt.`,
      ),
    );
  }

  /**
   * Validates the provided group name based on several rules. if the group name is invalid,
   * an according callback is sent.
   *
   * @param {string} name - The group name to validate.
   * @returns {boolean} - Returns `true` if the name is valid, otherwise `false`.
   */
  private validateGroupName(name: string, callback: CallbackSuccess): boolean {
    if (this.isEmpty(name)) {
      callback(
        new CallbackSuccessDTO(false, "Der Teamname darf nicht leer sein!"),
      );
      return false;
    } else if (this.isNotRequiredLength(name)) {
      callback(
        new CallbackSuccessDTO(
          false,
          `Der Teamname muss zwischen ${this.MIN_LENGTH_NAME} und ${this.MAX_LENGTH_NAME} Zeichen lang sein!`,
        ),
      );
      return false;
    } else if (this.startsWithSpace(name)) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Der Teamname darf nicht mit einem Leerzeichen beginnen!",
        ),
      );
      return false;
    } else if (this.endsWithSpace(name)) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Der Teamname darf nicht mit einem Leerzeichen enden!",
        ),
      );
      return false;
    } else if (this.hasIllegalCharacters(name)) {
      callback(
        new CallbackSuccessDTO(
          false,
          "Der Teamname darf nur aus Buchstaben, Leerzeichen und Zahlen bestehen!",
        ),
      );
      return false;
    }
    return true;
  }

  /**
   * Checks if the provided text is empty.
   * @param {string} text - The text to check.
   * @returns {boolean} - Returns `true` if the text is empty, otherwise `false`.
   */
  private isEmpty(text: string): boolean {
    return text === null || text.length === 0;
  }

  /**
   * Checks if the provided text is not within the required length range.
   * @param {string} text - The text to check.
   * @returns {boolean} - Returns `true` if the text is too short or too long, otherwise `false`.
   */
  private isNotRequiredLength(text: string): boolean {
    const length = text.length;
    return length < this.MIN_LENGTH_NAME || length > this.MAX_LENGTH_NAME;
  }

  /**
   * Checks if the provided text starts with a space.
   * @param {string} text - The text to check.
   * @returns {boolean} - Returns `true` if the text starts with a space, otherwise `false`.
   */
  private startsWithSpace(text: string): boolean {
    return text.startsWith(" ");
  }

  /**
   * Checks if the provided text ends with a space.
   * @param {string} text - The text to check.
   * @returns {boolean} - Returns `true` if the text ends with a space, otherwise `false`.
   */
  private endsWithSpace(text: string): boolean {
    return text.endsWith(" ");
  }

  /**
   * Checks if the provided text contains illegal characters.
   * @param {string} text - The text to check.
   * @returns {boolean} - Returns `true` if the text contains illegal characters, otherwise `false`.
   */
  private hasIllegalCharacters(text: string): boolean {
    const validCharacterRegex = this.VALID_CHARACTER_REGEX;
    return !validCharacterRegex.test(text);
  }
}

export default GroupSetService;
