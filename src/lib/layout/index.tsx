'use client';

import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

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
      <Box margin="8" w="full">
        <Header />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Flex>
  );
};

export default Layout;
