import { Td, Th, Text } from '@chakra-ui/react';

export function TableHead({
  name,
  border,
  value,
  borderColor,
  p = '1rem',
}: {
  name: string | number | undefined | null;
  border?: boolean | undefined;
  value?: string;
  borderColor?: string;
  p?: any;
}) {
  return (
    <Th
      borderRight={border ? value : 0}
      borderColor={borderColor}
      borderRightColor={borderColor}
      color="inherit"
      paddingInlineStart={p}
    >
      {name}
    </Th>
  );
}

export function TableBody({
  name,
  border,
  value,
  borderColor,
  classes,
  full,
  fontWeight = '400',
  customColor,
  breakWord,
  onClick,
}: {
  name: any;
  border?: boolean | undefined;
  value?: string;
  borderColor?: string;
  classes?: any;
  full?: boolean;
  fontWeight?: string;
  customColor?: any;
  breakWord?: any;
  onClick?: any;
}) {
  return (
    <Td
      borderColor={borderColor}
      borderRight={border ? value : 0}
      borderRightColor={borderColor}
      paddingInlineStart="1rem"
      className={classes}
      fontWeight={fontWeight}
      maxW={breakWord ? '150px' : 'unset'}
      textTransform="capitalize"
      onClick={onClick}
      cursor="pointer"
      // textOverflow=""
      // overflow="hidden"
      // noOfLines={1}
      color={
        name == 'pending'
          ? 'brand.100'
          : name == 'success'
          ? 'brand.300'
          : customColor
          ? 'red.600'
          : 'black'
      }
    >
      <Text whiteSpace={breakWord ? 'normal' : 'unset'}>
        {full ? name : name?.toString()?.substring(0, 20) || ''}
      </Text>
    </Td>
  );
}
