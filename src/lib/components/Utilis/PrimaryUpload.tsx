import {
  FormControl,
  Circle,
  Spinner,
  Icon,
  FormErrorMessage,
  Box,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { BsImage } from 'react-icons/bs';
import { Widget } from '@uploadcare/react-widget';

export const PrimaryUpload = ({
  errors,
  imageUrl,
  widgetApi,
  uploadFunction,
}: {
  errors: any;
  imageUrl: any;
  widgetApi: any;
  uploadFunction: any;
}) => {
  return (
    <Box>
      <FormControl
        isInvalid={errors?.type === 'required' || errors?.message !== undefined}
      >
        <VStack>
          <Circle
            size="8rem"
            onClick={() => widgetApi.current.openDialog()}
            bgColor="blue.100"
            border={errors?.message !== undefined ? '2px solid red' : '0'}
            overflow="hidden"
          >
            {imageUrl?.loading ? (
              <Spinner size="sm" />
            ) : imageUrl.url ? (
              <Image
                src={imageUrl?.url?.cdnUrl}
                w="full"
                h="full"
                objectFit="cover"
              />
            ) : (
              <VStack>
                <Icon as={BsImage} fontSize="2rem" />
                <Text fontSize=".8rem" textAlign="center">
                  Tap here to add an image.
                </Text>
              </VStack>
            )}
          </Circle>
          <Text
            backgroundColor="blue.50"
            fontSize=".8rem"
            p=".4rem .8rem"
            borderRadius="4px"
          >
            Choose picture wey go fine sha cause as you pose na so you go show
            oo 🤣
          </Text>
          <FormErrorMessage fontSize=".7rem" color="red">
            {(errors?.type === 'optionality' && `An Image is required`) ||
              errors?.message}
          </FormErrorMessage>
        </VStack>
      </FormControl>
      <Box display="none">
        <Widget
          publicKey="fda3a71102659f95625f"
          clearable
          onFileSelect={uploadFunction}
          ref={widgetApi}
          systemDialog={true}
          imagesOnly
        />
      </Box>
    </Box>
  );
};
