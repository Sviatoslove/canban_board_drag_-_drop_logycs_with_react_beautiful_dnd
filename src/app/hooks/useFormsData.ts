import { useState } from 'react';
import { EventChange } from '../utils/types';

export interface IFormsState {
  defaultState: {
    [x: string]: string;
  };
  errors: {
    [key: string]: {
      [key: string]: {
        [key: string]: string;
      };
    };
  };
}

export interface IStateProps {
  state: IFormsState;
}

export interface IErrors {
  fields: { [key: string]: string };
  isValid: boolean;
}

const useFormsData = ({ state }: IStateProps) => {
  const [data, setData] = useState<IFormsState>(state);
  const errors: IErrors = { fields: {}, isValid: false };

  const register = (field: string, label?: string) => ({
    name: field,
    value: data.defaultState[field],
    label,
    error: errors.fields[field],

    onChange: (e: EventChange) => {
      const { target }: any = e;
      return setData((prevState) => ({
        ...prevState,
        defaultState: { ...prevState.defaultState, [field]: target.value },
      }));
    },
  });

  const validate = (
    validateMethod: string,
    fieldName: string,
    value: string
  ) => {
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof value === 'boolean' && fieldName !== 'stayOn')
          errors.isValid = !value;
        else if (typeof value === 'string')
          errors.isValid = value.trim() === '';
        break;
      }
      case 'min': {
        errors.isValid =
          value.length < +data.errors[fieldName][validateMethod].length;
        break;
      }
      default:
        break;
    }
    if (errors.isValid && !errors.fields[fieldName])
      errors.fields[fieldName] = data.errors[fieldName][validateMethod].message;
  };

  for (const [fieldName, value] of Object.entries(data.defaultState)) {
    for (const validateMethod in data.errors[fieldName]) {
      validate(validateMethod, fieldName, value);
    }
  }

  const handleSubmit =
    (
      onSubmit: (data: IFormsState, columnId?: string, taskId?: string) => void,
      columnId?: string,
      taskId?: string
    ) =>
    (e: React.FormEvent) => {
      e.preventDefault();
      if (Object.values(errors.fields).length) return;
      onSubmit(data, columnId, taskId);
    };

  return { register, data, handleSubmit, errors };
};

export { useFormsData };
