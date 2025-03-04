import { useState, useEffect } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  FormErrorMessage,
  Box,
  Text,
  useColorModeValue,
  HStack,
  Progress,
  Icon,
  ScaleFade,
  Heading,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft, FaUser, FaCalendar, FaDollarSign, FaHome, FaCity, FaMapMarkerAlt } from 'react-icons/fa';

const MotionBox = motion(Box);

const questions = [
  {
    id: 'firstName',
    label: 'What is your first name?',
    type: 'text',
    placeholder: 'Enter your first name',
    validation: (value) => !value.trim() ? 'First name is required' : null,
    icon: FaUser,
    description: 'Please enter your legal first name as it appears on official documents.'
  },
  {
    id: 'lastName',
    label: 'What is your last name?',
    type: 'text',
    placeholder: 'Enter your last name',
    validation: (value) => !value.trim() ? 'Last name is required' : null,
    icon: FaUser,
    description: 'Please enter your legal last name as it appears on official documents.'
  },
  {
    id: 'dob',
    label: 'What is your date of birth?',
    type: 'date',
    validation: (value) => {
      if (!value) return 'Date of birth is required';
      const birthDate = new Date(value);
      if (birthDate > new Date()) return 'Date of birth cannot be in the future';
      return null;
    },
    icon: FaCalendar,
    description: 'Your age helps us determine the most suitable insurance plans for you.'
  },
  {
    id: 'income',
    label: 'What is your household income?',
    type: 'select',
    options: [
      { value: 'below_25000', label: 'Below $25,000' },
      { value: '25000_49999', label: '$25,000 - $49,999' },
      { value: '50000_74999', label: '$50,000 - $74,999' },
      { value: '75000_99999', label: '$75,000 - $99,999' },
      { value: 'above_100000', label: 'Above $100,000' }
    ],
    validation: (value) => !value ? 'Income range is required' : null,
    icon: FaDollarSign,
    description: 'This information helps us identify plans with potential subsidies or financial assistance.'
  },
  {
    id: 'address',
    label: 'What is your street address?',
    type: 'text',
    placeholder: 'Enter your street address',
    validation: (value) => !value.trim() ? 'Address is required' : null,
    icon: FaHome,
    description: 'Your address helps us find insurance providers available in your area.'
  },
  {
    id: 'unit',
    label: 'What is your unit/apartment number?',
    type: 'text',
    placeholder: 'Enter unit or apartment number (optional)',
    validation: () => null,
    icon: FaHome,
    description: 'If applicable, provide your unit or apartment number.'
  },
  {
    id: 'city',
    label: 'What city do you live in?',
    type: 'text',
    placeholder: 'Enter your city',
    validation: (value) => !value.trim() ? 'City is required' : null,
    icon: FaCity,
    description: 'Your city helps determine available healthcare networks and providers.'
  },
  {
    id: 'state',
    label: 'What state do you live in?',
    type: 'text',
    placeholder: 'Enter your state',
    validation: (value) => !value.trim() ? 'State is required' : null,
    icon: FaMapMarkerAlt,
    description: 'Insurance options and regulations vary by state.'
  },
  {
    id: 'zip',
    label: 'What is your ZIP code?',
    type: 'text',
    placeholder: 'Enter your ZIP code',
    validation: (value) => {
      if (!value.trim()) return 'ZIP code is required';
      if (!/^\d{5}(-\d{4})?$/.test(value)) return 'Invalid ZIP code format';
      return null;
    },
    icon: FaMapMarkerAlt,
    description: 'Your ZIP code helps us find local insurance providers and coverage options.'
  }
];

const PersonalInfo = ({ formData: initialFormData, onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState(initialFormData || {
    firstName: '',
    lastName: '',
    dob: '',
    income: '',
    address: '',
    unit: '',
    city: '',
    state: '',
    zip: ''
  });
  const [error, setError] = useState('');
  const [direction, setDirection] = useState(0);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.400');
  const progressColor = useColorModeValue('blue.500', 'blue.200');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const labelColor = useColorModeValue('gray.700', 'white');
  const descriptionColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        validateAndProceed();
      } else if (e.key === 'Backspace' && e.altKey) {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentQuestion, formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateAndProceed = () => {
    const question = questions[currentQuestion];
    const error = question.validation(formData[question.id]);
    
    if (error) {
      setError(error);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setDirection(1);
      setCurrentQuestion(prev => prev + 1);
    } else {
      onNext(formData);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <VStack spacing={8} align="stretch" className="content-box" p={8} borderRadius="xl" bg={bgColor}>
      <Progress
        value={(currentQuestion / (questions.length - 1)) * 100}
        size="sm"
        colorScheme="blue"
        borderRadius="full"
        bg={useColorModeValue('gray.100', 'gray.700')}
        sx={{
          '& > div': {
            transition: 'all 0.4s ease-in-out'
          }
        }}
      />

      <Box position="relative" minH="300px">
        <AnimatePresence mode="wait" custom={direction}>
          <MotionBox
            key={question.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            position="absolute"
            width="100%"
          >
            <ScaleFade in={true} initialScale={0.9}>
              <VStack spacing={6} align="stretch">
                <Box mb={6}>
                  <HStack spacing={3} mb={2}>
                    <Icon as={question.icon} fontSize="xl" color={iconColor} />
                    <Heading size="md" color={labelColor}>
                      {question.label}
                    </Heading>
                  </HStack>
                  <Text color={descriptionColor} fontSize="sm">
                    {question.description}
                  </Text>
                </Box>

                <FormControl isInvalid={!!error}>
                  {question.type === 'select' ? (
                    <Select
                      name={question.id}
                      value={formData[question.id] || ''}
                      onChange={handleChange}
                      bg={inputBg}
                      borderColor={borderColor}
                      color={textColor}
                      _hover={{
                        borderColor: useColorModeValue('gray.300', 'gray.500')
                      }}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: 'outline'
                      }}
                    >
                      <option value="">Select an option</option>
                      {question.options.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      name={question.id}
                      type={question.type}
                      value={formData[question.id] || ''}
                      onChange={handleChange}
                      placeholder={question.placeholder}
                      bg={inputBg}
                      borderColor={borderColor}
                      color={textColor}
                      _hover={{
                        borderColor: useColorModeValue('gray.300', 'gray.500')
                      }}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: 'outline'
                      }}
                    />
                  )}
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>

                <HStack justify="space-between" pt={4}>
                  {currentQuestion > 0 ? (
                    <Button
                      leftIcon={<FaArrowLeft />}
                      onClick={handleBack}
                      variant="ghost"
                      color={textColor}
                      _hover={{
                        bg: useColorModeValue('gray.100', 'gray.700')
                      }}
                    >
                      Back
                    </Button>
                  ) : (
                    <Box />
                  )}
                  <Button
                    rightIcon={<FaArrowRight />}
                    onClick={validateAndProceed}
                    colorScheme="blue"
                    isDisabled={!!error}
                  >
                    {currentQuestion === questions.length - 1 ? 'Next Step' : 'Continue'}
                  </Button>
                </HStack>
              </VStack>
            </ScaleFade>
          </MotionBox>
        </AnimatePresence>
      </Box>
    </VStack>
  );
};

export default PersonalInfo; 