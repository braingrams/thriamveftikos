import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const TextBox = ({ title, value }: { title: string; value: any }) => {
  function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return (
    <VStack
      align="flex-start"
      w="full"
      gap="0"
      fontFamily="'Baloo Bhaijaan 2', sans-serif"
    >
      <HStack justify="space-between" w="full">
        <Text
          fontWeight={600}
          fontSize=".7rem"
          color="blue.600"
          mb="0"
          borderBottom="2px dashed"
          borderColor="blue.600"
        >
          {title}
        </Text>
        <Box h="30%" bgColor="blue.500" w={getRndInteger(8, 15)} />
      </HStack>
      <Text fontSize=".7rem" fontWeight={600}>
        {value}
      </Text>
    </VStack>
  );
};
