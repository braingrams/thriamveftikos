import { Button } from '@chakra-ui/react';
import React from 'react';
import { ISizeboxProps } from './Schemas';

export const SizeBox = ({ sizeValue, onClick, text }: ISizeboxProps) => {
  return (
    <Button
      bgColor={sizeValue == text ? 'brand.100' : 'white'}
      color={sizeValue == text ? 'white' : 'black'}
      w="full"
      mx="auto"
      h="1.7rem"
      borderRadius="3px"
      border="1px solid"
      borderColor={sizeValue == text ? 'white' : 'black'}
      onClick={onClick}
      fontSize="14px"
      _hover={{
        bgColor: sizeValue == text ? 'brand.100' : 'white',
        color: sizeValue == text ? 'white' : 'black',
      }}
    >
      {text}
    </Button>
  );
};
