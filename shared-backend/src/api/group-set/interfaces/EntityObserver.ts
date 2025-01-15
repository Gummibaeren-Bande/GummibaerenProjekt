interface EntityObserver {
  /**
   * this method should be called by the observable subject whenever relevant attributes are changed
   */
  update: () => void;
}

export default EntityObserver;
