import { Draggable, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { ICard } from '../../utils/types';
import { Avatar, Badge, Box, Flex, Icon, Text } from '@chakra-ui/react';
import displayDate from '../../utils/displayDate';
import ProgressBar from './ProgressBar';
import { CheckDouble } from '../../../assets/icons/CheckDouble';
import useRenameField from '../../hooks/useRenameField';
import EditableField from './fields/EditableField';

const container = {
  position: 'relative',
  w: '100%',
  minW: '320px',
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

const Card = ({ task, index, columnId }: ICard) => {
  const {
    renameTitle,
    handleRename,
    refInput,
    onSubmit,
    handleAddColumn,
    refSettingsColumn,
  } = useRenameField();

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
          {!renameTitle!.value ? (
            <Box
              fontSize={'14px'}
              fontWeight={'bold'}
              mb={'14px'}
              onClick={handleRename}
              style={{ cursor: 'text' }}
            >
              {renameTitle.title || getTitle(task)}
            </Box>
          ) : (
            <EditableField
              title={getTitle(task)}
              name="taskName"
              variant="titleColumn"
              refDiv={refInput}
              columnId={columnId}
              taskIdx={index.toString()}
              onSubmit={onSubmit}
            />
          )}
          <Flex sx={icons}>
            <Badge sx={badge} textTransform={'lowercase'}>
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
