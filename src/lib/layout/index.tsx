'use client';

import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { Online, Offline } from 'react-detect-offline';

import Footer from './Footer';
import Header from './Header';
import { NoNetwork } from '../components/page-component/NoNetwork';
import { usePathname } from 'next/navigation';
import { UserProvider } from '../Context/UserContext';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const isUserLoggedIn = pathname.startsWith('/user');
  return (
    <UserProvider>
      <Box>
        <Online>
          {isUserLoggedIn ? (
            <Box>
              <Header />
              <Box as="main" marginY={22} w="80%" mx="auto">
                {children}
              </Box>
              <Footer />
            </Box>
          ) : (
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
    </UserProvider>
  );
};

export default Layout;
