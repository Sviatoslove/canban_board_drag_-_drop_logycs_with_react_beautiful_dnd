import getRandomNum from '../utils/getRandomNum';
import { IColumn, IColumns, ITask } from '../utils/types';
import localStorageService from './localStorage.service';

export const tasksService = {
  get: () =>
    new Promise((resolve) => {
      window.setTimeout(function () {
        resolve(localStorageService.getColumns());
      }, 500);
    }),
  create: function (
    payload: IColumn | IColumns | { id?: string; title: string }
  ) {
    return new Promise((resolve) => {
      window.setTimeout(function () {
        resolve(payload);
      }, 0);
    });
  },
};
