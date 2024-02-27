import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { FuncVoid } from '../../utils/types';

interface ModalWindowProps {
  title?: string;
  isOpen: boolean;
  onClose: FuncVoid;
  // content?: string;
  children?: React.ReactNode;
}

const ModalWindow = ({
  title,
  isOpen,
  onClose,
  children,
}: ModalWindowProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent bg={'#f5f5fa'}>
          <ModalHeader mx={'auto'}>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWindow;
