import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { Flex, useMultiStyleConfig } from '@chakra-ui/react';
import { IColumn } from '../../utils/types';
import Card from './Card';
import TitleColumn from '../ui/TitleColumn';

const Column = ({
  title,
  colorText,
  state: tasks,
  id,
  colorBadge,
}: IColumn) => {

  const styles = useMultiStyleConfig('Flex', {
    variant: 'column',
    tasksLength:tasks?.length,
  });

  const getBackgroundColor = (snapshot: DroppableStateSnapshot): string => {
    if (snapshot.isDraggingOver) return 'lightpink';
    if (snapshot.draggingFromThisWith) return 'lightgreen';
    return 'transparent';
  };

  return (
    <Flex sx={styles.column} className="columns">
      <TitleColumn
        title={title}
        colorBadge={colorBadge}
        color={colorText}
        columnId={id}
      />
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Flex<any>
            sx={styles.columnContent}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
            bg={getBackgroundColor(snapshot)}
          >
            {tasks?.map((task, index) => (
              <Card key={+task.id} index={index} task={task} columnId={id} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
