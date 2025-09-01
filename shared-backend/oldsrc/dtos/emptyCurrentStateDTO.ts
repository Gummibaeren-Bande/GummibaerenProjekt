import EntityObserver from "../api/group-set/interfaces/EntityObserver";
import GroupSet from "../entities/GroupSet";
import TaskSet from "../entities/TaskSet";
import CurrentStateDTO from "./CurrentStateDTO";

class DummyObserver implements EntityObserver {
  update() {
    throw new Error("Not implemented");
  }
}

const emptyCurrentStateDTO: CurrentStateDTO = new CurrentStateDTO(
  new GroupSet(new DummyObserver()),
  new TaskSet(),
);

export default emptyCurrentStateDTO;
