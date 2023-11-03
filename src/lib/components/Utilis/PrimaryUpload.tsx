import {
  FormControl,
  Circle,
  Spinner,
  Icon,
  FormErrorMessage,
  Box,
  Image,
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
        <Circle
          size="8rem"
          onClick={() => widgetApi.current.openDialog()}
          bgColor="blue.100"
          border={errors?.message !== undefined ? '2px solid red' : '0'}
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
            <Icon as={BsImage} fontSize="2rem" />
          )}
        </Circle>
        <FormErrorMessage fontSize=".7rem" color="red">
          {(errors?.type === 'optionality' && `An Image is required`) ||
            errors?.message}
        </FormErrorMessage>
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
