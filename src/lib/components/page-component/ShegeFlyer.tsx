import React from 'react';
import { IMainForm } from '../Utilis/Schemas';
import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  Image,
  Square,
  Text,
  VStack,
} from '@chakra-ui/react';
import { TextBox } from '../Utilis/TextBox';
import { BsInstagram } from 'react-icons/bs';
import dayjs from 'dayjs';

export const ShegeFlyer = ({
  newRef,
  data,
}: {
  newRef?: any;
  data: IMainForm;
}) => {
  return (
    <Box
      ref={newRef}
      w="5in"
      h="5in"
      bgColor="white"
      color="black"
      borderBottom="3px solid"
      borderColor="brand.100"
      backgroundImage={'url(/assets/flo.jpeg)'}
      backgroundPosition="center"
      backgroundSize="contain"
      pos="relative"
    >
      <Box backgroundColor="rgba(256,256,256,.9)" h="full">
        <HStack justify="center" py="1.5rem" align="center">
          <Image src="/assets/logo.png" h="2rem" />
          <VStack gap="0">
            <Text
              fontSize=".7rem"
              fontWeight={600}
              fontFamily="'Baloo Bhaijaan 2', sans-serif"
            >
              Department of Pure and Applied Biology
            </Text>
            <Text fontSize=".7rem" fontFamily="'Baloo Bhaijaan 2', sans-serif">
              Ladoke Akintola University of Technology
            </Text>
          </VStack>
          <Image src="/assets/lau.png" h="2rem" />
        </HStack>
        <Box pos="relative" mx="auto" w="50%" my=".5rem">
          <Text
            fontFamily="'Molle', cursive"
            fontSize="1.2rem"
            fontWeight={500}
            pos="relative"
            zIndex={2}
          >
            My Shege Experience!
          </Text>
          <Text
            fontFamily="'Windsong', cursive"
            fontSize="1.2rem"
            fontWeight={500}
            pos="absolute"
            zIndex={1}
            top="35%"
            left="0"
            opacity=".7"
          >
            My Shege Experience!
          </Text>
        </Box>
        <Box w="70%" mx="auto" mt="1.5rem">
          <HStack gap="1rem" align="center" mb="2rem" justify="center">
            <Circle
              size="4rem"
              overflow="hidden"
              //   borderRadius="8px"
              //   boxShadow="0 0 8px 3px rgba(0,0,0,.1)"
            >
              <Image
                src={data?.image || '/assets/sample.jpg'}
                w="full"
                h="full"
                objectFit="cover"
              />
            </Circle>
            <VStack align="flex-start" gap="0">
              <Text
                fontSize="1.1rem"
                fontFamily="'Montserrat', sans-serif"
                fontWeight={700}
                color="brand.100"
                textTransform="uppercase"
              >
                {data?.nickName}
              </Text>
              <Text
                fontSize=".7rem"
                fontFamily="'Baloo Bhaijaan 2', sans-serif"
                fontWeight={500}
              >
                {`${data?.firstName} ${data?.lastName}`}
              </Text>
            </VStack>
          </HStack>
          <Box pos="relative" h="1.6in" my="1rem">
            <Flex
              h="full"
              w="full"
              //   boxShadow="0 0 8px 3px rgba(0,0,0,.1)"
              bgColor="white"
              borderRadius="20px"
              pos="relative"
              zIndex="2"
              overflow="hidden"
              align="center"
            >
              <Box pos="absolute" left="3%" top="0" transform="scaleX(-1)">
                <Text
                  fontFamily="'Passion One', sans-serif"
                  color="brand.100"
                  fontSize="3rem"
                >
                  "
                </Text>
              </Box>
              <Text
                fontSize=".8rem"
                fontFamily="'Baloo Bhaijaan 2', sans-serif"
                p="1.3rem 2.3rem 0"
                noOfLines={6}
              >
                {data?.shegeExperience}
              </Text>
              <Box
                pos="absolute"
                right="3%"
                bottom="0"
                transform="rotate(180deg) scaleX(-1)"
              >
                <Text
                  fontFamily="'Passion One', sans-serif"
                  color="brand.100"
                  fontSize="3rem"
                >
                  "
                </Text>
              </Box>
            </Flex>
            <Box
              p="1rem 1.5rem"
              h="full"
              w="full"
              //   boxShadow="0 0 8px 3px rgba(0,0,0,.1)"
              bgColor="brand.100"
              borderRadius="20px"
              pos="absolute"
              top="0"
              left="0"
              transform="rotate(-10deg)"
              zIndex="1"
            />
          </Box>
        </Box>

        <HStack justify="center" mt="2rem">
          <Text
            fontSize=".5rem"
            fontFamily="'Baloo Bhaijaan 2', sans-serif"
            fontWeight={500}
          >
            #FaceOfFinalist || #FaceOfThriamveftikos ||#PabClassOfXXIII
          </Text>
        </HStack>
        <HStack
          justify="center"
          mt=".5rem"
          fontSize=".7rem"
          fontFamily="'Baloo Bhaijaan 2', sans-serif"
        >
          <Icon as={BsInstagram} />
          <Text>| @thriamveftikos</Text>
        </HStack>
        <Box pos="absolute" right="1%" top="20%" filter="blur(2px)">
          <Image src="/assets/cap.png" />
        </Box>
      </Box>
    </Box>
  );
};
