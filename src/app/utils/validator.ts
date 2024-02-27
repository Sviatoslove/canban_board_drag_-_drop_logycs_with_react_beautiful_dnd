
export const validatorConfig = {
  columnName: {
    isRequired: {
      message: 'Обязательно для заполнения',
    },
    min: {
      message: 'Длина поля не менее 2 символов',
      length:'2'
    },
  },
  colorBadge: {
    isRequired: {
      message: 'Чтобы продолжить выберите цвет',
    },
  },
  colorText: {
    isRequired: {
      message: 'Чтобы продолжить выберите цвет',
    },
  },
  title: {
    isRequired: {
      message: 'Обязательно для заполнения',
    },
    min: {
      message: 'Длина поля не менее 2 символов',
      length:'2'
    },
  },
}