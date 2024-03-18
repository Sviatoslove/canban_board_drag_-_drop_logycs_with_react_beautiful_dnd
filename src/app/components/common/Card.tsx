import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import {
  Avatar,
  Badge,
  Flex,
  Icon,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { ICard } from '../../utils/types';
import displayDate from '../../utils/displayDate';
import ProgressBar from './ProgressBar';
import { CheckDouble } from '../../../assets/icons/CheckDouble';
import TitleCard from '../ui/TitleCard';

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
    variant: 'card',
  });

  return (
    <Draggable key={task.id} draggableId={task?.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Flex<any>
          className="card"
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
          <TitleCard {...{ task, index, columnId, styles }} />

          <Flex sx={styles.icons}>
            <Badge sx={styles.badgeDate}>{displayDate(task.createdAt)}</Badge>
            <Flex w={'96px'}>
              <Flex alignItems={'center'}>
                <Icon as={CheckDouble} />
                <Text fontSize={'12px'} color={'#5F646D'} px={'10.5px'}>
                  {task.completedProblems}/{task.problems}
                </Text>
              </Flex>
              <Avatar
                sx={styles.avatar}
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
