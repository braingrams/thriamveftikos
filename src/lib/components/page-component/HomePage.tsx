'use client';

import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export const HomePage = () => {
  return (
    <VStack>
      <Box h="8rem">
        <Image src="/assets/logo.png" h="full" />
      </Box>
      <Text textAlign="center">
        Dear Finalist, this is the <b>FYB</b> biodata portal for the face of
        thriamveftikos. Kindly put in the correct information as you'll like it
        to be shown on the flyer. <br /> Submission can only be once{' '}
      </Text>
      <Link passHref href="/start">
        <Button h="2.8rem" px="1.5rem">
          Click here to proceed
        </Button>
      </Link>
    </VStack>
  );
};
