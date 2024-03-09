import { IDefaultState } from '../components/ui/forms/settingsForm';

interface IToastSettings {
  [x: string]: IDefaultState;
}

export const toastSettings: IToastSettings = {
  addColumn: {
    title: 'Была создана новая колонка и задача!',
  },
  addTask: {
    title: 'Была добавлена новая задача!',
    description: 'Теперь есть к чему стремиться',
  },
  addColumnAuto: {
    title: 'Была создана новая колонка!',
  },
  editColumn: {
    title: 'Колонка была изменена!',
  },
  editColumnTitle: {
    title: 'Заголовок колонки успешно изменен!',
  },
  editTaskTitle: {
    title: 'Заголовок задачи успешно изменен!',
  },
  removeColumn: {
    title: 'Колонка и все её задачи успешно удалены!',
    status: 'warning'
  },
};
