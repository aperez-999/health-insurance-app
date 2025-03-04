import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
  Badge,
  List,
  ListItem,
  ListIcon,
  Divider,
} from '@chakra-ui/react';
import { 
  FaHeartbeat, 
  FaMoneyBillWave, 
  FaUserShield, 
  FaClock, 
  FaCheckCircle, 
  FaHospital, 
  FaPrescription, 
  FaUserMd 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useInView } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionContainer = motion(Container);

const FadeInOnScroll = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay }}
      as={motion.div}
    >
      {children}
    </Box>
  );
};

const Feature = ({ title, text, icon, index }) => {
  const iconColor = useColorModeValue('blue.500', 'blue.200');
  const titleColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <MotionStack
      align="center"
      textAlign="center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Icon as={icon} w={10} h={10} color={iconColor} />
      <Text fontWeight={600} color={titleColor}>{title}</Text>
      <Text color={textColor}>{text}</Text>
    </MotionStack>
  );
};

const PlanFeature = ({ children }) => (
  <ListItem display="flex" alignItems="center" mb={3}>
    <ListIcon as={FaCheckCircle} color="green.500" />
    <Text>{children}</Text>
  </ListItem>
);

const InsurancePlan = ({ title, price, features, isPopular }) => {
  const boxBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const priceColor = useColorModeValue('gray.900', 'white');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref={ref}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      p={6}
      position="relative"
      bg={boxBg}
      borderColor={borderColor}
      display="flex"
      flexDirection="column"
      height="full"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      _hover={{ transform: 'translateY(-8px)', boxShadow: 'xl', transition: 'all 0.3s ease' }}
    >
      {isPopular && (
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme="blue"
          variant="solid"
          rounded="full"
          px={4}
          py={1}
          fontSize="sm"
        >
          MOST POPULAR
        </Badge>
      )}

      <Stack spacing={6} flex="1">
        <Stack spacing={3} textAlign="center">
          <Text fontSize="6xl" fontWeight="bold" color={priceColor} lineHeight="1" mt={4}>
            ${price}
          </Text>
          <Text fontSize="md" color={textColor}>
            per month
          </Text>
        </Stack>
        
        <List spacing={4} flex="1" mt={4}>
          {features.map((feature, index) => (
            <ListItem 
              key={index} 
              display="flex" 
              alignItems="center"
              color={textColor}
            >
              <ListIcon 
                as={FaCheckCircle} 
                color="green.500" 
                boxSize={5}
                mr={3}
              />
              <Text fontSize="md">{feature}</Text>
            </ListItem>
          ))}
        </List>

        <Button
          as={RouterLink}
          to="/quote-request"
          colorScheme="blue"
          size="lg"
          width="full"
          py={7}
          fontSize="lg"
          fontWeight="semibold"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          transition="all 0.2s"
        >
          Get Started
        </Button>
      </Stack>
    </MotionBox>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const accentColor = useColorModeValue('blue.500', 'blue.200');
  const buttonBg = useColorModeValue('white', 'gray.800');
  const buttonHoverBg = useColorModeValue('gray.50', 'gray.700');
  const featuresBg = useColorModeValue('white', 'gray.800');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const bgOverlay = useColorModeValue(
    'rgba(255, 255, 255, 0.75)',
    'rgba(26, 32, 44, 0.85)'
  );

  const plans = [
    {
      title: "Basic Coverage",
      price: "199",
      features: [
        "Essential medical coverage",
        "Preventive care included",
        "24/7 nurse hotline",
        "Prescription drug coverage",
        "No deductible for preventive care",
        "Virtual doctor visits"
      ],
      isPopular: false
    },
    {
      title: "Premium Coverage",
      price: "299",
      features: [
        "Comprehensive medical coverage",
        "Lower deductibles",
        "Dental and vision included",
        "Mental health coverage",
        "Specialist visits covered",
        "Worldwide emergency coverage"
      ],
      isPopular: true
    },
    {
      title: "Family Plan",
      price: "399",
      features: [
        "Coverage for the whole family",
        "Maternity care included",
        "Pediatric services",
        "Family counseling",
        "Preventive care for all",
        "Low copayments"
      ]
    },
    {
      title: "Senior Care Plus",
      price: "349",
      features: [
        "Medicare supplement coverage",
        "Prescription drug benefits",
        "Dental and vision care",
        "Home healthcare services",
        "Medical equipment coverage",
        "Wellness program access"
      ]
    }
  ];

  return (
    <Box as="main">
      <Box
        position="relative"
        height="100vh"
        width="100%"
        overflow="hidden"
      >
        {/* Background Image */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundImage="url('/images/family-bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="50% 30%"
          backgroundRepeat="no-repeat"
          filter="brightness(1.1)"
          zIndex={0}
        />
        
        {/* Overlay */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg={bgOverlay}
          zIndex={1}
        />

        {/* Content */}
        <Container
          maxW="container.xl"
          position="relative"
          zIndex={2}
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            spacing={8}
            maxW="container.md"
            mx="auto"
            textAlign="center"
            py={{ base: 20, md: 0 }}
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                as="h1"
                size="2xl"
                mb={6}
                color={useColorModeValue('gray.800', 'white')}
                lineHeight="1.2"
                fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              >
                Get Trusted Health Insurance Quotes
              </Heading>
              <Text
                fontSize={{ base: "xl", md: "2xl" }}
                color={useColorModeValue('gray.700', 'gray.200')}
                mb={10}
                maxW="3xl"
                mx="auto"
              >
                Find the best health plans tailored to your needs.
              </Text>
              <Button
                as={RouterLink}
                to="/quote-request"
                colorScheme="blue"
                size="lg"
                px={10}
                py={7}
                fontSize="xl"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Get Your Quote
              </Button>
            </MotionBox>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <FadeInOnScroll>
        <Box bg={featuresBg} py={20} overflow="hidden">
          <MotionContainer maxW="container.lg">
            <MotionSimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={10}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Feature
                icon={FaHeartbeat}
                title="Comprehensive Coverage"
                text="Access to a wide range of health insurance plans covering all your medical needs."
                index={0}
              />
              <Feature
                icon={FaMoneyBillWave}
                title="Affordable Rates"
                text="Find plans that fit your budget with competitive pricing and various payment options."
                index={1}
              />
              <Feature
                icon={FaUserShield}
                title="Trusted Providers"
                text="Partner with top-rated insurance providers known for reliable coverage and service."
                index={2}
              />
              <Feature
                icon={FaClock}
                title="Quick Process"
                text="Get your personalized quote in minutes with our simple and efficient process."
                index={3}
              />
            </MotionSimpleGrid>
          </MotionContainer>
        </Box>
      </FadeInOnScroll>

      {/* Insurance Plans Section */}
      <Box py={20} bg={useColorModeValue('gray.50', 'gray.900')}>
        <Container maxW="container.xl">
          <FadeInOnScroll>
            <Stack spacing={8} alignItems="center" mb={16}>
              <Heading
                textAlign="center"
                size="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                Choose Your Perfect Plan
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="2xl"
                textAlign="center"
              >
                Select from our carefully curated insurance plans designed to meet your specific needs
              </Text>
            </Stack>
          </FadeInOnScroll>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: 6, lg: 6 }}
            px={{ base: 4, lg: 4 }}
            alignItems="stretch"
            maxW="container.xl"
            mx="auto"
          >
            {plans.map((plan, index) => (
              <InsurancePlan key={index} {...plan} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Coverage Details Section */}
      <Box py={20} bg={useColorModeValue('white', 'gray.800')}>
        <Container maxW="container.xl">
          <FadeInOnScroll>
            <Stack spacing={8} alignItems="center" mb={16}>
              <Heading
                textAlign="center"
                size="2xl"
                color={useColorModeValue('gray.800', 'white')}
              >
                Comprehensive Coverage
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="2xl"
                textAlign="center"
              >
                Our health insurance plans cover a wide range of medical services
              </Text>
            </Stack>
          </FadeInOnScroll>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {[
              {
                icon: FaHospital,
                title: "Hospital Care",
                description: "Full coverage for hospital stays and emergency services"
              },
              {
                icon: FaPrescription,
                title: "Prescription Drugs",
                description: "Affordable access to prescription medications"
              },
              {
                icon: FaUserMd,
                title: "Specialist Care",
                description: "Access to a network of specialized healthcare providers"
              },
              {
                icon: FaHeartbeat,
                title: "Preventive Care",
                description: "Regular check-ups and preventive services included"
              }
            ].map((item, index) => (
              <FadeInOnScroll key={index} delay={index * 0.1}>
                <Box
                  p={8}
                  textAlign="center"
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.3s ease"
                >
                  <Icon as={item.icon} w={12} h={12} color="blue.500" mb={6} />
                  <Heading size="md" mb={4}>{item.title}</Heading>
                  <Text color={useColorModeValue('gray.600', 'gray.300')}>
                    {item.description}
                  </Text>
                </Box>
              </FadeInOnScroll>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <FadeInOnScroll>
        <Box py={20} bg={useColorModeValue('blue.50', 'blue.900')}>
          <Container maxW="container.xl">
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              alignItems="center"
              justifyContent="space-between"
              textAlign={{ base: 'center', md: 'left' }}
            >
              <Stack spacing={4} flex={1}>
                <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
                  Ready to Get Started?
                </Heading>
                <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')}>
                  Get your personalized quote today and take the first step towards comprehensive health coverage.
                </Text>
              </Stack>
              <Button
                as={RouterLink}
                to="/quote-request"
                colorScheme="blue"
                size="lg"
                px={8}
                py={7}
                fontSize="lg"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Get Your Free Quote
              </Button>
            </Stack>
          </Container>
        </Box>
      </FadeInOnScroll>
    </Box>
  );
};

export default Home; 