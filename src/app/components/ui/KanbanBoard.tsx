import { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../common/Column';
import { useKanbanBoard } from '../../hooks/useKanbanBoard';
import { Flex } from '@chakra-ui/react';
import { IColumn } from '../../utils/types';
import EmptyTasksList from './EmptyTasksList';
import { OpeningForm } from '../../context/useFormsTypes';
import { useForms } from '../../context/useForms';
import { useAppSelector } from '../../store/createStore';
import { selectColumns } from '../../store/columnsSlice';

const wrapper = {
  m: '10px auto',
  w: '100%',
  maxW: '1140px',
  minH: '703px',
  p: '22px 57px 10px 70px',
  shadow: '0px 0px 10px 10px rgba(0,0,0,0.3)',
  borderRadius: 10,
  bg: '#f5f5fa',
};

const columnList = {
  w: '100%',
  justifyContent: 'space-between',
  overflow: 'auto',
};

const ColumnList = memo(
  (props: { columns: IColumn[]; openingForm: OpeningForm }): any =>
    props.columns.map((column: IColumn) => (
      <Column {...column} openingForm={props.openingForm} key={column.id} />
    ))
);

const KanbanBoard = ({userColumns}: {userColumns: IColumn[]}) => {
  // const userTasks: IColumn[] = [
  //   // {
  //   //   id: '1',
  //   //   title: 'Pending',
  //   //   colorBadge: 'red',
  //   //   completed: false,
  //   // },
  //   // {
  //   //   id: '2',
  //   //   title: 'Progress',
  //   //   colorBadge: 'orange',
  //   // },
  //   // {
  //   //   id: '5',
  //   //   title: 'Done',
  //   //   colorBadge: 'green',
  //   //   completed: true,
  //   // },
  //   // {
  //   //   id: '4',
  //   //   title: 'Extra Working',
  //   //   colorBadge: 'darkblue',
  //   // },
  //   // {
  //   //   id: '3',
  //   //   title: 'Double Mount',
  //   //   colorBadge: 'darkgreen',
  //   // },
  //   // {
  //   //   id: '6',
  //   //   title: 'DoubleMount',
  //   //   colorBadge: 'black',
  //   // },
  //   // {
  //   //   id: '7',
  //   //   title: 'Doubleount',
  //   //   colorBadge: 'lightyellow',
  //   // },
  //   // {
  //   //   id: '8',
  //   //   title: 'Doublet',
  //   //   colorBadge: 'darkpink',
  //   // },
  // ];

  const { openingForm } = useForms();
  const { handleDragEnd, columns } = useKanbanBoard(userColumns);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex sx={wrapper}>
        {columns && userColumns.length ? (
          <Flex sx={columnList}>
            <ColumnList
              columns={Object.values(columns)}
              openingForm={openingForm}
            />
          </Flex>
        ) : (
          <EmptyTasksList openingForm={openingForm} />
        )}
      </Flex>
    </DragDropContext>
  );
};

export default KanbanBoard;
