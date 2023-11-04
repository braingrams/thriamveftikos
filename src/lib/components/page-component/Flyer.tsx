import React from 'react';
import { IMainForm } from '../Utilis/Schemas';
import { Box, Flex, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { TextBox } from '../Utilis/TextBox';
import { BsInstagram } from 'react-icons/bs';
import dayjs from 'dayjs';

export const Flyer = ({ newRef, data }: { newRef: any; data: IMainForm }) => {
  return (
    <Box
      ref={newRef}
      w="5in"
      h="5in"
      bgColor="white"
      color="black"
      borderBottom="3px solid"
      borderColor="blue.600"
      backgroundImage={'url(/assets/conf.png)'}
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
        <HStack align="center" h="3.8in" px="0rem" gap="2rem">
          <Box w="full" h="full" pl="2rem">
            <Text
              fontFamily="'Russo One', sans-serif"
              fontSize="1.8rem"
              fontWeight={500}
              textAlign="center"
              color="blue.600"
            >
              Thriamveftikos
            </Text>
            <Text
              mt="-1rem"
              fontFamily="'Dancing Script', cursive"
              textAlign="center"
              fontSize="1.2rem"
            >
              Of the day!
            </Text>
            <Box
              w="full"
              h="3in"
              // transform="rotate(-5deg)"
              //   bgColor="white"
              bgImage="url(/assets/framea.png)"
              bgSize="contain"
              bgRepeat="no-repeat"
              p="1.3rem"
            >
              <Box w="100%" h="100%" overflow="hidden">
                <Image
                  src={data?.image || '/assets/sample.jpg'}
                  w="full"
                  h="full"
                  objectFit="cover"
                />
              </Box>
              <VStack mx="auto" gap="0" mt="1rem">
                <Text
                  fontFamily="'UnifrakturCook', cursive"
                  fontSize="1.1rem"
                  textAlign="center"
                  color="blue.600"
                >
                  {data?.firstName} {data?.lastName}
                </Text>
                <HStack
                  fontSize=".5rem"
                  gap=".2rem"
                  bgColor="black"
                  color="white"
                  p=".1rem .7rem"
                  borderRadius="20px"
                  fontFamily="'Baloo Bhaijaan 2', sans-serif"
                >
                  <Icon as={BsInstagram} />
                  <Text>@{data?.instagram}</Text>
                </HStack>
              </VStack>
            </Box>
          </Box>

          <VStack w="full" justify="flex-end" h="full">
            <VStack w="full" align="flex-start" gap="0rem">
              <TextBox title="Nickname" value={data?.nickName} />
              <TextBox title="Option" value={data?.option} />
              <TextBox title="DOB" value={dayjs(data?.dob).format('MMM DD')} />
              <TextBox title="Favourite Lecturer" value={data?.favLecturer} />
              <TextBox title="Favourite Course" value={data?.favCourse} />
              <TextBox title="Hobbie" value={data?.hobbie} />
              <TextBox title="Departmental Crush" value={data?.crush} />
            </VStack>
            <Box
              bgColor="blue.600"
              p=".5rem 1rem"
              w="full"
              ml="auto"
              mt=".7rem"
              color="white"
              borderRadius="6px 0 0 6px"
            >
              <Text
                fontSize=".8rem"
                fontFamily="'Baloo Bhaijaan 2', sans-serif"
              >
                Motivational Quote:
              </Text>
              <Text
                fontSize=".5rem"
                fontFamily="'Baloo Bhaijaan 2', sans-serif"
              >
                {data?.quote}
              </Text>
            </Box>
          </VStack>
        </HStack>
        <HStack justify="center" mt="1rem">
          <Text fontSize=".5rem" fontFamily="'Baloo Bhaijaan 2', sans-serif">
            #FaceOfFinalist || #FaceOfThriamveftikos
          </Text>
        </HStack>
        <Box pos="absolute" right="1%" top="20%" filter="blur(2px)">
          <Image src="/assets/cap.png" />
        </Box>
      </Box>
    </Box>
  );
};
