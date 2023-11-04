import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const TextBox = ({ title, value }: { title: string; value: any }) => {
  return (
    <VStack
      align="flex-start"
      w="full"
      gap="0"
      fontFamily="'Baloo Bhaijaan 2', sans-serif"
    >
      <Text
        fontWeight={600}
        fontSize=".8rem"
        color="blue.600"
        mb="0"
        borderBottom="2px dashed blue.600"
      >
        {title}
      </Text>
      <Text fontSize=".8rem" fontWeight={600}>
        {value}
      </Text>
    </VStack>
  );
};
