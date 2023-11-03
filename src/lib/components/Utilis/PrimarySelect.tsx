import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Select,
  Text,
} from '@chakra-ui/react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { FaCaretDown } from 'react-icons/fa6';
interface FormInputProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  placeholder: string;
  register: UseFormRegister<TFormValues>;
  required?: boolean;
  validate?: any;
  error?: FieldError | undefined;
  label?: string;
  fontSize?: string;
  options: any;
  defaultValue?: any;
  disabled?: boolean;
  borderColor?: string;
  h?: any;
  readonly?: boolean;
}
export const PrimarySelect = <TFormValues extends Record<string, any>>({
  name,
  placeholder,
  register,
  required = false,
  validate = {},
  error,
  label = '',
  fontSize = '1rem',
  options,
  defaultValue,
  disabled,
  h = '2.8rem',
  borderColor = 'gray.300',
  readonly,
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
      <Select
        {...register(name, { required, ...validate })}
        w="full"
        border="1px solid"
        borderRadius="0"
        borderColor={borderColor}
        height={h}
        fontSize=".9rem"
        textTransform="capitalize"
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        isReadOnly={readonly}
        // isReadOnly
        icon={<Icon as={FaCaretDown} fontSize={fontSize} />}
      >
        {/* <option disabled>{placeholder}</option> */}
        {options}
      </Select>
      <FormErrorMessage fontSize=".7rem" textTransform="capitalize">
        {(error?.type === 'required' && `${label} is required`) ||
          error?.message}
      </FormErrorMessage>
    </FormControl>
  );
};
