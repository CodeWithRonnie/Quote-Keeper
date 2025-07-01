import { Box, Container, VStack, useToast } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SavedQuotes } from './pages/SavedQuotes';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchRandomQuote = async () => {
    setIsLoading(true);
    try {
      // Try the first API endpoint
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (response.ok) {
          const data = await response.json();
          return {
            id: `quote-${Date.now()}`,
            content: data.content,
            author: data.author || 'Unknown',
            tags: data.tags || []
          };
        }
      } catch (error) {
        console.warn('Primary API failed, trying fallback...', error);
      }
      
      // Fallback to a different quotes API
      try {
        const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
        if (response.ok) {
          const data = await response.json();
          return {
            id: `quote-${Date.now()}`,
            content: data[0].quote,
            author: data[0].author || 'Unknown',
            tags: []
          };
        }
      } catch (error) {
        console.warn('Fallback API failed, using default quote...', error);
      }
      
      // If all APIs fail, return a default quote
      return {
        id: 'default-quote',
        content: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
        tags: ['inspiration', 'work']
      };
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Return a default quote in case of any error
      return {
        id: 'error-quote',
        content: 'Failed to load a new quote. Please try again later.',
        author: 'System',
        tags: ['error']
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Default quote to use when API fails
  const defaultQuote = {
    id: '1',
    content: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    tags: ['inspiration', 'work']
  };

  // Wrapper function to safely fetch a random quote
  const safeFetchRandomQuote = async () => {
    setIsLoading(true);
    try {
      const quote = await fetchRandomQuote();
      return quote || defaultQuote;
    } catch (error) {
      console.error('Error fetching quote, using default:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch a new quote. Using a fallback quote.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return defaultQuote;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-br, gray.900, gray.800)">
      <Navbar />
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  fetchRandomQuote={safeFetchRandomQuote} 
                  isLoading={isLoading} 
                />
              } 
            />
            <Route path="/saved" element={<SavedQuotes />} />
          </Routes>
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
