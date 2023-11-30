'use client'
import {
  Box,
  Button,
  HStack,
  Image,
  VStack,
  Text,
  Square,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '~/lib/Context/UserContext';
import { IMainForm } from '../Utilis/Schemas';
import Naira from '../Utilis/CustomHooks/Naira';
import { useRouter } from 'next/navigation';

export const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const data: IMainForm = user;
  const router = useRouter();
  return (
    <Box>
      <Text
        fontSize="1.1rem"
        fontFamily="'Montserrat', sans-serif"
        fontWeight={700}
        color="brand.100"
        textTransform="uppercase"
        mt="2rem"
        textAlign="center"
      >
        Your Package
      </Text>

      <HStack>
        <Square
          size="8rem"
          overflow="hidden"
          borderRadius="8px"
          boxShadow="0 0 8px 3px rgba(0,0,0,.1)"
        >
          <Image
            src={'/assets/sample.jpg'}
            w="full"
            h="full"
            objectFit="cover"
          />
        </Square>
        <VStack align="flex-start" gap="0">
          <Text
            fontSize="1.1rem"
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
            color="brand.100"
            textTransform="uppercase"
          >
            Thriamveftikos Merch
          </Text>
          <Text
            fontSize=".7rem"
            fontFamily="'Baloo Bhaijaan 2', sans-serif"
            fontWeight={500}
            textTransform="capitalize"
          >
            {Naira(data?.merchFee)}
          </Text>
        </VStack>
      </HStack>
      <Button
        bgColor="black"
        color="white"
        w="full"
        mx="auto"
        h="3rem"
        borderRadius="8px"
        mt="2rem"
        onClick={() => router.push('/user/pay-form')}
      >
        Pay
      </Button>
    </Box>
  );
};
