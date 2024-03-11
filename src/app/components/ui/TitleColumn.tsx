import { Badge, Flex } from '@chakra-ui/react';
import { ITitleColumn } from '../../utils/types';
import CustomSelectField from '../common/fields/CustomSelectField';
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
  maxW: '270px',
  whiteSpace: 'wrap',
});

const TitleColumn = ({ colorBadge, title, color, columnId }: ITitleColumn) => {
  const {
    renameTitle,
    editedTitle,
    handleRename,
    refInput,
    onSubmitRename,
    handleAddColumn,
    refSettingsColumn,
  } = useRenameField();
  const { closeOnSelect, setCloseOnSelect } = useForms();

  return (
    <Flex alignItems={'center'} justifyContent={'space-between'} mb={'19px'}>
      {!renameTitle ? (
        <Badge
          className="titleColumn"
          sx={badgeTitle(colorBadge, color)}
          onClick={handleRename}
          style={{ cursor: 'text' }}
        >
          {editedTitle || title}
        </Badge>
      ) : (
        <EditableField
          title={editedTitle || title}
          name="columnName"
          settings={{
            placeholder: 'Введите имя колонки',
            refDiv: refInput,
            variant: 'titleColumn',
            inputClassName:'titleColumn-input'
          }}
          columnId={columnId}
          onSubmit={onSubmitRename}
        />
      )}
      <CustomSelectField
        nameClass="title-column-menu-button-icon"
        name="menuColumn"
        placeholder={null}
        options={[
          { name: 'Добавить колонку', value: 'addColumnAuto' },
          { name: 'Изменить колонку', value: 'editColumn' },
          { name: 'Удалить колонку', value: 'removeColumn' },
        ]}
        onClick={(e) => handleAddColumn(e, columnId)}
        variant="titleColumn"
        wrapperStyles={{ m: '0px 3px 0 auto', w: 'fit-content' }}
        menuOption={{
          title: 'Настройки при добавлении колонки',
          options: [
            {
              name: 'Задачи в новой колонке в стадии выполнено',
              value: 'false',
            },
          ],
          closeOnSelect,
          setCloseOnSelect,
          refSettingsColumn,
          columnId,
        }}
      />
    </Flex>
  );
};

export default TitleColumn;
