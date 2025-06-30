import { useState } from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Spinner, Text, useToast } from '@chakra-ui/react';
import { FaHeart, FaQuoteLeft, FaSync } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
}

export const Home = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const toast = useToast();

  const { data: quote, isLoading, refetch, isFetching } = useQuery<Quote>({
    queryKey: ['quote'],
    queryFn: async () => {
      const { data } = await axios.get('https://api.quotable.io/random');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const handleSaveQuote = () => {
    if (!quote) return;
    
    setSavedQuotes(prev => {
      // Check if quote is already saved
      if (prev.some(q => q._id === quote._id)) {
        toast({
          title: 'Quote already saved!',
          status: 'info',
          duration: 2000,
          isClosable: true,
        });
        return prev;
      }
      
      const newSavedQuotes = [...prev, quote];
      localStorage.setItem('savedQuotes', JSON.stringify(newSavedQuotes));
      
      toast({
        title: 'Quote saved!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      
      return newSavedQuotes;
    });
  };

  const handleNewQuote = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="60vh">
        <Spinner size="xl" color="pink.500" />
      </Flex>
    );
  }

  return (
    <Box maxW="2xl" mx="auto">
      <Card bg="gray.800" color="white" borderWidth="1px" borderColor="gray.700">
        <CardHeader>
          <Heading size="md">Motivational Quote</Heading>
        </CardHeader>
        
        <CardBody>
          <Box position="relative" p={4}>
            <FaQuoteLeft size={24} color="#ED64A6" style={{ opacity: 0.2, position: 'absolute', top: 0, left: 0 }} />
            <Text fontSize="xl" fontStyle="italic" px={8} py={2}>
              {quote?.content}
            </Text>
            <Text textAlign="right" mt={4} fontWeight="bold" color="pink.400">
              — {quote?.author}
            </Text>
            <Flex mt={4} wrap="wrap" gap={2}>
              {quote?.tags.map((tag) => (
                <Box
                  key={tag}
                  bg="pink.900"
                  color="pink.200"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  {tag}
                </Box>
              ))}
            </Flex>
          </Box>
        </CardBody>
        
        <CardFooter justify="space-between" flexWrap="wrap">
          <Button
            leftIcon={<FaHeart />}
            colorScheme="pink"
            variant="outline"
            onClick={handleSaveQuote}
            isDisabled={!quote}
          >
            Save Quote
          </Button>
          <Button
            leftIcon={<FaSync />}
            colorScheme="pink"
            variant="solid"
            onClick={handleNewQuote}
            isLoading={isFetching}
            loadingText="Loading..."
          >
            New Quote
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};
