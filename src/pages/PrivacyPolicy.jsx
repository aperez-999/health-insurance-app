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
  Button,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCheckCircle } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);

const PrivacySection = ({ title, content, index }) => {
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

const PrivacyPolicy = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  const privacyData = [
    {
      title: '1. Information We Collect',
      content: [
        'Personal information such as name, email, and phone number',
        'Health-related information for insurance quotes',
        'Usage data and cookies for website optimization',
        'Payment information when applicable'
      ]
    },
    {
      title: '2. How We Use Your Information',
      content: [
        'To provide accurate insurance quotes',
        'To improve our services and user experience',
        'To communicate important updates and offers',
        'To comply with legal obligations'
      ]
    },
    {
      title: '3. Information Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'Regular security audits and updates',
        'Strict access controls for employee data access',
        'Secure data storage and transmission'
      ]
    },
    {
      title: '4. Your Rights',
      content: [
        'Right to access your personal information',
        'Right to correct inaccurate information',
        'Right to request deletion of your data',
        'Right to opt-out of marketing communications'
      ]
    },
    {
      title: '5. Contact Us',
      content: [
        'Email us at privacy@trustedhealthrates.com',
        'Call our privacy team at (888) 123-4567',
        'Submit a request through our contact form',
        'Write to our physical address'
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
            <MotionBox
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Icon as={FaShieldAlt} w={12} h={12} color={iconColor} mb={4} />
            </MotionBox>
            <Heading
              as="h1"
              size="2xl"
              color={headingColor}
              mb={4}
            >
              Privacy Policy
            </Heading>
            <Text
              fontSize="lg"
              color={textColor}
              maxW="2xl"
            >
              We take your privacy seriously. Learn how we collect, use, and protect your information.
            </Text>
            <Divider my={6} />
          </VStack>

          <Accordion allowMultiple>
            {privacyData.map((section, index) => (
              <PrivacySection
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
            <VStack spacing={4} mt={8}>
              <Text fontSize="sm" color={textColor}>
                Last updated: {new Date().toLocaleDateString()}
              </Text>
              <Button
                as={RouterLink}
                to="/contact"
                colorScheme="blue"
                size="md"
                variant="outline"
                leftIcon={<FaShieldAlt />}
              >
                Contact Privacy Team
              </Button>
            </VStack>
          </MotionBox>
        </MotionStack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy; 