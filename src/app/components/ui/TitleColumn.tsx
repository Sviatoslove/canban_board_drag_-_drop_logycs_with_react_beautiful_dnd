import { Badge, Flex, IconButton } from '@chakra-ui/react';
import Meetballs from './Meetballs';
import { EventClick, IColumn, IColumns, ITitleColumn } from '../../utils/types';
import CustomSelectField from './forms/CustomSelectField';
import { useAppDispatch, useAppSelector } from '../../store/createStore';
import {
  addColumn,
  renameColumn,
  selectColumns,
} from '../../store/columnsSlice';
import { colorsBadge } from './forms/settingsForm';
import getRandomNum from '../../utils/getRandomNum';
import { useForms } from '../../context/useForms';
import { useRef, useState } from 'react';
import TextField from './forms/TextField';
import { IStateProps, useFormsData } from '../../hooks/useFormsData';
import { validatorConfig } from '../../utils/validator';
import { OnsubmitFunc } from '../../context/useFormsTypes';
import { EditIcon, NotAllowedIcon } from '@chakra-ui/icons';
import EditableField from '../common/fields/EditableField';
import useRenameField from '../../hooks/useRenameField';

const badgeTitle = (colorBadge?: string, color?: string) => ({
  borderRadius: 15,
  bgColor: colorBadge,
  px: '15px',
  py: '2px',
  variant: 'solid',
  color: color,
  textTransform: 'none',
  cursor: 'default',
});

const TitleColumn = ({ colorBadge, title, color, columnId }: ITitleColumn) => {
  const {
    renameTitle,
    handleRename,
    refInput,
    register,
    handleSubmit,
    onSubmit,
    handleAddColumn
  } = useRenameField(title);
  
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} mb={'19px'}>
      {!renameTitle ? (
        <Badge
          sx={badgeTitle(colorBadge, color)}
          onClick={handleRename}
          style={{ cursor: 'text' }}
        >
          {title}
        </Badge>
      ) : (
        <EditableField
          name="columnName"
          variant="titleColumn"
          refDiv={refInput}
          columnId={columnId}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      )}
      <CustomSelectField
        icon={<Meetballs />}
        name="menuColumn"
        placeholder={null}
        options={[{ name: 'Добавить колонку', value: 'addColumnAuto' }]}
        onClick={() => handleAddColumn(columnId)}
        variant="titleColumn"
        wrapperStyles={{ m: '0px 3px 0 auto', w: 'fit-content' }}
        menuOption={true}
      />
    </Flex>
  );
};

export default TitleColumn;
