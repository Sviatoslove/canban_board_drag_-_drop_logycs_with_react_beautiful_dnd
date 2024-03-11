import { Button } from '@chakra-ui/react';

const CustomIconButton = ({
  icon,
  widthIcon,
  dataType,
  ariaLabel,
  type,
  onClick,
  ...rest
}: {
  icon: any;
  dataType: string;
  ariaLabel: string;
  widthIcon?: string;
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset' | undefined;
}) => {
  return (
    <Button
      {...rest}
      minW="0px"
      paddingInlineStart={0}
      paddingInlineEnd={0}
      datatype={dataType}
      type={type}
    >
      <img src={icon} width={widthIcon} alt={ariaLabel} />
    </Button>
  );
};

export default CustomIconButton;
