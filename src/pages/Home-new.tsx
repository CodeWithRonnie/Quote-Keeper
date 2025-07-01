import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  CardFooter, 
  CardHeader, 
  Container,
  Flex, 
  Heading, 
  IconButton, 
  Spinner, 
  Text, 
  Tooltip, 
  useColorModeValue,
  useToast 
} from '@chakra-ui/react';
import { FaBookmark, FaHeartBroken, FaQuoteLeft, FaSync } from 'react-icons/fa';

export interface Quote {
  id: string;
  content: string;
  author: string;
  tags?: string[];
}

interface HomeProps {
  fetchRandomQuote: () => Promise<Quote>;
  isLoading: boolean;
}

export const Home = ({ fetchRandomQuote, isLoading: isFetching }: HomeProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [savedQuotes, setSavedQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const toast = useToast();
  
  const bgGradient = useColorModeValue(
    'linear(to-b, dark.900, dark.800)',
    'linear(to-b, dark.900, dark.800)'
  );
  
  const cardBg = useColorModeValue('dark.800', 'dark.700');
  const textColor = useColorModeValue('white', 'whiteAlpha.900');
  const accentColor = 'brand.500';

  // Load saved quotes from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedQuotes');
    if (saved) {
      setSavedQuotes(JSON.parse(saved));
    }
    
    // Fetch first quote on mount
    loadNewQuote();
  }, []);
  
  const isQuoteSaved = (id: string) => {
    return savedQuotes.some(quote => quote.id === id);
  };
  
  const handleSaveQuote = () => {
    if (!currentQuote) return;
    
    setIsSaving(true);
    
    if (isQuoteSaved(currentQuote.id)) {
      // Remove from saved
      const updatedQuotes = savedQuotes.filter(q => q.id !== currentQuote.id);
      setSavedQuotes(updatedQuotes);
      localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
      
      toast({
        title: 'Quote removed',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } else {
      // Add to saved
      const updatedQuotes = [...savedQuotes, currentQuote];
      setSavedQuotes(updatedQuotes);
      localStorage.setItem('savedQuotes', JSON.stringify(updatedQuotes));
      
      toast({
        title: 'Quote saved!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    
    setIsSaving(false);
  };

  const loadNewQuote = async () => {
    try {
      const newQuote = await fetchRandomQuote();
      if (newQuote) {
        setCurrentQuote(newQuote);
      }
    } catch (error) {
      console.error('Error loading quote:', error);
      toast({
        title: 'Failed to load quote',
        description: 'Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (isFetching && !currentQuote) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color={accentColor} />
      </Flex>
    );
  }

  return (
    <Box minH="100vh" bgGradient={bgGradient} py={8} px={4}>
      <Container maxW="3xl" centerContent>
        <Card 
          bg={cardBg}
          borderWidth="1px"
          borderColor="dark.600"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="xl"
          w="100%"
          maxW="2xl"
        >
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="lg" color={accentColor} fontWeight="bold">
                Daily Inspiration
              </Heading>
              <Tooltip label="Get new quote" aria-label="New quote">
                <IconButton
                  icon={<FaSync />}
                  aria-label="New quote"
                  onClick={loadNewQuote}
                  isLoading={isFetching}
                  colorScheme="brand"
                  variant="ghost"
                  isRound
                />
              </Tooltip>
            </Flex>
          </CardHeader>
          
          <CardBody py={8}>
            {currentQuote ? (
              <Box textAlign="center">
                <FaQuoteLeft 
                  style={{ 
                    fontSize: '2.5rem', 
                    opacity: 0.2, 
                    marginBottom: '1rem',
                    color: accentColor 
                  }} 
                />
                <Text 
                  fontSize={{ base: 'xl', md: '2xl' }} 
                  mb={6}
                  lineHeight="tall"
                  color={textColor}
                  fontFamily="serif"
                  fontStyle="italic"
                  px={4}
                >
                  {currentQuote.content}
                </Text>
                <Text 
                  fontSize="lg" 
                  fontWeight="medium"
                  color={accentColor}
                  mt={6}
                >
                  — {currentQuote.author || 'Unknown'}
                </Text>
                {currentQuote.tags && currentQuote.tags.length > 0 && (
                  <Flex wrap="wrap" justify="center" mt={4} gap={2}>
                    {currentQuote.tags.map((tag) => (
                      <Box 
                        key={tag}
                        bg="dark.600"
                        color="brand.200"
                        px={3}
                        py={1}
                        borderRadius="full"
                        fontSize="sm"
                      >
                        {tag}
                      </Box>
                    ))}
                  </Flex>
                )}
              </Box>
            ) : (
              <Flex justify="center" align="center" minH="200px">
                <Text>No quote available. Try again later.</Text>
              </Flex>
            )}
          </CardBody>
          
          <CardFooter pt={0} justifyContent="center" pb={6}>
            <Tooltip 
              label={currentQuote && isQuoteSaved(currentQuote.id) ? 'Remove from saved' : 'Save this quote'}
              aria-label={currentQuote ? 'Save quote' : 'No quote to save'}
            >
              <Button
                leftIcon={currentQuote && isQuoteSaved(currentQuote.id) ? <FaHeartBroken /> : <FaBookmark />}
                colorScheme={currentQuote && isQuoteSaved(currentQuote.id) ? 'red' : 'brand'}
                variant="solid"
                onClick={handleSaveQuote}
                isDisabled={!currentQuote || isSaving}
                isLoading={isSaving}
                size="lg"
                px={8}
                borderRadius="full"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(0)',
                }}
                transition="all 0.2s"
              >
                {currentQuote && isQuoteSaved(currentQuote.id) ? 'Saved' : 'Save Quote'}
              </Button>
            </Tooltip>
          </CardFooter>
        </Card>
      </Container>
    </Box>
  );
};

export default Home;
