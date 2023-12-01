import { Button } from '@chakra-ui/react';
import React from 'react';
import { ISizeboxProps } from './Schemas';

export const SizeBox = ({
  bgColor = 'black',
  color = 'white',
  onClick,
  text,
}: ISizeboxProps) => {
  return (
    <Button
      bgColor={bgColor}
      color={color}
      w="full"
      mx="auto"
      h="2rem"
      borderRadius="3px"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
