import {
  Flex,
  Skeleton,
  SkeletonCircle,
  useMultiStyleConfig,
} from '@chakra-ui/react';

const SkeletonKanbanBoard = () => {
  const styles = useMultiStyleConfig('Flex', {
    variant: 'kanbanBoard',
  });

  return (
    <Flex sx={styles.wrapper}>
      <Flex sx={styles.columnList}>
        {[1, 2, 3].map((column: number) => (
          <Flex sx={styles.column} className="columns" key={column}>
            <Flex justifyContent={'space-between'} alignItems={'center'}>
              <Skeleton height="22px" w={'76px'} borderRadius={'10px'} />
              <Skeleton height="18px" w={'40px'} borderRadius={'10px'} />
            </Flex>
            <Flex sx={styles.columnContent}>
              {[1, 2, 3, 4, 5].map((task, index) => (
                <Flex key={index} sx={styles.card}>
                  <Skeleton w={'100%'} height="21px" />
                  <Flex sx={styles.icons}>
                    <Skeleton sx={styles.badgeDate} />
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
            <Skeleton sx={styles.buttonAddTask} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default SkeletonKanbanBoard;
