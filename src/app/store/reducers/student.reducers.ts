import { EStudentActions, StudentActions } from "../actions/student.actions";
import { initialStudentState, IStudentState } from "../state/student.state";

export function studentReducers (state: IStudentState = initialStudentState, action: StudentActions): IStudentState {
  switch (action.type) {
    case EStudentActions.GetStudentsSuccess: {
      return {
        ...state,
        students: action.payload,
        count: action.payload.length
      };
    }
    case EStudentActions.GetStudentSuccess: {
      return {
        ...state,
        selectedStudent: action.payload
      };
    }
    case EStudentActions.CreateStudentsSuccess: {
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
    case EStudentActions.UpdateStudentSuccess: {
      state.students.forEach(student => {
        if (student._id === action.payload._id) {
          student = {
            ...action.payload.data
          };
        }
      });
      return {
        ...state,
      };
    }
    case EStudentActions.UpdateRecordBookSuccess: {
      state.students.find(student => {
        if (student._id === action.payload._id) {
          student.recordBook = action.payload.data;
        }
      });
      return {
        ...state
      };
    }
    case EStudentActions.ResetDataStudents: {
      return {
        students: null,
        selectedStudent: null,
        count: null
      };
    }
    default: {
      return state;
    }
  }
}
