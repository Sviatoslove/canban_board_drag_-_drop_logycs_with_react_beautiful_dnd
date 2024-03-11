import { IDefaultState } from '../components/ui/forms/settingsForm';
import { EventChange, EventClick, FuncVoid, IColumns, ITask, SetStateColumns } from '../utils/types';
import { IFormsState } from '../hooks/useFormsData';
import { MutableRefObject } from 'react';

type IsOpen = boolean;

export interface IFormsProviderProps {
  children: React.ReactNode;
}

export type OnsubmitFunc = (data: IFormsState, columnId?: string, taskId?: string) => void;
export type HandleSubmitFunc = (
  onSubmit: OnsubmitFunc,
  columnId?: string
) => (e: React.FormEvent) => void;

export type OpeningForm = (e: EventClick | EventChange, columnId?: string, taskId?: string) => void;

export interface IFormsContext {
  isOpen: IsOpen;
  typeForm: MutableRefObject<IDefaultState>;
  onClose: FuncVoid;
  openingForm: OpeningForm;
  onToast: (type?: string) => void;
  onSubmit: OnsubmitFunc;
  closeOnSelect: { [x: string]: boolean };
  setCloseOnSelect: any;
  updateColumns: IColumns;
  setUpdateColumns:SetStateColumns
  handleDragEnd: any
}
