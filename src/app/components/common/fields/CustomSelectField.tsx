import {
  Button,
  FormControl,
  FormErrorMessage,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { EventChange } from '../../../utils/types';
import { IDefaultState } from '../../ui/forms/settingsForm';
import { JSXElementConstructor, ReactElement } from 'react';

interface ISelectFieldProps {
  name: string;
  label?: string;
  error?: string;
  options: IDefaultState[];
  optionsGroup?: IDefaultState[];
  color?: string;
  onChange?: (e: EventChange, field?: string) => void;
  onClick?: (e: EventChange) => void;
  value?: string;
  bg?: string;
  placeholder?: string | null;
  defaultOption?: string;
  titleList?: string;
  menuItemStyles?: any;
  variant?: string;
  menuOption?: {
    title: string;
    options: IDefaultState[];
    closeOnSelect: { [x: string]: boolean };
    setCloseOnSelect: any;
    refSettingsColumn: any;
    columnId?: string;
  };
  wrapperStyles?: IDefaultState;
  nameClass?: string;
  icon?: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
}

const CustomSelectField = ({
  name,
  label,
  titleList,
  error,
  onChange,
  onClick,
  options,
  value,
  color,
  bg,
  placeholder,
  menuItemStyles,
  icon,
  variant,
  wrapperStyles,
  menuOption,
  nameClass
}: ISelectFieldProps) => {
  const styles = useMultiStyleConfig('CustomSelectField', {
    variant,
    color,
    bg,
    name,
  });

  const getTitle = () =>
    options[options.findIndex((item) => item.value === value)].name;

  const handleOpenMenu = () => {
    menuOption?.setCloseOnSelect((prev: any) =>
      Object.keys(prev).reduce(
        (acc, item) =>
          (acc = {
            ...acc,
            [item]: item === menuOption.columnId! ? !prev[item] : false,
          }),
        {}
      )
    );
  };

  return (
    <FormControl isInvalid={!!error} mt={2} sx={wrapperStyles} className='formControl'>
      <label htmlFor={name}>{label}</label>
      <Menu
        isOpen={menuOption?.closeOnSelect[menuOption.columnId!]}
        closeOnSelect={!menuOption || false}
      >
        <MenuButton
          className={nameClass}
          sx={styles.menuButton}
          as={Button}
          onClick={handleOpenMenu}
        >
          {value ? getTitle() : placeholder}
          {icon}
        </MenuButton>
        <MenuList w={'320px'} p={0} sx={styles.menu}>
          <MenuGroup title={titleList} display={'flex'}>
            {options?.map((item, idx) => (
              <MenuItem
                sx={{
                  ...(menuItemStyles
                    ? menuItemStyles(item.value, name)
                    : undefined),
                  ...styles.menuItem,
                }}
                value={item.value}
                datatype={item.value}
                aria-checked={item.value === value}
                key={idx}
                onClick={onChange || onClick}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuGroup>
          {menuOption && (
            <>
              <MenuDivider sx={styles.menuDivider} />
              <MenuOptionGroup
                title={menuOption.title}
                type="checkbox"
                sx={styles.optionGroup}
              >
                {menuOption.options?.map((item, idx) => (
                  <MenuItemOption
                    sx={styles.menuItem}
                    value={item.value}
                    key={idx}
                    ref={menuOption.refSettingsColumn}
                  >
                    {item.name}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </>
          )}
        </MenuList>
      </Menu>
      {error && (
        <FormErrorMessage mb={2} mt={0}>
          {error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default CustomSelectField;
