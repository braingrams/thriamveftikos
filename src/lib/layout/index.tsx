'use client';

import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Online, Offline } from 'react-detect-offline';

import Footer from './Footer';
import Header from './Header';
import { NoNetwork } from '../components/page-component/NoNetwork';
import { usePathname } from 'next/navigation';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isUserLoggedIn = pathname.startsWith('/user');
  return (
    <Box>
      <Online>
        {isUserLoggedIn ?<Box> <Header /> <Box margin="8" w="full">
            <Box as="main" marginY={22}>
              {children}
            </Box>
            <Footer />
          </Box> </Box> : (

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
            <Box as="main" marginY={22}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Flex>
        )}
      </Online>
      <Offline>
        <NoNetwork />
      </Offline>
    </Box>
  );
};

export default Layout;
