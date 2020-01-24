import { EStudentActions, StudentActions } from "../actions/student.actions";
import { initialStudentState, IStudentState } from "../state/student.state";

export const studentReducers = (state: IStudentState = initialStudentState, action: StudentActions): IStudentState => {
  switch (action.type) {
    case EStudentActions.GetStudentsSuccess: {
      return {
        ...state,
        students: action.payload
      };
    }
    case EStudentActions.GetStudentSuccess: {
      return {
        ...state,
        selectedStudent: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
