export interface IDefaultState {
  [key: string]: string;
}

export interface IFields {
  name: string;
  label: string;
  typeField: string;
  options?: IDefaultState[];
  placeholder?: string;
  titleList?: string;
}

export type DefaultStateFunc = ({
  colorBadge,
  colorText,
  completed,
}: {
  colorBadge: string;
  colorText: string;
  completed: string;
}) => {};

interface IFormSettings {
  [key: string]: {
    title: string;
    btnTitle: string;
    fields: IFields[];
    defaultState: IDefaultState | DefaultStateFunc;
  };
}

export const colorsBadge = [
  {
    name: 'Красный',
    value: 'red',
  },
  {
    name: 'Синий',
    value: 'blue',
  },
  {
    name: 'Тёмно-синий',
    value: 'darkblue',
  },
  {
    name: 'Розовый',
    value: 'pink',
  },
  {
    name: 'Фиолетовый',
    value: 'purple',
  },
  {
    name: 'Тёмно-красный',
    value: 'darkred',
  },
  {
    name: 'Оранжевый',
    value: 'orange',
  },
  {
    name: 'Зелёный',
    value: 'green',
  },
  {
    name: 'Тёмно-зелёный',
    value: 'darkgreen',
  },
  {
    name: 'Чёрный',
    value: 'black',
  },
  {
    name: 'Жёлтый',
    value: 'yellow',
  },
  {
    name: 'Тёмно-жёлтый',
    value: '#576a00',
  },
];

export const colorsText = [
  {
    name: 'Белый',
    value: 'white',
  },
  {
    name: 'Чёрный',
    value: 'black',
  },
  {
    name: 'Серый',
    value: 'grey',
  },
  {
    name: 'Красный',
    value: 'red',
  },
  {
    name: 'Синий',
    value: 'blue',
  },
  {
    name: 'Тёмно-синий',
    value: 'darkblue',
  },
  {
    name: 'Розовый',
    value: 'pink',
  },
  {
    name: 'Фиолетовый',
    value: 'purple',
  },
  {
    name: 'Тёмно-красный',
    value: 'darkred',
  },
  {
    name: 'Оранжевый',
    value: 'orange',
  },
  {
    name: 'Зелёный',
    value: 'green',
  },
  {
    name: 'Тёмно-зелёный',
    value: 'darkgreen',
  },
  {
    name: 'Жёлтый',
    value: 'yellow',
  },
  {
    name: 'Тёмно-жёлтый',
    value: '#576a00',
  },
];

const completed = [
  {
    name: 'Выполнено',
    value: 'true',
  },
  {
    name: 'Не выполнено',
    value: 'false',
  },
];

export const formSettings: IFormSettings = {
  addColumn: {
    title: 'Добавьте колонку и задачу',
    btnTitle: 'Добавить колонку и задачу',
    fields: [
      {
        name: 'columnName',
        label: 'Название колонки',
        typeField: 'textField',
      },
      {
        name: 'colorBadge',
        label: 'Стилизуй заголовок колонки',
        typeField: 'customSelectField',
        placeholder: 'Выбери цвет...',
        titleList: 'Выбери цвет фона заголовка...',
        options: colorsBadge,
      },
      {
        name: 'colorText',
        label: 'Выберите цвет текста заголовка колонки',
        typeField: 'customSelectField',
        placeholder: 'Выбери цвет...',
        titleList: 'Выбери цвет текста заголовка...',
        options: colorsText,
      },
      {
        name: 'completed',
        label: 'Задачи в этой колонке в стадии:',
        typeField: 'customSelectField',
        titleList: 'Выбери стадию...',
        options: completed,
      },
      {
        name: 'taskName',
        label: 'Название задачи',
        typeField: 'textField',
      },
    ],
    defaultState: {
      columnName: 'Pending',
      colorBadge: 'blue',
      colorText: 'yellow',
      taskName: 'I am new task',
      completed: 'false',
    },
  },
  addTask: {
    title: 'Добавьте новую задачу',
    btnTitle: 'Добавить задачу',
    fields: [
      {
        name: 'title',
        label: 'Название задачи',
        typeField: 'textField',
      },
    ],
    defaultState: {
      title: '',
    },
  },
  editColumn: {
    title: 'Изменение колонки',
    btnTitle: 'Изменить колонку',
    fields: [
      {
        name: 'colorBadge',
        label: 'Стилизуй заголовок колонки',
        typeField: 'customSelectField',
        placeholder: 'Выбери цвет...',
        titleList: 'Выбери цвет фона заголовка...',
        options: colorsBadge,
      },
      {
        name: 'colorText',
        label: 'Выберите цвет текста заголовка колонки',
        typeField: 'customSelectField',
        placeholder: 'Выбери цвет...',
        titleList: 'Выбери цвет текста заголовка...',
        options: colorsText,
      },
      {
        name: 'completed',
        label: 'Задачи в этой колонке в стадии:',
        typeField: 'customSelectField',
        titleList: 'Выбери стадию...',
        options: completed,
      },
    ],
    defaultState: (column) => {
      const { colorBadge, colorText, completed } = column;
      return { colorBadge, colorText, completed: completed.toString() };
    },
  },
  removeColumn: {
    title: 'Вы уверены, что хотите удалить колонку и все задачи, которые находятся в ней?',
    btnTitle: 'Удалить колонку',
    fields: [
    ],
    defaultState: {},
  },
};
