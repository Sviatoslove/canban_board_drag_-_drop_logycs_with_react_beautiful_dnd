import { IColumn, IColumns } from '../utils/types';
import COLUMNS from '../mockData/localStorageMockData.json'


export const tasksService = {
  get: () =>
    new Promise((resolve) => {
      window.setTimeout(function () {
        const data: any = COLUMNS.columns
        resolve(data);
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
