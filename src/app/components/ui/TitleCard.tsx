import { useEffect } from 'react';
import useRenameField from '../../hooks/useRenameField';
import { Box, IconButton } from '@chakra-ui/react';
import EditableField from '../common/fields/EditableField';
import { ICard } from '../../utils/types';

const TitleCard = ({ task, index, columnId, ...rest }: ICard) => {
  const {styles}:any = rest
  const {
    renameTitle,
    editedTitle,
    handleRename,
    refInput,
    onSubmitRename,
    openingForm,
  } = useRenameField();

  useEffect(() => {
    if (task.title === '') {
      handleRename();
    }
  }, []);
  
  return (
    <>
      {!renameTitle ? (
        <>
          <Box
            className="title-card"
            fontSize={'14px'}
            fontWeight={'bold'}
            mb={'14px'}
            onClick={handleRename}
            style={{ cursor: 'text' }}
            w={'100%'}
          >
            {editedTitle || task.title || 'No name!!!'}
          </Box>
          <IconButton
            className="card-delete-btn"
            aria-label="Remove task"
            onClick={(e) => openingForm(e, columnId, task.id)}
            datatype="removeTask"
            sx={styles.iconButton}
          />
        </>
      ) : (
        <EditableField
          title={task.title}
          name="taskName"
          settings={{
            placeholder: 'Введите имя задачи',
            refDiv: refInput,
            variant: 'titleColumn',
            textAreaClassName: 'titleCard-textArea'
          }}
          columnId={columnId}
          taskIdx={index.toString()}
          onSubmit={onSubmitRename}
        />
      )}
    </>
  );
};

export default TitleCard;
