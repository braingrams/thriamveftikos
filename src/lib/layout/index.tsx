'use client';

import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Online, Offline } from 'react-detect-offline';

import Footer from './Footer';
import Header from './Header';
import { NoNetwork } from '../components/page-component/NoNetwork';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex
      margin="0 auto"
      maxWidth={['full', 800]}
      transition="0.5s ease-out"
      w="full"
      minH="80vh"
      align="center"
      justify="center"
    >
      <Online>
        <Box margin="8" w="full">
          <Header />
          <Box as="main" marginY={22}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Online>
      <Offline>
        <NoNetwork />
      </Offline>
    </Flex>
  );
};

export default Layout;
