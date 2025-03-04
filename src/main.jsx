import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import './index.css'
import App from './App.jsx'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        minHeight: '100vh',
        margin: 0,
        padding: 0,
      },
      '#root': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
      'main': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        flex: '1 0 auto',
      },
      'nav': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        borderBottom: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      },
      'footer': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        borderTop: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        flexShrink: 0,
        width: '100%',
        '& a': {
          color: props.colorMode === 'dark' ? 'blue.200' : 'blue.600',
          _hover: {
            color: props.colorMode === 'dark' ? 'blue.300' : 'blue.700',
            textDecoration: 'none',
          },
        },
        '& h3, & h4': {
          color: props.colorMode === 'dark' ? 'white' : 'gray.900',
          fontWeight: '600',
        },
        '& p, & span': {
          color: props.colorMode === 'dark' ? 'gray.300' : 'gray.600',
        },
      },
      '.content-box, .card': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
        boxShadow: props.colorMode === 'dark' 
          ? '0 4px 6px rgba(0, 0, 0, 0.4)' 
          : '0 4px 6px rgba(160, 174, 192, 0.1)',
      },
      'input, select, textarea': {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
        borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
        _placeholder: {
          color: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
        },
        _hover: {
          borderColor: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
        },
        _focus: {
          bg: props.colorMode === 'dark' ? 'gray.700' : 'white',
          borderColor: 'blue.500',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
        },
      },
      'label': {
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.700',
      },
      'h1, h2, h3, h4, h5, h6': {
        color: props.colorMode === 'dark' ? 'white' : 'gray.900',
      },
      'p, span': {
        color: props.colorMode === 'dark' ? 'gray.300' : 'gray.700',
      },
    }),
  },
  components: {
    Container: {
      baseStyle: (props) => ({
        bg: 'transparent',
        color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
      }),
    },
    Button: {
      baseStyle: {
        _hover: {
          transform: 'translateY(-1px)',
        },
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'blue.200' : 'blue.500',
          color: props.colorMode === 'dark' ? 'gray.800' : 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'blue.300' : 'blue.600',
          },
        }),
        ghost: (props) => ({
          color: props.colorMode === 'dark' ? 'gray.400' : 'gray.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
          },
        }),
      },
    },
    Input: {
      variants: {
        filled: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.50',
            color: props.colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800',
            borderColor: props.colorMode === 'dark' ? 'gray.600' : 'gray.300',
            _hover: {
              bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'gray.600' : 'gray.100',
              borderColor: 'blue.500',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

// Add CSS for transitions
const style = document.createElement('style');
style.textContent = `
  * {
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  footer {
    flex-shrink: 0;
  }
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
