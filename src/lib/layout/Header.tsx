import {
  Box,
  Circle,
  Flex,
  HStack,
  VStack,
  Image,
  Text,
} from '@chakra-ui/react';

import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { IMainForm } from '../components/Utilis/Schemas';

const Header = () => {
  const { user } = useContext(UserContext);
  const data: IMainForm = user;
  return (
    <Flex as="header" width="full" align="center" p="2rem">
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
            Good day
          </Text>
          <Text
            fontSize="1.1rem"
            fontFamily="'Montserrat', sans-serif"
            fontWeight={700}
            color="brand.100"
            textTransform="uppercase"
          >
            {data?.firstName}
          </Text>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default Header;
