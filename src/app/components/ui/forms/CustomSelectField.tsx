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
import { IDefaultState } from './settingsForm';
import { JSXElementConstructor, ReactElement } from 'react';

interface ISelectFieldProps {
  name: string;
  label?: string;
  error?: string;
  options: IDefaultState[];
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
  menuOption?: boolean;
  wrapperStyles?: IDefaultState;
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
  menuOption
}: ISelectFieldProps) => {
  const styles = useMultiStyleConfig('CustomSelectField', {
    variant,
    color,
    bg,
    name,
  });

  const getTitle = () =>
    options[options.findIndex((item) => item.value === value)].name;

  return (
    <FormControl isInvalid={!!error} mt={2} sx={wrapperStyles}>
      <label htmlFor={name}>{label}</label>
      <Menu>
        <MenuButton __css={styles.menuButton} as={Button}>
          {value ? getTitle() : placeholder}
          {icon}
        </MenuButton>
        <MenuList w={'320px'} p={0}>
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
              <MenuDivider />
              <MenuOptionGroup title="Country" type="checkbox">
                <MenuItemOption value="email">Email</MenuItemOption>
                <MenuItemOption value="phone">Phone</MenuItemOption>
                <MenuItemOption value="country">Country</MenuItemOption>
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
