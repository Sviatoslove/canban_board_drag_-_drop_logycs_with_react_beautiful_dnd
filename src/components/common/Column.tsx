import { IColumn } from '../../utils/types';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Card from './Card';
import { Button, Flex } from '@chakra-ui/react';
import TitleColumn from '../ui/TitleColumn'
import AddIconTask from '../../assets/icons/AddIconTask';

const columnStyles = {
  flexDirection: 'column',
  w: '100%',
  maxW: '332px',
  h: '649px',
};

const wrapperCard = {
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'hidden',
  height: '100%',
  borderRadius: '10px',
};

const buttonAddTask = {
  maxW:'320px',
  w:'100%',
  h:'52px',
  border:'dotted',
  borderColor:'#CFDBD5',
  borderRadius:5,
  bg:'#fff',
  borderWidth:'2px',
};

const Column = ({ title, state:tasks, id, colorBadge }: IColumn) => {
  const getBackgroundColor = (snapshot: DroppableStateSnapshot): string => {
    if (snapshot.isDraggingOver) return 'lightpink';
    if (snapshot.draggingFromThisWith) return 'lightgreen';
    return 'transparent';
  };

  return (
    <Flex sx={columnStyles}>
      <TitleColumn title={title} colorBadge={colorBadge} />
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Flex<any>
            sx={wrapperCard}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
            bg={getBackgroundColor(snapshot)}
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
      <Button leftIcon={<AddIconTask/>}
        sx={buttonAddTask}
      >Add a task</Button>
    </Flex>
  );
};

export default Column;
