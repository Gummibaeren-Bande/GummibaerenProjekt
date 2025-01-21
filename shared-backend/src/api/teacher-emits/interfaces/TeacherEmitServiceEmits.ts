import GroupSetDTO from "../../../dtos/GroupSetDTO";

interface TeacherEmitServiceEmits {
  stateChanged: (groupSet: GroupSetDTO) => GroupSetDTO;
}

export default TeacherEmitServiceEmits;
