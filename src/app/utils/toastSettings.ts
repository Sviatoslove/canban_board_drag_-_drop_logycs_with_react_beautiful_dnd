import { IDefaultState } from "../components/ui/forms/settingsForm"

interface IToastSettings {
  [x:string]: IDefaultState
}

export const toastSettings: IToastSettings = {
  addColumn: {
    title: 'Была создана новая колонка и задача!',
    description: 'Попробуйте добавить ещё задач.',
  },
  addTask: {
    title: 'Была добавлена новая задача!',
    description: 'Теперь есть к чему стремиться',
  },
  addColumnAuto: {
    title: 'Была создана новая колонка!',
    description: 'Попробуйте добавить ещё задач.',
  }
}