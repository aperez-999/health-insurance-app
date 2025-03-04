import { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  ButtonGroup,
  FormErrorMessage,
  Text,
  Box,
  Checkbox,
  useColorModeValue,
} from '@chakra-ui/react';

const ContactInfo = ({ data, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: data.email || '',
    phone: data.phone || '',
    consent: false
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const labelColor = useColorModeValue('gray.700', 'gray.300');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const errorColor = useColorModeValue('red.500', 'red.300');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    // Consent validation
    if (!formData.consent) {
      newErrors.consent = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="lg" mb={4} color={textColor}>
              Almost there! How should we contact you?
            </Text>
            <Text fontSize="sm" color={subTextColor} mb={6}>
              We'll use this information to send your personalized quote and contact you about the best insurance options.
            </Text>
          </Box>

          <FormControl isInvalid={errors.email}>
            <FormLabel color={labelColor}>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              bg={inputBg}
              borderColor={borderColor}
              color={textColor}
              _placeholder={{ color: subTextColor }}
              _hover={{
                borderColor: useColorModeValue('gray.300', 'gray.500'),
              }}
              _focus={{
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
              }}
            />
            <FormErrorMessage color={errorColor}>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.phone}>
            <FormLabel color={labelColor}>Phone Number</FormLabel>
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(123) 456-7890"
              bg={inputBg}
              borderColor={borderColor}
              color={textColor}
              _placeholder={{ color: subTextColor }}
              _hover={{
                borderColor: useColorModeValue('gray.300', 'gray.500'),
              }}
              _focus={{
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
              }}
            />
            <FormErrorMessage color={errorColor}>{errors.phone}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.consent}>
            <Checkbox
              name="consent"
              isChecked={formData.consent}
              onChange={handleChange}
              size="lg"
              colorScheme="blue"
              color={textColor}
              sx={{
                '.chakra-checkbox__control': {
                  borderColor: borderColor,
                  _checked: {
                    bg: useColorModeValue('blue.500', 'blue.200'),
                    borderColor: useColorModeValue('blue.500', 'blue.200'),
                  },
                },
              }}
            >
              I agree to receive communications about my quote request and understand that my information will be handled according to the privacy policy.
            </Checkbox>
            <FormErrorMessage color={errorColor}>{errors.consent}</FormErrorMessage>
          </FormControl>

          <ButtonGroup mt={8} width="100%" spacing={4}>
            <Button
              onClick={onBack}
              size="lg"
              variant="outline"
              flex={1}
              borderColor={borderColor}
              color={textColor}
              _hover={{
                bg: useColorModeValue('gray.50', 'gray.700'),
              }}
            >
              Back
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              flex={1}
            >
              Submit Quote Request
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactInfo; 