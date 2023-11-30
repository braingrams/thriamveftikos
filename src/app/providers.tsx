'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { Next13ProgressBar } from 'next13-progressbar';

import { Chakra as ChakraProvider } from '~/lib/components/Chakra';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
      <Next13ProgressBar
        height="4px"
        color="#131313"
        options={{ showSpinner: false }}
        showOnShallow
      />
    </CacheProvider>
  );
};

export default Providers;
