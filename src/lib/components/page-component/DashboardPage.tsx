'use client';
import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  VStack,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { TableBody, TableHead } from '../Utilis/TableData';
import { IMainForm } from '../Utilis/Schemas';
import dayjs from 'dayjs';
import { generateImageProfile } from './GenerateImage';
import { Flyer } from './Flyer';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';
import { FlyerModal } from './FlyerModal';
const download = require('downloadjs');

export const DashboardPage = ({ data }: { data: any }) => {
  const pageRef = useRef();
  const router = useRouter();
  const [info, setInfo] = useState<IMainForm>({});
  const [loading, setLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { width } = useWindowSize();
  const isMobile = width <= 750;
  const generateFlyer = (data: IMainForm) => {
    setInfo(data as IMainForm);
    generateImageProfile(data, pageRef, setLoading, onOpen, setDataUrl);
  };

  const downloadFlyer = () => {
    download(dataUrl, `${data?.nickName}.png`);
    onClose();
    !isMobile && router.refresh();
  };
  return (
    <Box h="100vh" overflowX="hidden" pos="relative">
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        <Image src="/assets/logo.png" h="full" />
      </Box>
      {data.error ? (
        <VStack>
          <Text fontWeight={700} fontSize="1.3rem">
            Access Denied!
          </Text>
          <Text>You have to be logged in to view this page</Text>
          <Link passHref href={'/admin/login'}>
            <Button px="3rem">Login</Button>
          </Link>
        </VStack>
      ) : (
        <>
          <Box p="0 2rem">
            <Text my="1rem" fontWeight={600} fontSize="1.3rem">
              Hello Admin,
            </Text>
            <Text mb="1rem">
              List of students that have submitted their data
            </Text>
            <TableContainer w="full" maxH="90vh">
              <Table>
                <Thead>
                  <Tr>
                    <TableHead name="S/N" />
                    <TableHead name="Full Name" />
                    <TableHead name="DOB" />
                    <TableHead name="Fav. Lecturer" />
                    <TableHead name="Fav. Course" />
                    <TableHead name="Crush" />
                    <TableHead name="Option" />
                    <TableHead name="Status" />
                    <TableHead name="Action" />
                  </Tr>
                </Thead>

                <Tbody>
                  {data.map((item: any, i: number) => {
                    const user: IMainForm = item.data;
                    return (
                      <Tr key={i}>
                        <TableBody name={i + 1} />
                        <TableBody
                          name={`${user?.firstName} ${user?.lastName}`}
                          breakWord
                        />
                        <TableBody name={dayjs(user?.dob).format('MMM DD')} />
                        <TableBody name={user?.favLecturer} />
                        <TableBody name={user?.favCourse} />
                        <TableBody name={user?.crush} />
                        <TableBody name={user.option} />
                        <Td>
                          <Flex justify="center" pr="1rem">
                            {user?.processed ? (
                              <Icon as={BsCheckCircleFill} color="green.400" />
                            ) : (
                              <Icon as={FaTimesCircle} color="red.400" />
                            )}
                          </Flex>
                        </Td>
                        <td>
                          <Button
                            bgColor="black"
                            color="white"
                            fontSize=".8rem"
                            h="2.6rem"
                            onClick={() => generateFlyer(user)}
                            isLoading={loading}
                          >
                            View Flyer
                          </Button>
                        </td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box opacity={0} pos="absolute">
            <Flyer newRef={pageRef} data={info} />
          </Box>
        </>
      )}

      {isOpen && (
        <FlyerModal
          info={info}
          isOpen={isOpen}
          onClose={onClose}
          pageRef={pageRef}
          downloadFunc={downloadFlyer}
        />
      )}
    </Box>
  );
};
