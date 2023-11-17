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
  Input,
  Spinner,
  HStack,
} from '@chakra-ui/react';
import React, {
  createRef,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { TableBody, TableHead } from '../Utilis/TableData';
import { IMainForm } from '../Utilis/Schemas';
import dayjs from 'dayjs';
import { generateImageProfile } from './GenerateImage';
import { Flyer } from './Flyer';
import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useWindowSize } from 'react-use';
import { FlyerModal } from './FlyerModal';
const download = require('downloadjs');
import { db } from '../firebase/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ShegeFlyer } from './ShegeFlyer';
import { ShegeModal } from './ShegeModal';
import { AiFillDelete } from 'react-icons/ai';
import { useDebouncedCallback } from 'use-debounce';
import { EditUserModal } from './EditUserModal';
import getRandom from '../Utilis/getRandomArray';

export const DashboardPage = ({ data }: { data: any }) => {
  const pageRef = useRef();
  const shegeRef = useRef();
  const router = useRouter();
  const [info, setInfo] = useState<IMainForm>({});
  const [loading, setLoading] = useState({ id: '', state: false });
  const [dataUrl, setDataUrl] = useState('');
  const [selected, setSelected] = useState<any>([]);
  const [elRefs, setElRefs] = React.useState([]);
  const [dlRefs, setDlRefs] = React.useState([]);
  useEffect(() => {
    // add or remove refs
    setElRefs((elRefs) =>
      Array(selected.length)
        .fill(selected.length)
        .map((_, i) => elRefs[i] || createRef())
    );
    setDlRefs((dlRefs) =>
      Array(selected.length)
        .fill(selected.length)
        .map((_, i) => dlRefs[i] || createRef())
    );
  }, [selected]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpened,
    onClose: onClosed,
    onOpen: onOpened,
  } = useDisclosure();
  const {
    isOpen: isOpens,
    onClose: onCloses,
    onOpen: onOpens,
  } = useDisclosure();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const { width } = useWindowSize();
  const isMobile = width <= 750;
  const generateFlyer = (data: IMainForm, load: string, ref: any) => {
    setInfo(data as IMainForm);
    return generateImageProfile(
      data,
      ref,
      setLoading,
      onOpen,
      setDataUrl,
      load,
      load == 'multiple' ? true : false
    );
  };
  const generateShegeFlyer = (data: IMainForm, load: string, ref: any) => {
    setInfo(data as IMainForm);
    return generateImageProfile(
      data,
      ref,
      setLoading,
      onOpened,
      setDataUrl,
      load,
      load == 'multiple' ? true : false
    );
  };

  const downloadFlyer = async (info: IMainForm, dataUrl: string) => {
    const userRef = doc(db, 'user-biodata', info?.email as string);
    await updateDoc(userRef, {
      data: { ...info, processed: true },
    }).then(async () => {
      download(dataUrl, `${info?.nickName}.png`);
      onClose();
      setLoading({ id: '', state: false });
      !isMobile && router.refresh();
    });
  };
  const downloadShegeFlyer = async (info: IMainForm, dataUrl: string) => {
    download(dataUrl, `${info?.nickName} shege.png`);
    setLoading({ id: '', state: false });
    onClosed();
    !isMobile && router.refresh();
  };
  const deleteItem = async (data: IMainForm) => {
    setLoading({ id: data?.email as string, state: true });
    await deleteDoc(doc(db, 'user-biodata', data.email as string));
    router.refresh();
  };
  const editUserInfo = (data: IMainForm) => {
    setInfo(data);
    onOpens();
  };

  const asyncForEach = async (array: any, callback: any) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  };

  const nonProcessedUsers = !data.error
    ? data.filter((x: any) => !x?.data?.processed)
    : [];
  const downloadFiveRandomData = async () => {
    const items = getRandom(nonProcessedUsers, 5);
    const users = items?.map((item: any, i: number) => item.data);
    setSelected(users);
    await asyncForEach(users, async (user: IMainForm, i: number) => {
      await generateFlyer(user, 'multiple', dlRefs[i]).then((x: any) => {
        if (x !== undefined) {
          downloadFlyer(user, x);
        }
        return;
      });
      await generateShegeFlyer(user, 'multiple', elRefs[i]).then((x: any) => {
        if (x !== undefined) {
          downloadShegeFlyer(user, x);
        }
        return;
      });
    });
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const searchUser = useDebouncedCallback((value) => {
    router.push(pathname + '?' + createQueryString('search', value));
  }, 1000);

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
            <HStack
              justify="space-between"
              flexDir={['column', 'row']}
              my="1rem"
            >
              <Box>
                <Text fontWeight={600} fontSize="1.3rem">
                  Hello Admin,
                </Text>
                <Text mt="1rem">
                  List of students that have submitted their data (
                  {data?.length})
                </Text>
              </Box>
              <Button
                onClick={() => downloadFiveRandomData()}
                isLoading={loading.id == 'multiple'}
              >
                Download 5 Items
              </Button>
            </HStack>
            <Box mb="1rem">
              <Input
                placeholder="search by firstname"
                type="search"
                onChange={(e) => searchUser(e.target.value)}
              />
            </Box>
            <TableContainer w="full" maxH="100%">
              <Table border="1px solid #e5e5e5" variant="simple">
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
                    <TableHead name="Shege" />
                    <TableHead name="Delete" />
                  </Tr>
                </Thead>

                <Tbody>
                  {data.map((item: any, i: number) => {
                    const user: IMainForm = item.data;
                    return (
                      <Tr key={i}>
                        <TableBody
                          name={i + 1}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={`${user?.firstName} ${user?.lastName}`}
                          full
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={dayjs(user?.dob).format('MMM DD')}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={user?.favLecturer}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={user?.favCourse}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={user?.crush}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <TableBody
                          name={user.option}
                          border
                          value="1px solid #e5e5e5"
                        />
                        <Td
                          borderRight="1px solid #e5e5e5"
                          paddingInlineStart="1rem"
                        >
                          <Flex justify="center" pr="1rem">
                            {user?.processed ? (
                              <Icon as={BsCheckCircleFill} color="green.400" />
                            ) : (
                              <Icon as={FaTimesCircle} color="red.400" />
                            )}
                          </Flex>
                        </Td>
                        <Td
                          borderRight="1px solid #e5e5e5"
                          paddingInlineStart="1rem"
                        >
                          <Button
                            bgColor="black"
                            color="white"
                            fontSize=".8rem"
                            h="2.6rem"
                            onClick={() => {
                              setSelected([user]);
                              generateFlyer(
                                user,
                                user?.email as string,
                                dlRefs[0]
                              );
                            }}
                            isLoading={loading.id == user?.email}
                          >
                            View Flyer
                          </Button>
                        </Td>
                        <Td
                          borderRight="1px solid #e5e5e5"
                          paddingInlineStart="1rem"
                        >
                          <Button
                            bgColor="brand.100"
                            color="white"
                            fontSize=".8rem"
                            h="2.6rem"
                            onClick={() => {
                              setSelected([user]);
                              generateShegeFlyer(
                                user,
                                user?.nickName as string,
                                elRefs[0]
                              );
                            }}
                            isLoading={loading.id == user?.nickName}
                          >
                            View Shege
                          </Button>
                        </Td>
                        <Td>
                          <Flex justify="center" pr="1rem">
                            {loading?.id == user?.email && loading.state ? (
                              <Spinner />
                            ) : (
                              <Icon
                                as={AiFillDelete}
                                color="red"
                                onClick={() => deleteItem(user)}
                              />
                            )}
                          </Flex>
                        </Td>
                        <TableBody
                          name={'Edit'}
                          border
                          value="1px solid #e5e5e5"
                          onClick={() => editUserInfo(user)}
                        />
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box opacity={0} pos="absolute">
            {selected.map((x: IMainForm, i: number) => (
              <Flyer newRef={dlRefs[i]} data={x} />
            ))}
          </Box>
          <Box opacity={0} pos="absolute">
            {selected.map((x: IMainForm, i: number) => (
              <ShegeFlyer newRef={elRefs[i]} data={x} />
            ))}
          </Box>
        </>
      )}

      {isOpen && (
        <FlyerModal
          info={info}
          isOpen={isOpen}
          onClose={onClose}
          downloadFunc={downloadFlyer}
          dataUrl={dataUrl}
        />
      )}
      {isOpened && (
        <ShegeModal
          info={info}
          isOpen={isOpened}
          onClose={onClosed}
          downloadFunc={downloadShegeFlyer}
          dataUrl={dataUrl}
        />
      )}
      {isOpens && (
        <EditUserModal info={info} isOpen={isOpens} onClose={onCloses} />
      )}
    </Box>
  );
};
