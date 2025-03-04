import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  VStack,
  Divider,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const TermsSection = ({ title, content, index }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <AccordionItem
        border="1px"
        borderColor={borderColor}
        borderRadius="lg"
        mb={4}
        bg={bgColor}
        overflow="hidden"
      >
        <AccordionButton
          p={4}
          _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
        >
          <Box flex="1" textAlign="left">
            <Text fontWeight="semibold" fontSize="lg">
              {title}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4} px={4}>
          {Array.isArray(content) ? (
            <List spacing={3}>
              {content.map((item, idx) => (
                <ListItem key={idx} display="flex" alignItems="flex-start">
                  <ListIcon as={FaCheckCircle} color="blue.500" mt={1} />
                  <Text>{item}</Text>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>{content}</Text>
          )}
        </AccordionPanel>
      </AccordionItem>
    </MotionBox>
  );
};

const TermsOfService = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const termsData = [
    {
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using this website, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you must not use this website.',
        'We reserve the right to modify these terms at any time without notice.'
      ]
    },
    {
      title: '2. Use License',
      content: [
        'Permission is granted to temporarily access the materials on our website.',
        'This is the grant of a license, not a transfer of title.',
        'This license shall automatically terminate if you violate any of these restrictions.'
      ]
    },
    {
      title: '3. Disclaimer',
      content: [
        'The materials on our website are provided on an "as is" basis.',
        'We make no warranties, expressed or implied.',
        'We do not guarantee the accuracy or completeness of any information on our site.'
      ]
    },
    {
      title: '4. Privacy Policy',
      content: [
        'Your use of our website is also governed by our Privacy Policy.',
        'We collect and use information in accordance with our Privacy Policy.',
        'Please review our Privacy Policy for more information about how we handle your data.'
      ]
    },
    {
      title: '5. User Obligations',
      content: [
        'You must not misuse our website or knowingly introduce viruses or harmful material.',
        'You are responsible for maintaining the confidentiality of your account.',
        'You must not use our website for any unlawful purpose.'
      ]
    }
  ];

  return (
    <Box bg={bgColor} minH="100vh" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.lg">
        <MotionStack
          spacing={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={4} textAlign="center" mb={8}>
            <Heading
              as="h1"
              size="2xl"
              color={headingColor}
              mb={4}
            >
              Terms of Service
            </Heading>
            <Text
              fontSize="lg"
              color={textColor}
              maxW="2xl"
            >
              Please read these terms carefully before using our services
            </Text>
            <Divider my={6} />
          </VStack>

          <Accordion allowMultiple>
            {termsData.map((section, index) => (
              <TermsSection
                key={index}
                title={section.title}
                content={section.content}
                index={index}
              />
            ))}
          </Accordion>

          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Text
              fontSize="sm"
              color={textColor}
              textAlign="center"
              mt={8}
            >
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </MotionBox>
        </MotionStack>
      </Container>
    </Box>
  );
};

export default TermsOfService; 