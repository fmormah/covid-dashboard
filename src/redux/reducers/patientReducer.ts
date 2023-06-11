import { FETCH_PATIENTS, FETCH_PATIENTS_ERROR, SET_PAGINATION, SET_CURRENT_PAGE, SET_SORT_FIELD, SET_SORT_DIRECTION } from '../../types';
import { PatientState, PatientAction} from '../../types/index';

const initialState: PatientState = {
    data: null,
    patients: [],
    pagination: 5,
    currentPage: 1,
    sortField: 'firstName', // default sort field
    sortDirection: 'asc', // default sort direction
  };

const patientReducer = (state = initialState, action: PatientAction): PatientState => {
   switch (action.type) {
    case FETCH_PATIENTS:
        return {
            ...state,
            data: action.payload,
            currentPage: 1,
          };
    case FETCH_PATIENTS_ERROR:
      return {
        ...state,
        data: null
      }
    case SET_PAGINATION:
      return { ...state, 
                pagination: action.payload,
                currentPage:1
            };
    case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        };
    case SET_SORT_FIELD:
      return {
        ...state,
        sortField: action.payload
      };

    case SET_SORT_DIRECTION:
      return {
        ...state,
        sortDirection: action.payload
      };
    default:
      return state;
  }
};

export default patientReducer;
