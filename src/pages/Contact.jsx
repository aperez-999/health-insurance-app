import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  useToast,
  useColorModeValue,
  VStack,
  ScaleFade,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const ContactInfo = ({ icon, title, content, index }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('blue.500', 'blue.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <MotionBox
      p={6}
      bg={cardBg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      textAlign="center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: 'lg' }}
    >
      <Icon as={icon} w={8} h={8} color={iconColor} mb={4} />
      <Text fontWeight="bold" fontSize="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {content}
      </Text>
    </MotionBox>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const formBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const boxShadow = useColorModeValue('base', 'dark-lg');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'support@trustedhealthrates.com'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      content: '(888) 123-4567'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Office',
      content: 'San Francisco, CA 94105'
    }
  ];

  return (
    <Box bg={bgColor} minH="100vh" pt={{ base: "80px", md: "100px" }}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          {/* Header */}
          <ScaleFade initialScale={0.9} in={true}>
            <VStack spacing={4} textAlign="center" mb={8}>
              <Heading
                as="h1"
                size="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                Get in Touch
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="2xl"
              >
                Have questions? We're here to help you find the right health insurance coverage.
              </Text>
            </VStack>
          </ScaleFade>

          {/* Contact Info Cards */}
          <MotionSimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={8}
            w="full"
            initial="hidden"
            animate="visible"
          >
            {contactInfo.map((info, index) => (
              <ContactInfo key={index} {...info} index={index} />
            ))}
          </MotionSimpleGrid>

          {/* Contact Form */}
          <MotionBox
            w="full"
            maxW="3xl"
            mx="auto"
            bg={formBg}
            borderRadius="xl"
            borderWidth="1px"
            borderColor={borderColor}
            p={{ base: 6, md: 8 }}
            boxShadow="lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <VStack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full">
                <FormControl>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="John"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Doe"
                    _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                  />
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="(123) 456-7890"
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="How can we help you?"
                  rows={6}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
              </FormControl>

              <Button
                colorScheme="blue"
                size="lg"
                w="full"
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </Button>
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 