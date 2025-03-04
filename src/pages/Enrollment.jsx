import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useColorModeValue,
  Stack,
  Divider,
  HStack,
  useToast,
  Alert,
  AlertIcon,
  Grid,
  GridItem,
  Icon,
  List,
  ListItem,
  Badge,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaCalendar, FaShieldAlt, FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);

const Enrollment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { planDetails, userInfo } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: userInfo?.address || '',
    billingCity: userInfo?.city || '',
    billingState: userInfo?.state || '',
    billingZip: userInfo?.zip || '',
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');

  if (!planDetails || !userInfo) {
    navigate('/quote-request');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: 'Enrollment Successful!',
      description: 'Your insurance plan is now active. You will receive a confirmation email shortly.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    // Navigate to confirmation page
    navigate('/enrollment-confirmation', {
      state: {
        planDetails,
        userInfo,
        enrollmentDate: new Date().toISOString(),
      }
    });
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} pt={20} pb={10}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <VStack spacing={2} textAlign="center">
            <Heading color={textColor} size="xl">
              Complete Your Enrollment
            </Heading>
            <Text color={subTextColor}>
              You're just a few steps away from securing your health coverage
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
            {/* Plan Summary */}
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
                  <Heading size="md" color={textColor}>Plan Summary</Heading>
                  <List spacing={4}>
                    <ListItem>
                      <HStack justify="space-between">
                        <Text color={subTextColor}>Plan Name</Text>
                        <Text color={textColor} fontWeight="semibold">{planDetails.planName}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack justify="space-between">
                        <Text color={subTextColor}>Monthly Premium</Text>
                        <Text color={textColor} fontWeight="semibold">${planDetails.monthlyPremium}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack justify="space-between">
                        <Text color={subTextColor}>Deductible</Text>
                        <Text color={textColor}>{planDetails.coverage.deductible}</Text>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack justify="space-between">
                        <Text color={subTextColor}>Out of Pocket Max</Text>
                        <Text color={textColor}>{planDetails.coverage.outOfPocketMax}</Text>
                      </HStack>
                    </ListItem>
                  </List>

                  <Alert status="info" borderRadius="md">
                    <AlertIcon />
                    Coverage will begin on the first day of next month
                  </Alert>
                </VStack>
              </MotionBox>
            </GridItem>

            {/* Payment Form */}
            <GridItem>
              <MotionBox
                as="form"
                onSubmit={handleSubmit}
                bg={bgColor}
                p={6}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={borderColor}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={6} align="stretch">
                  <Heading size="md" color={textColor}>Payment Information</Heading>

                  <RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
                    <Stack direction="row" spacing={5}>
                      <Radio value="credit">
                        <HStack spacing={2}>
                          <Icon as={FaCreditCard} />
                          <Text>Credit Card</Text>
                        </HStack>
                      </Radio>
                      <Radio value="debit">
                        <HStack spacing={2}>
                          <Icon as={FaCreditCard} />
                          <Text>Debit Card</Text>
                        </HStack>
                      </Radio>
                    </Stack>
                  </RadioGroup>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Card Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <Icon as={FaCreditCard} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </InputGroup>
                  </FormControl>

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>Expiry Date</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FaCalendar} color="gray.500" />
                        </InputLeftElement>
                        <Input
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>CVV</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FaLock} color="gray.500" />
                        </InputLeftElement>
                        <Input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={4}
                          type="password"
                        />
                      </InputGroup>
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Name on Card</FormLabel>
                    <Input
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                  </FormControl>

                  <Divider />

                  <Heading size="sm" color={textColor}>Billing Address</Heading>

                  <FormControl isRequired>
                    <FormLabel color={textColor}>Street Address</FormLabel>
                    <Input
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                    />
                  </FormControl>

                  <HStack>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>City</FormLabel>
                      <Input
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>State</FormLabel>
                      <Input
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>ZIP Code</FormLabel>
                      <Input
                        name="billingZip"
                        value={formData.billingZip}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </HStack>

                  <Alert status="success" borderRadius="md">
                    <AlertIcon />
                    Your information is secure and encrypted
                  </Alert>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    isLoading={loading}
                    leftIcon={<Icon as={FaShieldAlt} />}
                  >
                    Complete Enrollment
                  </Button>
                </VStack>
              </MotionBox>
            </GridItem>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Enrollment; 