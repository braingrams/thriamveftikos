'use client'
import { Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Logo from '../Utilis/Logo';
import { useRouter } from 'next/navigation';

export const NoNetwork = () => {
  const router = useRouter();
  return (
    <VStack gap="1rem">
      <Logo height="5rem" />
      <Text>It looks like you're not connected to the internet!</Text>
      <Button onClick={() => router.refresh()}>Refresh</Button>
    </VStack>
  );
};
