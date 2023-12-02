'use client';
import { Box, Button, VStack, Text, Grid, HStack } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { UserContext } from '~/lib/Context/UserContext';
import { IMainForm } from '../Utilis/Schemas';
import Naira from '../Utilis/CustomHooks/Naira';
import InfoBox from './InfoBox';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { usePaystackPayment } from 'react-paystack';

interface IPriceForm {
  price: string;
}

export const PaymentForm = ({ data }: { data: IMainForm }) => {
  const { user } = useContext(UserContext);
  // const data: IMainForm = user;
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
    formState: { errors, isValid },
  } = useForm<IPriceForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const price = watch('price');
  const getFee = (
    price: number,
    percent: number,
    extra: number,
    max: number,
    min: number
  ) => {
    const percentage = (percent / 100) * price;
    if (price <= min && !(price <= 0)) {
      return percentage;
    } else if (percentage > max) {
      return max;
    } else if (price <= 0) {
      return 0;
    } else {
      return percentage + extra;
    }
  };
  const fee = getFee(Number(price || 0), 2.0, 100, 2000, 2500).toFixed(2);
  const total = Number(price || 0) + fee;
  const config = {
    reference: new Date().getTime().toString(),
    email: (data.email as string) || '',
    amount: total * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY as string,
    metadata: {
      custom_fields: [
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: `${data?.firstName} ${data?.lastName}`, // Pass the customer's name here
        },
      ],
    },
  };
  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: any) => {
    const redirectUrl = reference.redirecturl;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      console.log('No redirect URL found in the response');
    }
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

      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)']} gap="1rem">
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
        <HStack justify="space-between" fontSize=".9rem" w="full">
          <Text>Fee: {Naira(fee)}</Text>
          <Text fontWeight={600}>Total: {Naira(total)}</Text>
        </HStack>
        <Button
          bgColor="black"
          color="white"
          w="full"
          mx="auto"
          h="3rem"
          borderRadius="8px"
          mt="2rem"
          isDisabled={!isValid}
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
