import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { FieldError, UseFormRegister, Path } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder?: string;
  fontSize?: string;
  label?: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError | undefined;
  type?: string;
  required?: boolean;
  disableLabel?: boolean;
  validate?: any;
  icon?: boolean;
  variant?: string;
  borderColor?: string;
  borderRadius?: string;
  placeholderColor?: string;
  defaultValue?: any;
  format?: string;
  value?: string | number | undefined;
  testId?: string;
  w?: string;
  padding?: string;
  onChange?: any;
  iconClass?: string | undefined;
  changePasswordType?: any;
  passwordVisible?: boolean;
  border?: string;
  h?: string;
  readonly?: boolean;
}
export const PrimaryInput = <TFormValues extends Record<string, any>>({
  name,
  required = false,
  type = 'text',
  label = '',
  register,
  validate = {},
  error,
  disableLabel = false,
  placeholder = '',
  fontSize = '1rem',
  passwordVisible,
  defaultValue,
  changePasswordType,
  border,
  borderColor = 'gray.300',
  icon,
  h = '2.8rem',
  w = 'full',
  readonly = false,
}: FormInputProps<TFormValues>) => {
  return (
    <FormControl
      isInvalid={error?.type === 'required' || error?.message !== undefined}
    >
      <FormLabel
        htmlFor={label}
        textTransform="capitalize"
        pos="relative"
        top={5}
        left={4}
        width="fit-content"
        zIndex={3}
        bg="white"
        fontSize={fontSize}
      >
        {label}
      </FormLabel>

      <InputGroup>
        <Input
          type={type}
          placeholder={placeholder}
          variant="outline"
          {...register(name, { required, ...validate })}
          defaultValue={defaultValue}
          disabled={disableLabel}
          border={border}
          borderColor={borderColor}
          borderRadius="0"
          h={h}
          w={w}
          isReadOnly={readonly}
          // role="presentation"
          // autoComplete="off"
        />
        {icon && (
          <InputRightElement
            onClick={() => changePasswordType()}
            cursor="pointer"
            color="brand.100"
          >
            {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage fontSize=".7rem" color="red">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
