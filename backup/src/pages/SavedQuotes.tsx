import { useEffect, useState } from 'react';
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast, VStack } from '@chakra-ui/react';
import { FaHeart, FaQuoteLeft, FaTrash } from 'react-icons/fa';

interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
}

export const SavedQuotes = () => {
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const toast = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('savedQuotes');
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }
  }, []);

  const handleRemoveQuote = (id: string) => {
    const updatedQuotes = savedQuotes.filter(quote => quote._id !== id);
    setSavedQuotes(updatedQuotes);
    localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
    
    toast({
      title: 'Quote removed',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  if (savedQuotes.length === 0) {
    return (
      <Flex direction="column" align="center" justify="center" minH="60vh">
        <Box textAlign="center" maxW="md">
          <FaHeart size={48} color="#ED64A6" style={{ margin: '0 auto 1rem' }} />
          <Heading size="lg" mb={4}>No saved quotes yet</Heading>
          <Text color="gray.400" mb={6}>
            Your favorite quotes will appear here. Start by saving some quotes from the home page!
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      <Heading size="lg" mb={6} color="white">
        Your Saved Quotes ({savedQuotes.length})
      </Heading>
      
      {savedQuotes.map((quote) => (
        <Card key={quote._id} bg="gray.800" color="white" borderWidth="1px" borderColor="gray.700">
          <CardHeader pb={0}>
            <Flex justify="space-between" align="center">
              <Box>
                <FaQuoteLeft size={20} color="#ED64A6" style={{ display: 'inline', marginRight: '8px', opacity: 0.7 }} />
                <Text as="span" fontSize="sm" color="pink.400">Saved Quote</Text>
              </Box>
              <IconButton
                icon={<FaTrash />}
                aria-label="Remove quote"
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={() => handleRemoveQuote(quote._id)}
              />
            </Flex>
          </CardHeader>
          <CardBody>
            <Text fontSize="lg" fontStyle="italic" mb={4}>
              {quote.content}
            </Text>
            <Text textAlign="right" fontWeight="bold" color="pink.400">
              — {quote.author}
            </Text>
            {quote.tags && quote.tags.length > 0 && (
              <Flex mt={4} wrap="wrap" gap={2}>
                {quote.tags.map((tag) => (
                  <Box
                    key={tag}
                    bg="pink.900"
                    color="pink.200"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                  >
                    {tag}
                  </Box>
                ))}
              </Flex>
            )}
          </CardBody>
        </Card>
      ))}
    </VStack>
  );
};
