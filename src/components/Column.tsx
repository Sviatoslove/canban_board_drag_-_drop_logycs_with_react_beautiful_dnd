import { IColumn } from '../utils/types';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import { Badge, Flex } from '@chakra-ui/react';

const columnStyles = {
  flexDirection: 'column',
  w: '100%',
  maxW: '332px',
  h: '649px',
  shadow: '0px 0px 10px 2px rgba(0,0,0,0.3)',
  borderRadius: 10,
  p: '10px',
};

const wrapperCard = {
  flexDirection: 'column',
  overflowX: 'auto',
  height: '100%',
};

const badgeTitle = (colorBadge: string) => ({
  alignSelf: 'start',
  borderRadius: 15,
  bgColor: colorBadge,
  px: '15px',
  py: '2px',
  variant: 'solid',
  color: 'white',
  mb: '10px',
});

const Column = ({ title, tasks, id, colorBadge }: IColumn) => {
  return (
    <Flex sx={columnStyles}>
      <Badge sx={badgeTitle(colorBadge)}>{title}</Badge>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Flex<any>
            sx={wrapperCard}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
