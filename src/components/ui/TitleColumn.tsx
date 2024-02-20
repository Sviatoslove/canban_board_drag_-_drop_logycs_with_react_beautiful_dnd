import { Badge, Flex, IconButton } from '@chakra-ui/react';
import Meetballs from './Meetballs';
import { ITitleColumn } from '../../utils/types';

const badgeTitle = (colorBadge?: string) => ({
  borderRadius: 15,
  bgColor: colorBadge,
  px: '15px',
  py: '2px',
  variant: 'solid',
  color: 'white',
});

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
      />
    </Flex>
  );
};

export default TitleColumn;
