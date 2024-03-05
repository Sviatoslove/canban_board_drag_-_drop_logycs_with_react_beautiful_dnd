import { IColumn } from '../../utils/types';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Card from './Card';
import { Button, Flex } from '@chakra-ui/react';
import TitleColumn from '../ui/TitleColumn';
import AddIconTask from '../../../assets/icons/AddIconTask';

const columnStyles = {
  flexDirection: 'column',
  w: '100%',
  minW: '332px',
  h: '649px',
  mr: '8px',
};

const wrapperCard = {
  flexDirection: 'column',
  borderRadius: '10px',
  position: 'relative',
};

const buttonAddTask = {
  minW: '320px',
  w: '100%',
  h: '52px',
  border: 'dotted',
  borderColor: '#CFDBD5',
  borderRadius: 5,
  bg: '#fff',
  borderWidth: '2px',
  top: 0,
  left: 0,
};

const Column = ({
  title,
  colorText,
  state: tasks,
  id,
  colorBadge,
  openingForm,
}: IColumn) => {

  const getStylesBtn = (style: string, value: string[]) =>
    tasks.length ? { [style]: value[0] } : { [style]: value[1] };

  const getBackgroundColor = (snapshot: DroppableStateSnapshot): string => {
    if (snapshot.isDraggingOver) return 'lightpink';
    if (snapshot.draggingFromThisWith) return 'lightgreen';
    return 'transparent';
  };

  return (
    <Flex sx={columnStyles} className="columns">
      <TitleColumn title={title} colorBadge={colorBadge} color={colorText} columnId={id} />
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Flex<any>
            sx={wrapperCard}
            {...getStylesBtn('height', ['fit-content', '170px'])}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
            bg={getBackgroundColor(snapshot)}
          >
            {tasks?.map((task, index) => (
              <Card key={index} index={index} task={task} columnId={id} />
            ))}
            {provided.placeholder}
            <Button
              onClick={(e) => openingForm!(e, id)}
              datatype="addTask"
              leftIcon={<AddIconTask />}
              sx={buttonAddTask}
              style={{ ...getStylesBtn('position', ['static', 'absolute']) }}
            >
              Add a task
            </Button>
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;