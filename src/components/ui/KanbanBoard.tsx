import { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../common/Column';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { Flex } from '@chakra-ui/react';
import { HandleAddTask, IColumn, IUserColumn } from '../../utils/types';

const styles = {
  m: '10px auto',
  w: '100%',
  maxW: '1140px',
  p: '10px 57px 10px 70px',
  shadow: '0px 0px 10px 10px rgba(0,0,0,0.3)',
  borderRadius: 10,
  justifyContent: 'space-between',
  bg: '#f5f5fa',
  overflow: 'auto',
};

const ColumnList = memo(
  (props: { columns: IColumn[]; handleAddTask: HandleAddTask}): any =>
    props.columns.map((column: IColumn) => (
      <Column {...column} handleAddTask={props.handleAddTask} key={column.id} />
    ))
);

const KanbanBoard = () => {
  const userColumns: IUserColumn[] = [
    {
      id: '1',
      title: 'Pending',
      colorBadge: 'red',
      completed: false,
    },
    {
      id: '2',
      title: 'Progress',
      colorBadge: 'orange',
    },
    {
      id: '5',
      title: 'Done',
      colorBadge: 'green',
      completed: true,
    },
    // {
    //   id: '4',
    //   title: 'Extra Working',
    //   colorBadge: 'darkblue',
    // },
    // {
    //   id: '3',
    //   title: 'Double Mount',
    //   colorBadge: 'darkgreen',
    // },
  ];
  const { handleDragEnd, columns, handleAddTask } = useKanbanBoard(userColumns);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex sx={styles}>
        <ColumnList
          columns={Object.values(columns)}
          handleAddTask={handleAddTask}
        />
      </Flex>
    </DragDropContext>
  );
};

export default KanbanBoard;
