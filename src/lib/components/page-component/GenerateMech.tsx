'use client';
import { collection, getDocs, query, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import { PrimaryInput } from '../Utilis/PrimaryInput';
import Logo from '../Utilis/Logo';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface merchForm {
  title: string;
  price: number;
}

const schema = yup.object().shape({});

const GenerateMech = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<merchForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  async function LoadAcct() {
    const q = query(collection(db, 'user-biodata'));
    const batch = writeBatch(db);
    setLoading(true);
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const updateObject = {};
        //@ts-ignore
        updateObject[`data.${watch('title')}`] = watch('price');
        const docRef = doc.ref;
        batch.update(docRef, updateObject);
        // batch.update(docRef, { merchFee: deleteField() });
      });
      await batch.commit();
      setLoading(false);
      setError('Batch Update Successful');
      console.log('Batch update successful');
      router.refresh();
    } catch (error) {
      setLoading(false);
      setError('Error updating documents: Check console for more info');
      console.error('Error updating documents:', error);
    }
  }
  return (
    <Box>
      <Box h="5rem" mx="auto" w="fit-content" mb="1rem">
        <Logo height="100%" />
      </Box>
      <VStack w="full">
        <Text color="red" fontSize=".9rem">
          {error}
        </Text>
        <PrimaryInput<merchForm>
          name="title"
          register={register}
          placeholder="merchFee"
          error={errors.title}
          label="Name on field?"
          type="text"
        />
        <PrimaryInput<merchForm>
          name="price"
          register={register}
          placeholder="2000"
          error={errors.price}
          label="Price?"
          type="text"
        />
        <Button
          bgColor="black"
          color="white"
          w="full"
          mx="auto"
          h="3rem"
          borderRadius="8px"
          mt="2rem"
          onClick={LoadAcct}
          isLoading={loading}
        >
          Load
        </Button>
      </VStack>
    </Box>
  );
};

export default GenerateMech;
