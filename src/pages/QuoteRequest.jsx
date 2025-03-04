import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Progress,
  useToast,
  useColorModeValue,
  ScaleFade,
  HStack,
  Circle,
  Icon,
  Divider,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfo from '../components/QuoteForm/PersonalInfo';
import HealthConditions from '../components/QuoteForm/HealthConditions';
import ContactInfo from '../components/QuoteForm/ContactInfo';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaUser, FaHeartbeat, FaEnvelope } from 'react-icons/fa';

const MotionBox = motion(Box);

const steps = [
  { title: 'Personal Info', description: 'Basic information' },
  { title: 'Health', description: 'Health conditions' },
  { title: 'Contact', description: 'Contact details' }
];

// Helper function to calculate insurance options based on form data
const calculateInsuranceOptions = (formData) => {
  const options = [];
  const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
  const hasHealthConditions = formData.healthConditions.length > 0;
  const incomeLevel = formData.income;

  // Basic plan
  options.push({
    id: 'basic',
    name: 'Basic Coverage',
    monthlyPremium: calculatePremium('basic', age, hasHealthConditions, incomeLevel),
    coverage: {
      deductible: '$2,500',
      outOfPocketMax: '$8,000',
      primaryCare: '$30 copay',
      specialists: '$60 copay',
      prescription: 'Generic only'
    }
  });

  // Standard plan
  options.push({
    id: 'standard',
    name: 'Standard Coverage',
    monthlyPremium: calculatePremium('standard', age, hasHealthConditions, incomeLevel),
    coverage: {
      deductible: '$1,500',
      outOfPocketMax: '$5,000',
      primaryCare: '$20 copay',
      specialists: '$40 copay',
      prescription: 'Generic and preferred brand'
    }
  });

  // Premium plan
  options.push({
    id: 'premium',
    name: 'Premium Coverage',
    monthlyPremium: calculatePremium('premium', age, hasHealthConditions, incomeLevel),
    coverage: {
      deductible: '$500',
      outOfPocketMax: '$3,000',
      primaryCare: '$10 copay',
      specialists: '$20 copay',
      prescription: 'Full coverage'
    }
  });

  return options;
};

// Helper function to calculate premium based on factors
const calculatePremium = (plan, age, hasHealthConditions, incomeLevel) => {
  let basePremium;
  switch (plan) {
    case 'basic':
      basePremium = 200;
      break;
    case 'standard':
      basePremium = 300;
      break;
    case 'premium':
      basePremium = 450;
      break;
    default:
      basePremium = 200;
  }

  // Age factor
  const ageFactor = age < 30 ? 1 : age < 50 ? 1.3 : 1.6;

  // Health conditions factor
  const healthFactor = hasHealthConditions ? 1.2 : 1;

  // Income adjustment
  let incomeFactor;
  switch (incomeLevel) {
    case 'below_25000':
      incomeFactor = 0.7;
      break;
    case '25000_49999':
      incomeFactor = 0.85;
      break;
    case '50000_74999':
      incomeFactor = 1;
      break;
    case '75000_99999':
      incomeFactor = 1.15;
      break;
    case 'above_100000':
      incomeFactor = 1.3;
      break;
    default:
      incomeFactor = 1;
  }

  return Math.round(basePremium * ageFactor * healthFactor * incomeFactor);
};

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  const activeColor = useColorModeValue('blue.500', 'blue.200');
  const inactiveColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const activeTextColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack spacing={4} mb={8}>
      <Progress
        value={(currentStep + 1) * (100 / totalSteps)}
        size="sm"
        colorScheme="blue"
        bg={inactiveColor}
      />
      <HStack justify="space-between" px={4}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          
          return (
            <Stack key={index} align="center" spacing={2}>
              <Circle
                size="40px"
                bg={isCompleted ? activeColor : isActive ? 'white' : inactiveColor}
                color={isCompleted || isActive ? activeColor : textColor}
                border="2px solid"
                borderColor={isActive ? activeColor : 'transparent'}
              >
                {isCompleted ? (
                  <Icon as={FaCheckCircle} />
                ) : (
                  <Icon 
                    as={index === 0 ? FaUser : index === 1 ? FaHeartbeat : FaEnvelope}
                  />
                )}
              </Circle>
              <Stack spacing={0} align="center">
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  color={isActive ? activeTextColor : textColor}
                >
                  {step.title}
                </Text>
                <Text
                  fontSize="xs"
                  color={textColor}
                >
                  {step.description}
                </Text>
              </Stack>
            </Stack>
          );
        })}
      </HStack>
    </Stack>
  );
};

const QuoteRequest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    income: '',
    address: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    healthConditions: [],
    email: '',
    phone: ''
  });
  
  const toast = useToast();
  const navigate = useNavigate();
  
  // Updated color mode values for better light mode appearance
  const bgColor = useColorModeValue('white', 'gray.800');
  const boxBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const progressBg = useColorModeValue('gray.100', 'gray.700');
  const progressColor = useColorModeValue('blue.500', 'blue.200');
  const containerBg = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const formBg = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    // Add fade-in animation to elements with the fade-in class
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      // Calculate insurance options based on form data
      const insuranceOptions = calculateInsuranceOptions(formData);
      
      toast({
        title: 'Quote Request Submitted!',
        description: "We've calculated your personalized quotes.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate to results page with calculated options
      navigate('/insurance-quotes', { 
        state: { 
          formData,
          insuranceOptions 
        } 
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error submitting your request. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderStep = () => {
    const direction = activeStep;

    return (
      <AnimatePresence mode="wait" custom={direction}>
        <MotionBox
          key={activeStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <PersonalInfo
                    formData={formData}
                    onNext={handleNext}
                  />
                );
              case 1:
                return (
                  <HealthConditions
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                );
              case 2:
                return (
                  <ContactInfo
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                );
              default:
                return null;
            }
          })()}
        </MotionBox>
      </AnimatePresence>
    );
  };

  return (
    <Box bg={containerBg} minH="100vh" py={20}>
      <Container maxW="container.md">
        <Box
          bg={formBg}
          borderRadius="xl"
          boxShadow="lg"
          p={8}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Stack spacing={6}>
            <Stack spacing={2} textAlign="center">
              <Heading as="h1" size="xl" color={textColor}>
                Get Your Personalized Quote
              </Heading>
              <Text color={subTextColor}>
                Complete the form below to receive tailored insurance options
              </Text>
            </Stack>

            <StepIndicator
              currentStep={activeStep}
              totalSteps={steps.length}
              steps={steps}
            />

            <Alert status="info" bg="blue.50" color="blue.700" borderRadius="md">
              <AlertIcon />
              Your information is secure and will only be used to provide accurate quotes
            </Alert>

            <AnimatePresence mode="wait">
              <MotionBox
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeStep === 0 && (
                  <PersonalInfo
                    formData={formData}
                    onNext={handleNext}
                  />
                )}
                {activeStep === 1 && (
                  <HealthConditions
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {activeStep === 2 && (
                  <ContactInfo
                    formData={formData}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
              </MotionBox>
            </AnimatePresence>

            <Text fontSize="sm" color={subTextColor} textAlign="center" mt={4}>
              Press Enter ↵ to continue, Alt + Backspace to go back
            </Text>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default QuoteRequest; 