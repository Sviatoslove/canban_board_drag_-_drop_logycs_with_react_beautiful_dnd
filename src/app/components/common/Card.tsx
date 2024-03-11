import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ICard } from '../../utils/types';
import {
  Avatar,
  Badge,
  Flex,
  Icon,
  IconButton,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import displayDate from '../../utils/displayDate';
import ProgressBar from './ProgressBar';
import { CheckDouble } from '../../../assets/icons/CheckDouble';
import TitleCard from '../ui/TitleCard';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { useForms } from '../../context/useForms';

const getStyleDraggable = (
  snapshot: DraggableStateSnapshot
): { [x: string]: string } => ({
  boxShadow: snapshot.isDragging
    ? '0px 0px 10px 8px white, 0px 0px 10px 8px white'
    : 'none',
  background: snapshot.isDragging ? 'lightgreen' : 'white',
});

const Card = ({ task, index, columnId }: ICard) => {
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
          className="card"
        >
          <TitleCard {...{ task, index, columnId, styles }} />

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
