'use client';

import {
  Box,
  Button,
  VStack,
  Text,
  Image,
  Circle,
  Icon,
  Spinner,
} from '@chakra-ui/react';
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
import OpenAIApi from 'openai';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.string().required(),
  option: yup.string().required(),
  quote: yup.string().required(),
  image: yup.string().required(),
});

export const FormPage = () => {
  const openai = new OpenAIApi({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [message, setMessage] = useState('');

  const responseGenerate = async (data: IMainForm) => {
    let completeOptions = {
      prompt: ` "${data.firstName}"`,
      model: 'text-davinci-003',
      // model: 'gpt-3.5-turbo',
      max_tokens: 256,
      temperature: 0.7,
      n: 1,
      stop: '.',
      top_p: 1,
      frequency_penalty: 0,
      presense_penalty: 0,
    };

    const response = await openai.completions.create(completeOptions as any);

    console.log({ response });
    if (response.choices) {
      setMessage(response.choices[0].text);
    }
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IMainForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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
    console.log('Yeah');
    const userDocRef = doc(db, 'user-biodata', data.email as string);
    const userDocSnapshot = await getDoc(userDocRef);
    try {
      if (userDocSnapshot.exists()) {
        setError(true);
      } else {
        await setDoc(userDocRef, {
          data,
        }).then(() => {
          responseGenerate(data);
          setSuccess(true);
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
          <Text>{message}</Text>
        </Box>
      ) : (
        <Box>
          <Text fontSize="1.8rem" fontWeight={700} textAlign="center" mb="1rem">
            Fill in the form Below!
          </Text>
          {error && (
            <Box bgColor="red.50" borderRadius="5px" p=".5rem 1rem">
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
                placeholder="Tade"
                error={errors.firstName}
                label="First Name"
              />
              <PrimaryInput<IMainForm>
                name="lastName"
                register={register}
                placeholder="Tade"
                error={errors.lastName}
                label="Last Name"
              />
              <PrimaryDate<IMainForm>
                name="dob"
                control={control}
                placeholder="Dec 15"
                error={errors.dob}
                label="DOB"
              />
              <PrimaryTextArea<IMainForm>
                name="quote"
                register={register}
                placeholder="Tade"
                error={errors.quote}
                label="Favourite Quote"
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
