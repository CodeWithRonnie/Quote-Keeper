import { Box, Flex, Button, useColorModeValue, Heading, HStack, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {
  const bg = useColorModeValue('gray.800', 'gray.900');
  const color = useColorModeValue('white', 'white');

  return (
    <Box bg={bg} px={4} boxShadow="md">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxW="container.lg" mx="auto">
        <Heading size="md" color={color}>
          Quote Keeper
        </Heading>
        
        <HStack spacing={4}>
          <ChakraLink as={RouterLink} to="/">
            <Button variant="ghost" colorScheme="pink">
              Home
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/saved">
            <Button variant="ghost" colorScheme="pink">
              Saved Quotes
            </Button>
          </ChakraLink>
        </HStack>
      </Flex>
    </Box>
  );
};
