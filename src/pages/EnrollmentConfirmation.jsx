import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  HStack,
  Divider,
} from '@chakra-ui/react';
import { CheckCircleIcon, DownloadIcon, EmailIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFileContract, FaIdCard } from 'react-icons/fa';

const MotionBox = motion(Box);

const EnrollmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { planDetails, userInfo, enrollmentDate } = location.state || {};

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  useEffect(() => {
    if (!planDetails || !userInfo || !enrollmentDate) {
      navigate('/quote-request');
    }
  }, [planDetails, userInfo, enrollmentDate, navigate]);

  if (!planDetails || !userInfo || !enrollmentDate) {
    return null;
  }

  const startDate = new Date();
  startDate.setDate(1);
  startDate.setMonth(startDate.getMonth() + 1);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} pt={20} pb={10}>
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <MotionBox
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Icon as={CheckCircleIcon} w={20} h={20} color="green.500" />
          </MotionBox>

          <VStack spacing={3} textAlign="center">
            <Heading color={textColor} size="xl">
              Enrollment Successful!
            </Heading>
            <Text color={subTextColor} fontSize="lg">
              Thank you for choosing Trusted Health Rates for your insurance needs
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8} width="100%">
            <GridItem>
              <MotionBox
                bg={bgColor}
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack align="stretch" spacing={6}>
                  <Heading size="md" color={textColor}>Enrollment Details</Heading>
                  
                  <List spacing={4}>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FaCalendarAlt} color="green.500" />
                        <Text color={textColor}>Enrollment Date: {formatDate(enrollmentDate)}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FaCalendarAlt} color="green.500" />
                        <Text color={textColor}>Coverage Start Date: {formatDate(startDate)}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FaFileContract} color="green.500" />
                        <Text color={textColor}>Plan: {planDetails.planName}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={FaIdCard} color="green.500" />
                        <Text color={textColor}>Member ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
                      </HStack>
                    </ListItem>
                  </List>

                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    Your insurance card will arrive within 5-7 business days
                  </Alert>
                </VStack>
              </MotionBox>
            </GridItem>

            <GridItem>
              <MotionBox
                bg={bgColor}
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack align="stretch" spacing={6}>
                  <Heading size="md" color={textColor}>Next Steps</Heading>

                  <List spacing={4}>
                    <ListItem>
                      <HStack>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text color={textColor}>Check your email for confirmation details</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text color={textColor}>Download your temporary insurance card</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text color={textColor}>Set up your online member account</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack>
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                        <Text color={textColor}>Review your plan documents</Text>
                      </HStack>
                    </ListItem>
                  </List>

                  <Divider />

                  <VStack spacing={4}>
                    <Button
                      leftIcon={<DownloadIcon />}
                      colorScheme="blue"
                      width="full"
                      onClick={() => {
                        // Handle temporary card download
                        alert('Downloading temporary insurance card...');
                      }}
                    >
                      Download Temporary Card
                    </Button>
                    <Button
                      leftIcon={<EmailIcon />}
                      variant="outline"
                      width="full"
                      onClick={() => {
                        window.location.href = 'mailto:support@trustedhealthrates.com';
                      }}
                    >
                      Contact Support
                    </Button>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>

          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            size="lg"
            mt={4}
          >
            Return to Home
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default EnrollmentConfirmation; 