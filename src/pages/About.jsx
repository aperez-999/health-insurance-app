import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Image,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaHandshake, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionSimpleGrid = motion(SimpleGrid);
const MotionContainer = motion(Container);
const MotionImage = motion(Image);

const BASE_URL = import.meta.env.MODE === 'production' 
  ? '/health-insurance-app' 
  : '';

const ValueCard = ({ title, description, icon, index }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('base', 'dark-lg');
  const titleColor = useColorModeValue('gray.800', 'white');
  const descColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <MotionBox
      p={8}
      bg={cardBg}
      rounded="lg"
      shadow={cardShadow}
      textAlign="center"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      <Icon as={icon} w={10} h={10} color={iconColor} mb={4} />
      <Text fontWeight="bold" fontSize="xl" mb={2} color={titleColor}>
        {title}
      </Text>
      <Text color={descColor}>{description}</Text>
    </MotionBox>
  );
};

const About = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const sectionHeadingColor = useColorModeValue('gray.800', 'white');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  return (
    <Box bg={bgColor} py={20} overflow="hidden">
      <MotionContainer
        maxW="container.xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Stack spacing={16}>
          {/* Hero Section */}
          <MotionStack
            spacing={8}
            textAlign="center"
            variants={itemVariants}
          >
            <Heading
              as="h1"
              size="2xl"
              color={headingColor}
            >
              About Trusted Health Rates
            </Heading>
            <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
              We're dedicated to helping individuals and families find the perfect health insurance coverage
              that protects their well-being and fits their budget.
            </Text>
          </MotionStack>

          {/* Mission Section */}
          <MotionStack
            direction={{ base: 'column', lg: 'row' }}
            spacing={8}
            align="center"
            variants={itemVariants}
          >
            <MotionBox
              flex={1}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MotionImage
                rounded="lg"
                shadow={useColorModeValue('2xl', 'dark-lg')}
                src={`${BASE_URL}/images/mission-image.jpg`}
                alt="Our Mission"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </MotionBox>
            <MotionStack
              flex={1}
              spacing={6}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading as="h2" size="xl" color={sectionHeadingColor}>
                Our Mission
              </Heading>
              <Text fontSize="lg" color={textColor}>
                At Trusted Health Rates, we believe everyone deserves access to quality healthcare coverage.
                Our mission is to simplify the complex world of health insurance by providing transparent,
                personalized solutions that meet your unique needs and budget.
              </Text>
              <Text fontSize="lg" color={textColor}>
                With years of experience in the healthcare industry, we've helped thousands of individuals
                and families find the right coverage, ensuring they receive the care they need when they need it most.
              </Text>
            </MotionStack>
          </MotionStack>

          {/* Values Section */}
          <MotionStack spacing={8} variants={itemVariants}>
            <Heading as="h2" size="xl" textAlign="center" color={sectionHeadingColor}>
              Our Values
            </Heading>
            <MotionSimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={8}
              variants={containerVariants}
            >
              <ValueCard
                icon={FaHandshake}
                title="Trust & Transparency"
                description="We believe in complete transparency and building lasting relationships with our clients based on trust and integrity."
                index={0}
              />
              <ValueCard
                icon={FaHeart}
                title="Client-Focused Care"
                description="Your health and well-being are our top priorities. We work tirelessly to find the best coverage options for you."
                index={1}
              />
              <ValueCard
                icon={FaShieldAlt}
                title="Reliable Protection"
                description="We partner with top-rated insurance providers to ensure you receive reliable and comprehensive coverage."
                index={2}
              />
            </MotionSimpleGrid>
          </MotionStack>
        </Stack>
      </MotionContainer>
    </Box>
  );
};

export default About; 