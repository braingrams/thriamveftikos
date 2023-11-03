'use client';
import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const loading = () => {
  return (
    <Flex justify="center" mt="2rem">
      <Spinner size={'lg'} />
    </Flex>
  );
};

export default loading;
