'use client';
import { Box, Button, VStack, Text, Grid } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '~/lib/Context/UserContext';
import { IMainForm } from '../Utilis/Schemas';
import Naira from '../Utilis/CustomHooks/Naira';
import { useRouter } from 'next/navigation';
import InfoBox from './InfoBox';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePaystackPayment } from 'react-paystack';
import {
  arrayUnion,
  collection,
  deleteField,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Cookies from 'js-cookie';

interface IPriceForm {
  price: string;
}

export const PaymentForm = () => {
  const { user } = useContext(UserContext);
  const data: IMainForm = user;
  const balance =
    ((data?.merchFee as number) || 0) - ((data?.merchPaid as number) || 0);
  const schema = yup.object().shape({
    price: yup
      .number()
      .max(balance, `The maximum amount you can pay now is ${balance} `)
      .min(1000, 'The Minimum amount per time is N1000'),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<IPriceForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const price = watch('price');
  const config = {
    reference: new Date().getTime().toString(),
    email: (data.email as string) || '',
    amount: Number(price) * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
  };
  const initializePayment = usePaystackPayment(config);
  const router = useRouter();

  const onSuccess = async (reference: any) => {
    const newMerchPaid = Number(data?.merchPaid || 0) + Number(price);
    const userDocRef = doc(db, 'user-transactions', data.email as string);
    if (reference.status == 'success') {
      const userRef = doc(db, 'user-biodata', data?.email as string);
      await updateDoc(userRef, {
        'data.merchPaid': newMerchPaid,
      });
      Cookies.set(
        'user-info',
        JSON.stringify({ ...data, merchPaid: newMerchPaid })
      );
      router.refresh();
      await setDoc(
        userDocRef,
        {
          transaction: arrayUnion({
            id: reference.trans,
            firstName: data?.firstName,
            lastName: data?.lastName,
            amount: Number(price),
            dateCreated: new Date(),
            txRef: reference.trxref,
            status: reference.status,
          }),
        },
        { merge: true }
      );
    }
    console.log('done');
  };
  const onClose = () => {
    console.log('closed');
  };

  return (
    <Box>
      <Text
        fontSize=".9rem"
        fontWeight={700}
        color="brand.100"
        textTransform="uppercase"
        mt="2rem"
        textAlign="center"
      >
        Merch Fee History
      </Text>

      <Grid templateColumns={['repeat(2, 1fr)']} gap="1rem">
        <InfoBox label="Mercandise Cost" value={Naira(data?.merchFee || 0)} />
        <InfoBox label="Amount Paid" value={Naira(data?.merchPaid || 0)} />
        <InfoBox label="Amount Remaining" value={Naira(balance)} />
      </Grid>
      {/* <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}> */}
      <VStack w="full">
        <PrimaryInput<IPriceForm>
          name="price"
          register={register}
          placeholder="2000"
          error={errors.price}
          label="How much do you want to pay now?"
          type="text"
        />
        <Button
          bgColor="black"
          color="white"
          w="full"
          mx="auto"
          h="3rem"
          borderRadius="8px"
          mt="2rem"
          onClick={() => {
            initializePayment(
              //@ts-ignore
              (reference: any) => onSuccess(reference),
              onClose
            );
          }}
        >
          Pay
        </Button>
      </VStack>
      {/* </form> */}
    </Box>
  );
};
