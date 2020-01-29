import { EStudentActions, StudentActions } from "../actions/student.actions";
import { initialStudentState, IStudentState } from "../state/student.state";

export function studentReducers (state: IStudentState = initialStudentState, action: StudentActions): IStudentState {
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
    case EStudentActions.CreateStudentsSuccess: {
      state.students.push(action.payload);
      return {
        ...state,
      };
    }
    case EStudentActions.DeleteStudentSuccess: {
      return {
        ...state,
        students: state.students.filter(student => student._id !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
}
