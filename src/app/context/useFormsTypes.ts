import { IDefaultState } from '../components/ui/forms/settingsForm';
import {
  EventClick,
  FuncVoid,
} from '../utils/types';
import { IFormsState } from '../hooks/useFormsData';

type IsOpen = boolean;

export interface IFormsProviderProps {
  children: React.ReactNode;
}

export type OnsubmitFunc = (data:IFormsState, columnId?:string) => void
export type HandleSubmitFunc = (onSubmit: OnsubmitFunc, columnId?:string) => (e: React.FormEvent) => void

export type OpeningForm = (e: EventClick, id?: string) => void;

export interface IFormsContext {
  isOpen: IsOpen;
  typeForm: IDefaultState;
  onClose: FuncVoid;
  openingForm: (e: EventClick, id?: string) => void;
  onToast: (type?: string) => void;
  onSubmit: OnsubmitFunc,
}
