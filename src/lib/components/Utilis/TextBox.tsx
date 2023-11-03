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
      <Text fontWeight={600} fontSize=".6rem" color="goldenrod">
        {title}
      </Text>
      <Text fontSize=".8rem">{value}</Text>
    </VStack>
  );
};
