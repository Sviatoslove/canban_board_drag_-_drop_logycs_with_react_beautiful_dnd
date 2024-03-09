import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ICard } from '../../utils/types';
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Icon,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import displayDate from '../../utils/displayDate';
import ProgressBar from './ProgressBar';
import { CheckDouble } from '../../../assets/icons/CheckDouble';
import useRenameField from '../../hooks/useRenameField';
import EditableField from './fields/EditableField';
import { useEffect } from 'react';

const getStyleDraggable = (
  snapshot: DraggableStateSnapshot
): { [x: string]: string } => ({
  boxShadow: snapshot.isDragging
    ? '0px 0px 10px 8px white, 0px 0px 10px 8px white'
    : 'none',
  background: snapshot.isDragging ? 'lightgreen' : 'white',
});

const Card = ({ task, index, columnId }: ICard) => {
  const { renameTitle, editedTitle, handleRename, refInput, onSubmitRename } =
    useRenameField();

  useEffect(()=> {
    if(task.title === '') {
      handleRename()
    }
  },[])

  const styles = useMultiStyleConfig('Flex', {
    variant: 'kanbanBoard',
  });

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Flex<any>
          sx={styles.card}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
          style={{
            ...getStyleDraggable(snapshot),
            ...provided.draggableProps.style,
          }}
        >
          {!renameTitle ? (
            <Box
              fontSize={'14px'}
              fontWeight={'bold'}
              mb={'14px'}
              onClick={handleRename}
              style={{ cursor: 'text' }}
              w={'fit-content'}
              maxW={'290px'}
            >
              {editedTitle || task.title || 'No name!!!'}
            </Box>
          ) : (
            <EditableField
              title={task.title}
              name="taskName"
              settings={{
                placeholder: 'Введите имя задачи',
                refDiv: refInput,
                variant: 'titleColumn',
              }}
              columnId={columnId}
              taskIdx={index.toString()}
              onSubmit={onSubmitRename}
            />
          )}

          <Flex sx={styles.icons}>
            <Badge sx={styles.badgeDate} textTransform={'lowercase'}>
              {displayDate(task.createdAt)}
            </Badge>
            <Flex w={'96px'}>
              <Flex alignItems={'center'}>
                <Icon as={CheckDouble} />
                <Text fontSize={'12px'} color={'#5F646D'} px={'10.5px'}>
                  {task.completedProblems}/{task.problems}
                </Text>
              </Flex>
              <Avatar
                ml={'2px'}
                w={'24px'}
                h={'24px'}
                borderRadius={'50px'}
                shadow={'0px 0px 6px 1px rgba(0,0,0,0.2)'}
                src={'https://joesch.moe/api/v1/random?key=' + task.id}
              />
            </Flex>
          </Flex>
          <ProgressBar
            completedProblems={task.completedProblems}
            problems={task.problems}
          />
        </Flex>
      )}
    </Draggable>
  );
};

export default Card;
