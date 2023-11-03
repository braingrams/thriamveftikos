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
      borderBottom="3px solid goldenrod"
      backgroundImage={'url(/assets/conf.png)'}
      backgroundPosition="center"
      backgroundSize="contain"
      pos="relative"
    >
      <Box backgroundColor="rgba(256,256,256,.8)" h="full">
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
        <HStack align="center" h="3in" px="3rem" gap="2rem">
          <Box w="full" h="full">
            <Text
              fontFamily="'Russo One', sans-serif"
              fontSize="1.2rem"
              fontWeight={500}
              textAlign="center"
              color="goldenrod"
            >
              Thriamveftikos
            </Text>
            <Text
              mt="-1rem"
              fontFamily="'Dancing Script', cursive"
              textAlign="center"
            >
              Of the day!
            </Text>
            <Box
              w="full"
              h="full"
              transform="rotate(-5deg)"
              //   bgColor="white"
              bgImage="url(/assets/framea.png)"
              bgSize="contain"
              bgRepeat="no-repeat"
              p="1.2rem"
            >
              <Box w="full" h="87%" overflow="hidden">
                <Image src={data?.image} w="full" h="full" objectFit="cover" />
              </Box>
              <VStack mx="auto" gap="0" mt="1.5rem">
                <Text
                  fontFamily="'UnifrakturCook', cursive"
                  fontSize="1.2rem"
                  textAlign="center"
                >
                  {data?.firstName}
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

          <VStack w="full" align="flex-start" gap="0">
            <TextBox title="Nickname" value={data?.nickName} />
            <TextBox title="Option" value={data?.option} />
            <TextBox title="DOB" value={dayjs(data?.dob).format('MMM DD')} />
            <TextBox title="Favourite Lecturer" value={data?.favLecturer} />
            <TextBox title="Favourite Course" value={data?.favCourse} />
            <TextBox title="Hobbie" value={data?.hobbie} />
            <TextBox title="Departmental Crush" value={data?.crush} />
          </VStack>
        </HStack>
        <Box
          bgColor="goldenrod"
          p=".5rem 1rem"
          w="48%"
          ml="auto"
          mt=".7rem"
          color="white"
          borderRadius="6px 0 0 6px"
        >
          <Text fontSize=".8rem" fontFamily="'Baloo Bhaijaan 2', sans-serif">
            Motivational Quote:
          </Text>
          <Text fontSize=".5rem" fontFamily="'Baloo Bhaijaan 2', sans-serif">
            {data?.quote}
          </Text>
        </Box>
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
