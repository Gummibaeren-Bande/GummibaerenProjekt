// a data transferable object used for CallbackSuccess
class CallbackSuccessDTO {
  public readonly success: boolean;
  public readonly message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

export default CallbackSuccessDTO;
