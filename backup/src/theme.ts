import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Main pink color
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'gray.800',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'brand.600',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'brand.500',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'full',
        _focus: {
          boxShadow: '0 0 0 3px var(--chakra-colors-brand-400)',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            _disabled: {
              bg: 'brand.500',
              transform: 'none',
              boxShadow: 'none',
            },
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'whiteAlpha.100',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'gray.800',
          border: '1px solid',
          borderColor: 'gray.700',
          borderRadius: 'lg',
          overflow: 'hidden',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
        },
      },
    },
  },
});
