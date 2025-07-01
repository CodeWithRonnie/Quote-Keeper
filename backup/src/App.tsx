import { ChakraProvider, Box, Container, Heading, VStack } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { SavedQuotes } from './pages/SavedQuotes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Box minH="100vh" bgGradient="linear(to-br, gray.900, gray.800)">
            <Navbar />
            <Container maxW="container.lg" py={8}>
              <VStack spacing={8} align="stretch">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/saved" element={<SavedQuotes />} />
                </Routes>
              </VStack>
            </Container>
          </Box>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
