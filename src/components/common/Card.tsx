import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ICard } from '../../utils/types';
import { Avatar, Badge, Box, Flex, Icon } from '@chakra-ui/react';
import displayDate from '../../utils/displayDate';
import { CheckDouble } from '../../assets/icons/CheckDouble';
import ProgressBar from './ProgressBar';

const container = {
  position: 'relative',
  w: '100%',
  maxW: '320px',
  h: '102px',
  borderRadius: '10px',
  p: '18px 23px 23px 15px',
  color: '#000',
  mb: '7px',
  cursor: 'pointer',
  justifyContent: 'space-between',
  flexDirection: 'column',
};

const icons = {
  display: 'flex',
  justifyContent: 'space-between',
  h: '24px',
};

const badge = {
  variant: 'solid',
  bg: '#F5F5FA',
  w: '94px',
  fontSize: '12px',
  fontWeight: 'bold',
  alignItems: 'center',
  borderRadius: 10,
  color: '#5F646D',
  justifyContent: 'center',
  display: 'flex',
};

const getStyleDraggable = (
  snapshot: DraggableStateSnapshot
): { [x: string]: string } => ({
  boxShadow: snapshot.isDragging
    ? '0px 0px 10px 8px white, 0px 0px 10px 8px white'
    : 'none',
  background: snapshot.isDragging ? 'lightgreen' : 'white',
});

const Card = ({ task, index }: ICard) => {
  const getTitle = ({ title }: { title: string }) =>
    title.length <= 36 ? title : title.slice(0, 36) + '...';

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <Flex<any>
          sx={container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging.toString()}
          style={{
            ...getStyleDraggable(snapshot),
            ...provided.draggableProps.style,
          }}
        >
          <Box fontSize={'14px'} fontWeight={'bold'} mb={'14px'}>
            {getTitle(task)}
          </Box>
          <Flex sx={icons}>
            <Badge sx={badge}>
              {task.createdAt ? displayDate(task.createdAt) : null}
            </Badge>
            <Flex w={'96px'} justifyContent={'space-between'}>
              <Flex alignItems={'center'} color={'#5F646D'}>
                <Icon as={CheckDouble} />
                {task.completedProblems}/{task.problems}
              </Flex>
              <Avatar
                w={'24px'}
                h={'24px'}
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
