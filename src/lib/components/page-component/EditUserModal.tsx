import React, { useRef, useState } from 'react';
import { IMainForm } from '../Utilis/Schemas';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Flex,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryDate } from '../Utilis/PrimaryDate';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { PrimarySelect } from '../Utilis/PrimarySelect';
import { PrimaryTextArea } from '../Utilis/PrimaryTextArea';
import { PrimaryUpload } from '../Utilis/PrimaryUpload';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({});

export const EditUserModal = ({
  isOpen,
  onClose,
  info,
}: {
  isOpen: boolean;
  onClose: any;
  info: IMainForm;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IMainForm>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      processed: false,
      email: info?.email,
      firstName: info?.firstName,
      lastName: info?.lastName,
      nickName: info?.nickName,
      dob: info?.dob,
      option: info?.option,
      quote: info?.quote,
      image: info?.image,
      favLecturer: info?.favLecturer,
      favCourse: info?.favCourse,
      crush: info?.crush,
      relationshipStatus: info?.relationshipStatus,
      instagram: info?.instagram,
      shegeExperience: info?.shegeExperience,
    },
  });

  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const widgetApi = useRef<any>();
  const [imageUrl, setimageUrl] = useState<any>({
    loading: false,
    url: { cdnUrl: info.image },
  });

  const uploadFunction = (file: any) => {
    if (file) {
      file.progress((info: any) => {
        setimageUrl({ loading: true });
      });
      file.done((info: any) => {
        setimageUrl({ loading: false, url: info });
      });
    }
  };

  const downloadFunc = async (data: IMainForm) => {
    data.image = imageUrl?.url.cdnUrl;
    const userRef = doc(db, 'user-biodata', info?.email as string);
    await updateDoc(userRef, {
      data: { ...data },
    });
    setSuccess(true);
    router.refresh();
    setTimeout(() => {
      onClose();
    }, 3000);
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) " />

      <ModalContent
        py={5}
        borderRadius="0px"
        w={['88%', '30%']}
        overflow="hidden"
        maxH="100vh"
        pos="fixed"
        mt="1rem"
        mb="1rem"
        maxW="100%"
      >
        <ModalBody overflow="auto">
          {success ? (
            <Box
              bgColor="green.100"
              borderRadius="5px"
              p=".5rem 1rem"
              mb="1rem"
            >
              <Text>Update successful! Tadaaaaa 🎉</Text>
            </Box>
          ) : (
            <form onSubmit={handleSubmit(downloadFunc)}>
              <VStack w="full">
                <PrimaryUpload
                  errors={errors.image}
                  imageUrl={imageUrl}
                  uploadFunction={uploadFunction}
                  widgetApi={widgetApi}
                />
                <PrimaryInput<IMainForm>
                  name="email"
                  register={register}
                  placeholder="tade@gmail.com"
                  error={errors.email}
                  label="Email Address"
                  type="email"
                  readonly
                />
                <PrimaryInput<IMainForm>
                  name="firstName"
                  register={register}
                  placeholder="Type in here"
                  error={errors.firstName}
                  label="First Name"
                />
                <PrimaryInput<IMainForm>
                  name="lastName"
                  register={register}
                  placeholder="Type in here"
                  error={errors.lastName}
                  label="Last Name"
                />
                <PrimaryInput<IMainForm>
                  name="nickName"
                  register={register}
                  placeholder="Type in here"
                  error={errors.nickName}
                  label="NickName"
                />
                <PrimaryDate<IMainForm>
                  name="dob"
                  control={control}
                  placeholder={dayjs(info?.dob).format('MMM DD')}
                  error={errors.dob}
                  label="DOB"
                />
                <PrimaryInput<IMainForm>
                  name="favLecturer"
                  register={register}
                  placeholder="Type in here"
                  error={errors.favLecturer}
                  label="Favourite Lecture"
                />
                <PrimaryInput<IMainForm>
                  name="favCourse"
                  register={register}
                  placeholder="Type in here"
                  error={errors.favCourse}
                  label="Favourite Course"
                />
                <PrimaryInput<IMainForm>
                  name="hobbie"
                  register={register}
                  placeholder="Type in here"
                  error={errors.hobbie}
                  label="Hobbie"
                />
                <PrimaryInput<IMainForm>
                  name="relationshipStatus"
                  register={register}
                  placeholder="Type in here"
                  error={errors.relationshipStatus}
                  label="Relationship status"
                />
                <PrimaryInput<IMainForm>
                  name="crush"
                  register={register}
                  placeholder="Type in here"
                  error={errors.crush}
                  label="Departmental Crush"
                />
                <PrimaryInput<IMainForm>
                  name="instagram"
                  register={register}
                  placeholder="Type in here"
                  error={errors.instagram}
                  label="Instagram Username"
                />
                <PrimarySelect<IMainForm>
                  name="option"
                  register={register}
                  placeholder="Choose your option"
                  error={errors.option}
                  options={
                    <>
                      {['Microbiology', 'Environmental'].map((x) => (
                        <option value={x} key={x}>
                          {x}
                        </option>
                      ))}
                    </>
                  }
                  label="Option"
                />
                <PrimaryTextArea<IMainForm>
                  name="quote"
                  register={register}
                  placeholder="Type in here"
                  error={errors.quote}
                  label="Favourite Quote"
                />
                <PrimaryTextArea<IMainForm>
                  name="shegeExperience"
                  register={register}
                  placeholder="Type in here"
                  error={errors.shegeExperience}
                  label="Describe your shege experience"
                />

                <Button
                  type="submit"
                  bgColor="black"
                  color="white"
                  w="full"
                  mx="auto"
                  h="3rem"
                  borderRadius="8px"
                  mt="2rem"
                  isLoading={isSubmitting}
                >
                  Update Information
                </Button>
              </VStack>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
