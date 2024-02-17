import { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../common/Column';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { Flex } from '@chakra-ui/react';
import { IColumn } from '../../utils/types';

const styles = {
  m: '10px auto',
  w: '100%',
  maxW: '1140px',
  p: '10px 57px 10px 70px',
  shadow: '0px 0px 10px 10px rgba(0,0,0,0.3)',
  borderRadius: 10,
  justifyContent: 'space-between',
  bg: '#f5f5fa'
};

const ColumnList = memo((props: { columns: IColumn[] }): any =>
  props.columns.map((column: IColumn) => <Column {...column} key={column.id}/>)
);

const KanbanBoard = () => {
  const { handleDragEnd, isPending, inProgress, isDone } = useKanbanBoard();
  const columns = [
    {
      id: '1',
      title: 'Pending',
      tasks: isPending,
      colorBadge: 'red',
    },
    {
      id: '2',
      title: 'In progress',
      tasks: inProgress,
      colorBadge: 'orange',
    },
    {
      id: '3',
      title: 'Done',
      tasks: isDone,
      colorBadge: 'green',
    },
  ];
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex sx={styles}>
        <ColumnList columns={columns} />
      </Flex>
    </DragDropContext>
  );
};

export default KanbanBoard;