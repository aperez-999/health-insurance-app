import { Box, Container, Stack, Text, Link, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('gray.600', 'gray.300');
  const linkHoverColor = useColorModeValue('blue.500', 'blue.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box 
      bg={bgColor} 
      color={textColor} 
      mt="auto"
      borderTop="1px"
      borderColor={borderColor}
    >
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>Company</Text>
            <Link 
              as={RouterLink} 
              to="/about" 
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              About Us
            </Link>
            <Link 
              as={RouterLink} 
              to="/contact"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Contact Us
            </Link>
            <Link 
              as={RouterLink} 
              to="/careers"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Careers
            </Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>Insurance</Text>
            <Link 
              as={RouterLink} 
              to="/quote-request"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Get a Quote
            </Link>
            <Link 
              as={RouterLink} 
              to="/insurance-quotes"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Insurance Plans
            </Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>Legal</Text>
            <Link 
              as={RouterLink} 
              to="/privacy-policy"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Privacy Policy
            </Link>
            <Link 
              as={RouterLink} 
              to="/terms-conditions"
              color={linkColor}
              _hover={{ color: linkHoverColor }}
            >
              Terms & Conditions
            </Link>
          </Stack>

          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>Contact</Text>
            <Text color={textColor}>Email: info@trustedhealthrates.com</Text>
            <Text color={textColor}>Phone: (555) 123-4567</Text>
            <Text color={textColor}>Hours: Mon-Fri 9am-6pm EST</Text>
          </Stack>
        </SimpleGrid>

        <Box pt={10}>
          <Text pt={6} fontSize={'sm'} textAlign={'center'} color={textColor}>
            © {new Date().getFullYear()} Trusted Health Rates. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 