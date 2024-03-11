import { IColumn } from '../../utils/types';
import { Droppable, DroppableStateSnapshot } from 'react-beautiful-dnd';
import Card from './Card';
import { Button, Flex, useMultiStyleConfig } from '@chakra-ui/react';
import TitleColumn from '../ui/TitleColumn';
import AddIconTask from '../../../assets/icons/AddIconTask';
import useRenameField from '../../hooks/useRenameField';

const Column = ({
  title,
  colorText,
  state: tasks,
  id,
  colorBadge,
}: IColumn) => {
  const { handleAddColumn, renameTitle } = useRenameField();

  const styles = useMultiStyleConfig('Flex', {
    variant: 'kanbanBoard',
  });

  const getStylesValue = (style: string, value: string[]) =>
    tasks.length ? { [style]: value[0] } : { [style]: value[1] };

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
      <Button
        onClick={(e) => handleAddColumn!(e, id)}
        datatype="addTask"
        leftIcon={<AddIconTask />}
        sx={styles.buttonAddTask}
      >
        Add a task
      </Button>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <Flex<any>
            sx={styles.columnContent}
            {...getStylesValue('height', ['fit-content', '170px'])}
            ref={provided.innerRef}
            {...provided.droppableProps}
            isdraggingover={snapshot.isDraggingOver.toString()}
            bg={getBackgroundColor(snapshot)}
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} columnId={id} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
