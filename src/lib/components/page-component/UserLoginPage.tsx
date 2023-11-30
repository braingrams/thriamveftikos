'use client';

import { VStack, Image, Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILoginForm } from '../Utilis/Schemas';
import { db } from '../firebase/firebase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Logo from '../Utilis/Logo';
import { collection, getDocs, query, where } from 'firebase/firestore';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export const UserLoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [error, setError] = useState({ state: false, message: '' });
  const onSubmit = async (data: ILoginForm) => {
    setError({ state: false, message: '' });
    const q = query(
      collection(db, 'user-biodata'),
      where('data.email', '==', data.email)
    );
    try {
      const res = await getDocs(q);
      console.log({ res });
      if (res.docs.length > 0) {
        res.forEach((doc) => {
          Cookies.set('user-info', JSON.stringify(doc.data().data));
        });
        router.push('/user/dashboard')
      }
      if (res.empty) {
        setError({
          state: true,
          message:
            "Your Details was not found, you either didn't submit the fyb face of the week. Please submit first before continuing here",
        });
      }
    } catch (err: any) {
      console.log({ err });
      setError({ state: true, message: err?.name });
    }
  };
  return (
    <VStack>
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        {/* <Image src="/assets/logo.png" h="full" /> */}
        <Logo height="100%" />
      </Box>

      {error.state && (
        <>
          <Text textAlign="center" fontSize=".8rem">
            {error?.message == 'FirebaseError'
              ? 'Invalid Credentials!'
              : error?.message}
          </Text>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <VStack w="full">
          <PrimaryInput<ILoginForm>
            name="email"
            register={register}
            placeholder="tade@gmail.com"
            error={errors.email}
            label="Email Address"
            type="email"
          />
          {/* <PrimaryInput<ILoginForm>
            name="password"
            register={register}
            error={errors.password}
            placeholder="*********"
            type={passwordVisible ? 'text' : 'password'}
            icon={true}
            passwordVisible={passwordVisible}
            changePasswordType={() => setPasswordVisible((prev) => !prev)}
            label="Password"
          /> */}
          <Button
            type="submit"
            bgColor="black"
            color="white"
            w="full"
            mx="auto"
            h="3rem"
            borderRadius="8px"
            mt="2rem"
            isLoading={isSubmitting}
          >
            Login
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};
