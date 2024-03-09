import localStorageService from "../services/localStorage.service";
import { IColumn, SetStateColumns } from "./types";

export const updateStateAndLocalSt = (setState: SetStateColumns, data?: IColumn, store?:any) => {
  if(store){
    setState!(store)
    localStorageService.setColumns(store);
  } else setState!((prev: any) => {
    const newData = { ...prev, [data!.id]: data }
    localStorageService.setColumns(newData);
    return newData;
  });
}