'use client';

import { Box, Button, VStack, Text, Image } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import { IMainForm } from '../Utilis/Schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PrimaryTextArea } from '../Utilis/PrimaryTextArea';
import { PrimaryDate } from '../Utilis/PrimaryDate';
import { PrimarySelect } from '../Utilis/PrimarySelect';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { PrimaryUpload } from '../Utilis/PrimaryUpload';
import { responseGenerate } from './gptAi';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  nickName: yup.string().required(),
  dob: yup.string().required(),
  option: yup.string().required(),
  quote: yup
    .string()
    .required()
    .max(90, 'Maximum number of charcter allowed is 90'),
  image: yup.string().required(),
  favLecturer: yup.string().required(),
  favCourse: yup.string().required(),
  crush: yup.string().required(),
  relationshipStatus: yup.string().required(),
  instagram: yup.string().required(),
});

export const FormPage = () => {
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
    },
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const widgetApi = useRef<any>();
  const [imageUrl, setimageUrl] = useState<any>({ loading: false, url: '' });
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

  const onSubmit = async (data: IMainForm) => {
    const userDocRef = doc(db, 'user-biodata', data.email as string);
    const userDocSnapshot = await getDoc(userDocRef);
    try {
      if (userDocSnapshot.exists()) {
        setError(true);
      } else {
        await setDoc(userDocRef, {
          data,
        }).then(async () => {
          responseGenerate(data, setMessage, setSuccess);
        });
        reset();
      }
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    setValue('image', imageUrl?.url?.cdnUrl);
    trigger('image');
  }, [imageUrl]);
  return (
    <Box>
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        <Image src="/assets/logo.png" h="full" />
      </Box>
      {success ? (
        <Box bgColor="green.50" borderRadius="5px" p=".5rem 1rem">
          <Text textAlign="center" fontSize=".8rem">
            {message}
          </Text>
        </Box>
      ) : (
        <Box>
          <Text fontSize="1.3rem" fontWeight={700} textAlign="center" mb="1rem">
            Fill in the form Below!
          </Text>
          {error && (
            <Box bgColor="red.190" borderRadius="5px" p=".5rem 1rem" mb="1rem">
              <Text>
                Duplicate record Detected. It seems you have submitted your data
                before. if not, contact any committee member for help
              </Text>
            </Box>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
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
                placeholder="Dec 15"
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
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      )}
    </Box>
  );
};
