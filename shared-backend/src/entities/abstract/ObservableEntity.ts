import EntityObserver from "../../api/group-set/interfaces/EntityObserver";

/**
 * an observable entity should implement this
 */
abstract class ObservableEntity {
  public subscriber: EntityObserver;

  constructor(subscriber: EntityObserver) {
    this.subscriber = subscriber;
  }

  /**
   * method to notify the subscriber
   */
  notifySubscriber() {
    this.subscriber.update();
  }
}

export default ObservableEntity;
