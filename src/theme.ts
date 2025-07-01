import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#FFF0F6',
      100: '#FFD6E8',
      200: '#FFADD2',
      300: '#FF7EB6',
      400: '#FF4D97',
      500: '#FF1A75', // Vibrant pink
      600: '#E60063',
      700: '#B8004F',
      800: '#8A003B',
      900: '#5C0027',
    },
    dark: {
      50: '#F0F0F0',
      100: '#D2D2D2',
      200: '#B3B3B3',
      300: '#949494',
      400: '#757575',
      500: '#565656',
      600: '#474747',
      700: '#383838',
      800: '#292929',
      900: '#1A1A1A',
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      'html, body': {
        bg: 'dark.900',
        color: 'white',
        minHeight: '100%',
      },
      '&::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '&::-webkit-scrollbar-track': {
        background: 'dark.800',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'brand.500',
        borderRadius: 'full',
        border: '2px solid',
        borderColor: 'dark.800',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'brand.400',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        transition: 'all 0.2s',
        _focus: {
          ring: '2px',
          ringColor: 'brand.400',
          ringOffset: '1px',
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.400',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px -5px var(--chakra-colors-brand-500/40)',
            _disabled: {
              bg: 'brand.500',
              transform: 'none',
              boxShadow: 'none',
            },
          },
          _active: {
            bg: 'brand.600',
            transform: 'translateY(0)',
          },
        },
        outline: {
          border: '2px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'whiteAlpha.50',
            borderColor: 'brand.400',
            color: 'brand.400',
          },
        },
        ghost: {
          color: 'whiteAlpha.800',
          _hover: {
            bg: 'whiteAlpha.100',
            color: 'white',
          },
        },
      },
      sizes: {
        xl: {
          h: '56px',
          minW: '56px',
          fontSize: 'lg',
          px: 8,
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          bg: 'dark.800',
          border: '1px solid',
          borderColor: 'dark.700',
          borderRadius: '2xl',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      variants: {
        elevated: {
          container: {
            bg: 'dark.700',
            boxShadow: 'lg',
          },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: 'dark.700',
            _hover: {
              bg: 'dark.600',
            },
            _focus: {
              bg: 'dark.600',
              borderColor: 'brand.500',
            },
          },
        },
      },
    },
  },
  shadows: {
    outline: '0 0 0 3px var(--chakra-colors-brand-500/50)',
  },
});
