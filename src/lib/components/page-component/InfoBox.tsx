import { Box, Flex, Text } from '@chakra-ui/react';

export interface cardType {
  label: string;
  value: string | number | undefined;
}
function InfoBox({ label, value }: cardType) {
  return (
    <Box
      bgColor="white"
      fontWeight="semibold"
      borderRadius="4px"
      boxShadow="0 2px 2px 0 rgba(0,0,0,0.12)"
      h="5rem"
      padding="1rem"
    >
      <Flex justifyContent="space-between" mb="3rem" alignItems="center">
        <Text fontSize="12px">{label}</Text>
      </Flex>
      <Text fontSize="30px">{value}</Text>
    </Box>
  );
}

export default InfoBox;
