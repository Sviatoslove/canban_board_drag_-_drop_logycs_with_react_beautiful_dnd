import { Draggable } from 'react-beautiful-dnd';
import { ICard } from '../utils/types';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const container = {
  borderRadius: '10px',
  boxShadow: '5px 5px 5px 2px grey',
  padding: '8px',
  color: '#000',
  m: '10px',
  cursor: 'pointer',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

const icons = {
  display: 'flex',
  justifyContent: 'end',
  padding: '2px',
};

function bgcolorChange(props: any) {
  return props.isDragging
    ? 'lightgreen'
    : props.isDraggable
    ? props.isBacklog
      ? '#F2D7D5'
      : '#DCDCDC'
    : props.isBacklog
    ? '#F2D7D5'
    : '#EAF4FC';
}

const Card = ({ task, index }: ICard) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Flex<any>
          sx={container}
          bgColor={bgcolorChange(snapshot)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
        >
          <Flex justifyContent="start" p={2}>
            #{task.id}
          </Flex>
          <Flex justifyContent="center" p={2}>
            <Text>{task.title}</Text>
          </Flex>
          <Flex sx={icons}>
            <Box w="70px">
              <Avatar
                onClick={() => console.log(task)}
                src={'https://joesch.moe/api/v1/random?key=' + task.id}
              />
            </Box>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export default Card;
