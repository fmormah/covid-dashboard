import { ThunkDispatch } from "@reduxjs/toolkit";

export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const SET_PAGINATION = 'SET_PAGINATION';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

export const SET_SORT_FIELD = 'SET_SORT_FIELD';
export const SET_SORT_DIRECTION = 'SET_SORT_DIRECTION';

export type Patient = {
  firstName: string;
  lastName: string;
  vaccineDate: number;
  vaccineType: string;
  nhsNumber: string;
  id: string;
};

export interface PatientState {
    data: Patient[] | null;
    patients: Patient[];
    pagination: number;
    currentPage: number;
    sortField: string;
    sortDirection: string;
}

export type FetchPatientsAction = {
  type: typeof FETCH_PATIENTS;
  payload: Patient[];
};

export type FetchPatientsError = {
  type: typeof FETCH_PATIENTS_ERROR;
  payload: string;
};

export type SetPaginationAction = {
  type: typeof SET_PAGINATION;
  payload: number;
};


export  type SetCurrentPageAction = {
    type: typeof SET_CURRENT_PAGE,
    payload: number,
};

export  type SetSortFieldAction = {
    type: typeof SET_SORT_FIELD,
    payload: string,
};

export  type SetSortDirectionAction = {
    type: typeof SET_SORT_DIRECTION,
    payload: string,
};


export type PatientAction = FetchPatientsAction | SetPaginationAction | SetCurrentPageAction | SetSortFieldAction | SetSortDirectionAction | FetchPatientsError;

export type RootState = {
  patients: PatientState;
};

export type DispatchType = ThunkDispatch<RootState, void, PatientAction>;


