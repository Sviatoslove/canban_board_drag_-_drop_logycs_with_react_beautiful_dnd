import { Badge, Flex, IconButton } from '@chakra-ui/react';
import Meetballs from './Meetballs';

const badgeTitle = (colorBadge: string) => ({
  borderRadius: 15,
  bgColor: colorBadge,
  px: '15px',
  py: '2px',
  variant: 'solid',
  color: 'white',
});

interface ITitleColumn {
  colorBadge: string;
  title: string;
}

const TitleColumn = ({ colorBadge, title }: ITitleColumn) => {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Badge sx={badgeTitle(colorBadge)}>{title}</Badge>
      <IconButton
        icon={<Meetballs />}
        aria-label="settings"
        w={'52px'}
        h={'52px'}
        borderWidth={0}
        bg={'transparent'}
        cursor={'pointer'}
      />
    </Flex>
  );
};

export default TitleColumn;
