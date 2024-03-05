import { createSlice } from '@reduxjs/toolkit';
import { IDefaultState } from '../components/ui/forms/settingsForm';
import { IColumn, IColumns } from '../utils/types';
import { AppDispatch, RootState } from './createStore';
import { tasksService } from '../services/tasks.service';
import { title } from 'process';

interface initialStateStore {
  entities: IColumns | {};
  isLoading: boolean;
  error: IDefaultState | null;
  dataLoaded: boolean;
}

const initialState: initialStateStore = {
  entities: {},
  isLoading: false,
  error: null,
  dataLoaded: false,
};

export const counterSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    columnsRequested: (state) => {
      state.isLoading = true;
    },
    columnsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    columnsRequestedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    columnAdded: (state, action) => {
      const { payload } = action;
      if (!Object.values(state.entities))
        state.entities = { [payload.id]: payload };
      else {
        if (Object.values(state.entities).length + 1 > +payload.id) {
          const arr = Object.values(state.entities);
          arr.splice(payload.id - 1, 0, payload);
          state.entities = arr.reduce(
            (acc, item, idx) =>
              (acc = {
                ...acc,
                [(idx + 1).toString()]: {
                  ...item,
                  id: (idx + 1).toString(),
                  title: item.title.includes(`column`)
                    ? `column ${idx + 1}`
                    : item.title,
                },
              }),
            {}
          );
        } else state.entities = { ...state.entities, [payload.id]: payload };
      }
      state.isLoading = false;
      state.dataLoaded = true;
    },
    columnEdited: (state, action) => {
      const { payload } = action;
      state.entities = { ...state.entities, [payload.id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
    },
    taskAdded: (state, action) => {
      const { payload } = action;
      state.entities = { ...state.entities, [payload.id]: payload };
      state.isLoading = false;
      state.dataLoaded = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer: columnsReducer, actions } = counterSlice;
export const {
  columnsRequested,
  columnsReceived,
  columnsRequestedFailed,
  columnAdded,
  columnEdited,
  taskAdded,
} = actions;

export const saveColumns =
  (payload: IColumns) => async (dispatch: AppDispatch) => {
    dispatch(columnsRequested());
    try {
      const data = await tasksService.create(payload);
      dispatch(columnsReceived(data));
    } catch (error) {
      dispatch(columnsRequestedFailed(error));
    }
  };

export const addColumn =
  (payload: IColumn) => async (dispatch: AppDispatch) => {
    dispatch(columnsRequested());
    try {
      const data = await tasksService.create(payload);
      dispatch(columnAdded(data));
    } catch (error) {
      dispatch(columnsRequestedFailed(error));
    }
  };

export const editColumn =
  (payload: { id?: string; title: string }) =>
  async (dispatch: AppDispatch) => {
    dispatch(columnsRequested());
    try {
      const data = await tasksService.create(payload);
      dispatch(columnEdited(data));
    } catch (error) {
      dispatch(columnsRequestedFailed(error));
    }
  };

export const addTask = (payload: IColumn) => async (dispatch: AppDispatch) => {
  dispatch(columnsRequested());
  try {
    const data = await tasksService.create(payload);
    dispatch(taskAdded(data));
  } catch (error) {
    dispatch(columnsRequestedFailed(error));
  }
};

export const selectColumns = () => (state: RootState) => state.entities;
export const selectIsLoading = () => (state: RootState) => state.isLoading;
export const selectDataLoaded = () => (state: RootState) => state.dataLoaded;

export default columnsReducer;
