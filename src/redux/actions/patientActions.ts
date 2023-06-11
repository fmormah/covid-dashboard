import { FETCH_PATIENTS, FETCH_PATIENTS_ERROR, SET_PAGINATION, SET_CURRENT_PAGE, SET_SORT_FIELD, SET_SORT_DIRECTION, SetSortFieldAction, SetSortDirectionAction} from '../../types';
import { fetchFromAPI } from '../../api/api';
import { DispatchType, SetPaginationAction, SetCurrentPageAction } from '../../types/index';

export const fetchPatients = (searchTerm = '') => async (dispatch: DispatchType) => {
  const patients = await fetchFromAPI(searchTerm);
  
  if (patients === null) {
    dispatch({ type: FETCH_PATIENTS_ERROR, payload: 'Error fetching patients' });
  } else {
    dispatch({ type: FETCH_PATIENTS, payload: patients });
  }
};

export const setPagination = (pagination: number): SetPaginationAction => ({
  type: SET_PAGINATION,
  payload: pagination,
});

export const setCurrentPage = (currentPage: number): SetCurrentPageAction => {
    return {
      type: SET_CURRENT_PAGE,
      payload: currentPage,
    };
  };

  export const setSortField = (field: string): SetSortFieldAction => {
    return { type: SET_SORT_FIELD, payload: field };
  };
  
  export const setSortDirection = (direction: string): SetSortDirectionAction => {
    return { type: SET_SORT_DIRECTION, payload: direction };
  };