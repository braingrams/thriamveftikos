import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://bamfolio.netlify.app"
          isExternal
          rel="noopener noreferrer"
        >
          Developed with ♡ by Brain for PAB class XXIII
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
