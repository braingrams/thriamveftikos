import {
  Box,
  Circle,
  Flex,
  HStack,
  VStack,
  Image,
  Text,
  Icon,
} from '@chakra-ui/react';

import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { IMainForm } from '../components/Utilis/Schemas';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Header = () => {
  const { user } = useContext(UserContext);
  const data: IMainForm = user;
  const router = useRouter();
  const logOut = () => {
    Cookies.remove('user-info');
    router.push('/login');
  };
  function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  }
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      p="2rem"
      justify="space-between"
    >
      <HStack>
        <Circle size="4rem" bgColor="blue.100" overflow="hidden">
          <Image src={data?.image} w="full" h="full" objectFit="cover" />
        </Circle>
        <VStack align="flex-start" gap="0">
          <Text
            fontSize=".7rem"
            fontFamily="'Baloo Bhaijaan 2', sans-serif"
            fontWeight={500}
            textTransform="capitalize"
          >
            {getGreeting()}
          </Text>
          <Text
            fontSize="1.1rem"
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
            color="brand.100"
            // textTransform="uppercase"
          >
            {data?.firstName}
          </Text>
        </VStack>
      </HStack>
      <Icon as={RiLogoutBoxLine} onClick={() => logOut()} />
    </Flex>
  );
};

export default Header;
