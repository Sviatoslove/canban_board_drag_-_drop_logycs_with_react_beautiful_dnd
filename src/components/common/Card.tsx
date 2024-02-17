import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ICard } from '../../utils/types';
import { Avatar, Badge, Box, Flex, Icon, Progress } from '@chakra-ui/react';
import displayDate from '../../utils/displayDate';
import { CheckDouble } from '../../assets/icons/CheckDouble';

const container = {
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

const getStyleDraggable = (
  snapshot: DraggableStateSnapshot
): { [x: string]: string } => ({
  boxShadow: snapshot.isDragging
    ? '0px 0px 10px 8px white, 0px 0px 10px 8px white'
    : 'none',
  background: snapshot.isDragging ? 'lightgreen' : 'white',
});

// const getPercent = (partNum: number, totalNum: number): number => Math.floor((partNum*100)/totalNum)

const Card = ({ task, index }: ICard) => {
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
            {task.title}
          </Box>
          <Flex sx={icons}>
            <Badge variant="solid" bg={'#F5F5FA'} w={'94px'} fontSize={'12px'} fontWeight={'bold'} alignItems={'center'} borderRadius={10} color={'#5F646D'} justifyContent={'center'} display={'flex'}>
              {task.createdAt ? displayDate(task.createdAt) : null}
            </Badge>
            <Flex w={'96px'} justifyContent={'space-between'}>
              <Flex alignItems={'center'} color={'#5F646D'}>
                <Icon as={CheckDouble} />{task.completedProblems}/{task.problems}
              </Flex>
              <Avatar
                src={'https://joesch.moe/api/v1/random?key=' + task.id}
              />
            </Flex>
          </Flex>
        
          {/* <Progress value={z}
          size='xs' bg='pink' hasStripe={true} h={10}/> */}
        </Flex>
      )}
    </Draggable>
  );
};

export default Card;
