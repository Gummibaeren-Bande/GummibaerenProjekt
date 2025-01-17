import GroupSetDTO from "../../../dtos/GroupSetDTO";

interface TeacherEmitServiceEmits {
    stateChanged: () => GroupSetDTO;
}

export default TeacherEmitServiceEmits;