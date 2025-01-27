import CurrentStateDTO from "../../../dtos/CurrentStateDTO";

interface TeacherEmitServiceEmits {
  stateChanged: (groupSet: CurrentStateDTO) => CurrentStateDTO;
}

export default TeacherEmitServiceEmits;
