import React from 'react';
import { IMainForm } from '../Utilis/Schemas';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Flyer } from './Flyer';
import { ShegeFlyer } from './ShegeFlyer';

export const ShegeModal = ({
  isOpen,
  onClose,
  pageRef,
  info,
  downloadFunc,
}: {
  isOpen: boolean;
  onClose: any;
  pageRef: any;
  info: IMainForm;
  downloadFunc: any;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0px"
        w={['88%', '5.5in']}
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
        maxW="100%"
      >
        <ModalBody overflow="auto">
          <ShegeFlyer newRef={pageRef} data={info} />

          <Flex justify="center">
            <Button
              bgColor="black"
              color="white"
              fontSize=".8rem"
              h="2.6rem"
              onClick={() => downloadFunc()}
              my="2rem"

              // isLoading={loading}
            >
              Download
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
