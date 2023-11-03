'use client';

import { VStack, Image, Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ILoginForm } from '../Utilis/Schemas';
import { auth, signIn } from '../firebase/firebase';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const [error, setError] = useState({});
  const onSubmit = async (data: ILoginForm) => {
    setError({});
    try {
      const res = await signIn(
        auth,
        data.email as string,
        data.password as string
      );
      console.log({ res });
      if (res.user) {
        router.push('/admin/dashboard');
        Cookies.set('token', res.user?.accessToken as string, { expires: 1 });
        return;
      }
    } catch (err) {
      console.log({ err });
      // setError(err.);
    }
  };
  return (
    <VStack>
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        <Image src="/assets/logo.png" h="full" />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack w="full">
          <PrimaryInput<ILoginForm>
            name="email"
            register={register}
            placeholder="tade@gmail.com"
            error={errors.email}
            label="Email Address"
            type="email"
          />
          <PrimaryInput<ILoginForm>
            name="password"
            register={register}
            error={errors.password}
            placeholder="*********"
            type={passwordVisible ? 'text' : 'password'}
            icon={true}
            passwordVisible={passwordVisible}
            changePasswordType={() => setPasswordVisible((prev) => !prev)}
            label="Password"
          />
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
