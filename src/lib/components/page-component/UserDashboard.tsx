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
  Icon,
  Spinner,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { UserContext } from '~/lib/Context/UserContext';
import { IMainForm } from '../Utilis/Schemas';
import Naira from '../Utilis/CustomHooks/Naira';
import { useRouter } from 'next/navigation';
import { SizeBox } from '../Utilis/SizeBox';
import { BsCheck } from 'react-icons/bs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { IoTicketOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export const UserDashboard = ({ data }: { data: IMainForm }) => {
  const { user } = useContext(UserContext);
  // const data: IMainForm = user;
  const router = useRouter();
  const [sizeValue, setSizeValue] = useState(data?.size);
  const [loading, setloading] = useState(false);

  const saveUserSize = async () => {
    if (sizeValue == '') {
      toast.error(`${data?.lastName} select a size before you save 😉`, {
        theme: 'colored',
      });
      return;
    }
    if (sizeValue == data?.size) {
      toast.error(`${data?.lastName} You've selected this size before 😒`, {
        theme: 'colored',
      });
      return;
    }
    setloading(true);
    try {
      const userRef = doc(db, 'user-biodata', data?.email as string);
      await updateDoc(userRef, {
        'data.size': sizeValue,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      console.log({ error });
    }
  };
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
        Amount Paid:{Naira(Math.ceil(data?.merchPaid as number) || 0)}
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
          <Image src={'/assets/abc.jpg'} w="auto" h="full" objectFit="cover" />
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
          <HStack>
            <Text
              fontSize="1.2rem"
              fontFamily="'Baloo Bhaijaan 2', sans-serif"
              fontWeight={500}
              textTransform="capitalize"
            >
              {Naira(data?.merchFee || 0)}
            </Text>
            <HStack fontSize=".8em" color="brand.100">
              <Icon as={IoTicketOutline} />
              <Text>Comes with the FYB Dinner Ticket free</Text>
            </HStack>
          </HStack>
          <Grid templateColumns={['repeat(6, 1fr)']} gap=".5rem" mt=".5rem">
            <SizeBox
              text="S"
              onClick={() => setSizeValue('S')}
              sizeValue={sizeValue}
            />
            <SizeBox
              sizeValue={sizeValue}
              text="M"
              onClick={() => setSizeValue('M')}
            />
            <SizeBox
              sizeValue={sizeValue}
              text="L"
              onClick={() => setSizeValue('L')}
            />
            <SizeBox
              sizeValue={sizeValue}
              text="XL"
              onClick={() => setSizeValue('XL')}
            />
            <SizeBox
              sizeValue={sizeValue}
              text="XXL"
              onClick={() => setSizeValue('XXL')}
            />
            <Flex
              w="full"
              align="center"
              justify="center"
              bgColor="black"
              color="white"
              onClick={saveUserSize}
              cursor="pointer"
            >
              {loading ? <Spinner size="xs" /> : <Icon as={BsCheck} />}
            </Flex>
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
