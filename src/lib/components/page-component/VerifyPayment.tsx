'use client';
import { Button, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Naira from '../Utilis/CustomHooks/Naira';
import { useRouter } from 'next/navigation';
import { BsCheck2Circle } from 'react-icons/bs';
import getActualAmount from '../Utilis/getActualAmount';

export const VerifyPayment = ({ data }: any) => {
  const router = useRouter();
  return (
    <Flex>
      <VStack w="full">
        <Icon as={BsCheck2Circle} color="green.400" fontSize="3rem" />
        <Text>Thank you for your payment</Text>
        <Text>{Naira(getActualAmount(data?.data?.amount, data?.data?.fees))} has been confirmed</Text>
        <Button
          bgColor="black"
          color="white"
          w="full"
          mx="auto"
          h="3rem"
          borderRadius="8px"
          mt="1rem"
          onClick={() => router.push('/user/transactions')}
        >
          View Payment History
        </Button>
      </VStack>
    </Flex>
  );
};
