import { memo } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../common/Column';
import { Flex, useMultiStyleConfig } from '@chakra-ui/react';
import { IColumn, IColumns } from '../../utils/types';
import EmptyTasksList from './EmptyTasksList';
import { OpeningForm } from '../../context/useFormsTypes';
import { useForms } from '../../context/useForms';

const ColumnList = memo(
  (props: { columns: IColumn[]; openingForm: OpeningForm }): any =>
    props.columns.map((column: IColumn) => (
      <Column {...column} openingForm={props.openingForm} key={column.id} />
    ))
);

const KanbanBoard = ({ userColumns }: { userColumns: IColumns }) => {
  const { openingForm, updateColumns, handleDragEnd } = useForms();
  const columnsLength = Object.values(updateColumns).length

  const styles = useMultiStyleConfig('Flex', {
    variant: 'kanbanBoard',
    columnsLength
  });

  console.log('=================================================:');
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex sx={styles.wrapper}>
        { columnsLength ? (
          <Flex sx={styles.columnList} className="columnList">
            <ColumnList
              columns={Object.values(updateColumns)}
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
