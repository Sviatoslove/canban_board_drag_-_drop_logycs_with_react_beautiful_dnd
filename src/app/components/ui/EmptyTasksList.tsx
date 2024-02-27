import { Box, Button, Flex, Image } from '@chakra-ui/react';
import { HandleAddTask } from '../../utils/types';
import { AddTaskIcon, AddTaskImg } from '../../../assets/icons';
import { OpeningForm } from '../../context/useFormsTypes';

const wrapperAddTaskImg = {
  mx: 'auto',
  h: 'fit-content',
  mt: '100px',
  flexDirection: 'column',
  fontFamily: 'Roboto Flex',
};

const boxH1 = {
  fontWeight: '800',
  fontSize: '42px',
  lineHeight: '56px',
  mt: '50px',
  mx: 'auto',
  mb: '6px',
};

const boxSpan = {
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '21px',
  mx: 'auto',
};

const link = {
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '21px',
  mx: 'auto',
  color: '#0052FF',
  w: '144px',
  h: '52px',
};

const EmptyTasksList = ({ openingForm }: {openingForm: OpeningForm}) => {
  return (
    <Flex sx={wrapperAddTaskImg}>
      <Image
        src={AddTaskImg}
        alt=""
        width={'266px'}
        height={'260px'}
        mx={'auto'}
      />
      <Box as="h1" sx={boxH1}>
        No tasks found?
      </Box>
      <Box as="span" sx={boxSpan}>
        Try to assign more tasks to your employees or create
      </Box>
      <Box as="span" w={'fit-content'} sx={boxSpan}>
        a new project from scratch
      </Box>
      <Button onClick={(e) => openingForm(e)} sx={link} datatype='addColumn'>
        <Image src={AddTaskIcon} />
        <Box as="span" ml={'8px'}>
          Create a new task
        </Box>
      </Button>
    </Flex>
  );
};

export default EmptyTasksList;
