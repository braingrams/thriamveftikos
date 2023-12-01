'use client';
import {
  Box,
  Button,
  HStack,
  Image,
  VStack,
  Text,
  Square,
  Grid,
  Flex,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { UserContext } from '~/lib/Context/UserContext';
import { IMainForm } from '../Utilis/Schemas';
import Naira from '../Utilis/CustomHooks/Naira';
import { useRouter } from 'next/navigation';
import { SizeBox } from '../Utilis/SizeBox';

export const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const data: IMainForm = user;
  const router = useRouter();
  const [sizeValue, setSizeValue] = useState('')  
 return (
    <Box>
      <Text
        fontSize=".9rem"
        fontFamily="'Baloo Bhaijaan 2', sans-serif"
        fontWeight={400}
        p=".2rem 1rem"
        bgColor="brand.200"
        color="white"
        ml="auto"
        w="fit-content"
      >
        Amount Paid:{Naira(data?.merchPaid || 0)}
      </Text>
      <Text
        fontSize="1.1rem"
        // fontFamily="'Montserrat', sans-serif"
        fontWeight={700}
        color="brand.200"
        textTransform="uppercase"
        my="2rem"
        textAlign="center"
      >
        Your Package
      </Text>

      <VStack>
        <Flex
          w="100%"
          h="13rem"
          overflow="hidden"
          borderRadius="8px"
          justify="center"
          // boxShadow="0 0 8px 3px rgba(0,0,0,.1)"
        >
          <Image src={'/assets/ab.webp'} w="auto" h="full" objectFit="cover" />
        </Flex>
        <VStack align="flex-start" gap="0" w="full">
          <Text
            fontSize="1.3rem"
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
            color="brand.200"
          >
            Thriamveftikos Merch
          </Text>
          <Text
            fontSize="1.2rem"
            fontFamily="'Baloo Bhaijaan 2', sans-serif"
            fontWeight={500}
            textTransform="capitalize"
          >
            {Naira(data?.merchFee || 0)}
          </Text>
          <Grid templateColumns={['repeat(6, 1fr)']} gap=".5rem">
            <SizeBox
              bgColor="black"
              text="S"
              onClick={() => setSizeValue('S')}
            />
          </Grid>
        </VStack>
      </VStack>
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
      <Button
        color="black"
        variant="outline"
        w="full"
        mx="auto"
        h="3rem"
        borderRadius="8px"
        mt="1rem"
        onClick={() => router.push('/user/transactions')}
      >
        View Payment History
      </Button>
    </Box>
  );
};
