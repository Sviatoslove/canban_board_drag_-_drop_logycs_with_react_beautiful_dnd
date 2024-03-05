import { Badge, Flex } from '@chakra-ui/react';
import Meetballs from './Meetballs';
import { ITitleColumn } from '../../utils/types';
import CustomSelectField from './forms/CustomSelectField';
import EditableField from '../common/fields/EditableField';
import useRenameField from '../../hooks/useRenameField';
import { useForms } from '../../context/useForms';

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
    onSubmit,
    handleAddColumn,
    refSettingsColumn
  } = useRenameField();
  const {closeOnSelect, setCloseOnSelect} = useForms()

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} mb={'19px'}>
      {!renameTitle!.value ? (
        <Badge
          sx={badgeTitle(colorBadge, color)}
          onClick={handleRename}
          style={{ cursor: 'text' }}
        >
          {renameTitle.title || title}
        </Badge>
      ) : (
        <EditableField
          title={title}
          name="columnName"
          variant="titleColumn"
          refDiv={refInput}
          columnId={columnId}
          onSubmit={onSubmit}
        />
      )}
        <CustomSelectField
          icon={<Meetballs />}
          name="menuColumn"
          placeholder={null}
          options={[
            { name: 'Добавить колонку', value: 'addColumnAuto' },
            { name: 'Изменить колонку', value: 'editColumn' },
          ]}
          onClick={(e) => handleAddColumn(e, columnId)}
          variant="titleColumn"
          wrapperStyles={{ m: '0px 3px 0 auto', w: 'fit-content' }}

          menuOption={{title: 'Настройки при добавлении колонки', options:[{name: 'Задачи в новой колонке в стадии выполнено', value:'false'}],
          closeOnSelect, setCloseOnSelect, refSettingsColumn, columnId}}
        />
    </Flex>
  );
};

export default TitleColumn;
