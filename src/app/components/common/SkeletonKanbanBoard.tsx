import {
  Flex,
  Skeleton,
  SkeletonCircle,
  useMultiStyleConfig,
} from '@chakra-ui/react';

const SkeletonKanbanBoard = () => {
  const kanbanBoardStyles = useMultiStyleConfig('Flex', {
    variant: 'kanbanBoard',
  });

  const columnStyles = useMultiStyleConfig('Flex', {
    variant: 'column',
  });

  const cardStyles = useMultiStyleConfig('Flex', {
    variant: 'card',
  });

  return (
    <Flex sx={kanbanBoardStyles.wrapper}>
      <Flex sx={kanbanBoardStyles.columnList}>
        {[1, 2, 3].map((column: number) => (
          <Flex sx={columnStyles.column} className="columns" key={column}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Skeleton height="22px" w={'76px'} borderRadius={'10px'} />
              <Skeleton height="18px" w={'40px'} borderRadius={'10px'} />
            </Flex>
            <Skeleton sx={columnStyles.buttonAddTask} mt={'9px'} />
            <Flex sx={columnStyles.columnContent}>
              {[1, 2, 3, 4, 5].map((task, index) => (
                <Flex key={index} sx={cardStyles.card}>
                  <Skeleton w={'100%'} height="21px" />
                  <Flex sx={cardStyles.icons}>
                    <Skeleton __css={cardStyles.badgeDate} w={'100px'} borderRadius={'10px'}/>
                    <Flex w={'96px'}>
                      <Skeleton w={'67px'} h={'24px'} />
                      <SkeletonCircle
                        ml={'2px'}
                        w={'24px'}
                        h={'24px'}
                        borderRadius={'50px'}
                        shadow={'0px 0px 6px 1px rgba(0,0,0,0.2)'}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SkeletonKanbanBoard;
