import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Button,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  VStack,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaGraduationCap, FaHandHoldingHeart, FaLaptopCode, FaChartLine } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionSimpleGrid = motion(SimpleGrid);

const BenefitCard = ({ icon, title, description }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardShadow = useColorModeValue('base', 'dark-lg');
  const titleColor = useColorModeValue('gray.800', 'white');
  const descColor = useColorModeValue('gray.600', 'gray.300');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <Box
      p={6}
      bg={cardBg}
      rounded="lg"
      shadow={cardShadow}
      textAlign="center"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Icon as={icon} w={8} h={8} color={iconColor} mb={4} />
      <Text fontWeight="bold" fontSize="lg" mb={2} color={titleColor}>
        {title}
      </Text>
      <Text color={descColor}>{description}</Text>
    </Box>
  );
};

const JobCard = ({ title, department, location, type, index }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleApply = () => {
    window.open('https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A106633354&keywords=trusted%20health%20rates&origin=RICH_QUERY_SUGGESTION&position=0&searchId=24644564-f65d-4cb2-ae4f-144661382006&sid=Ozj&spellCorrectionEnabled=false', '_blank');
  };

  return (
    <MotionBox
      p={6}
      bg={cardBg}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: 'lg' }}
    >
      <VStack align="start" spacing={3}>
        <Heading size="md" color={useColorModeValue('gray.800', 'white')}>
          {title}
        </Heading>
        <Text color={textColor}>{department}</Text>
        <Text color={textColor}>{location}</Text>
        <Badge colorScheme="blue">{type}</Badge>
        <Button 
          variant="outline" 
          colorScheme="blue" 
          size="sm"
          onClick={handleApply}
          leftIcon={<Icon as={FaBriefcase} />}
        >
          Apply Now
        </Button>
      </VStack>
    </MotionBox>
  );
};

const ValueCard = ({ icon, title, description, index }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const iconColor = useColorModeValue('blue.500', 'blue.200');

  return (
    <MotionBox
      p={6}
      bg={cardBg}
      borderRadius="lg"
      textAlign="center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: 'lg' }}
    >
      <Icon as={icon} w={10} h={10} color={iconColor} mb={4} />
      <Heading size="md" mb={2} color={useColorModeValue('gray.800', 'white')}>
        {title}
      </Heading>
      <Text color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
    </MotionBox>
  );
};

const jobOpenings = [
  {
    title: "Insurance Sales Representative",
    department: "Sales",
    location: "Miami, FL",
    type: "Full-time",
    workArrangement: "Hybrid (Office/Remote)",
    description: "Join our dynamic sales team to help clients find the perfect health insurance coverage.",
    requirements: [
      "2+ years of insurance sales experience",
      "Licensed health insurance agent",
      "Strong communication skills",
      "Goal-oriented mindset"
    ]
  },
  {
    title: "Customer Service Specialist",
    department: "Customer Support",
    location: "Miami, FL",
    type: "Full-time",
    workArrangement: "Remote",
    description: "Provide exceptional support to our clients and help them navigate their insurance needs.",
    requirements: [
      "Previous customer service experience",
      "Knowledge of health insurance",
      "Excellent problem-solving skills",
      "Bilingual (English/Spanish) preferred"
    ]
  },
  {
    title: "Insurance Claims Analyst",
    department: "Claims",
    location: "Miami, FL",
    type: "Full-time",
    workArrangement: "Hybrid (Office/Remote)",
    description: "Process and analyze insurance claims while ensuring compliance and customer satisfaction.",
    requirements: [
      "3+ years of claims processing experience",
      "Strong attention to detail",
      "Knowledge of healthcare regulations",
      "Bachelor's degree preferred"
    ]
  }
];

const Careers = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const sectionHeadingColor = useColorModeValue('gray.800', 'white');

  const jobs = [
    {
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time'
    },
    {
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time'
    }
  ];

  const values = [
    {
      icon: FaUsers,
      title: 'Collaborative Culture',
      description: 'Work with passionate individuals in a supportive environment'
    },
    {
      icon: FaBriefcase,
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work options'
    },
    {
      icon: FaLaptopCode,
      title: 'Innovation',
      description: 'Push boundaries and create impactful solutions'
    },
    {
      icon: FaChartLine,
      title: 'Growth',
      description: 'Continuous learning and career development opportunities'
    }
  ];

  return (
    <Box minH="100vh" bg={bgColor} pt={{ base: 20, md: 28 }} pb={10}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Stack spacing={4} textAlign="center">
            <Heading
              color={headingColor}
              fontSize={{ base: '3xl', md: '4xl' }}
            >
              Join Our Team in Miami
            </Heading>
            <Text
              color={textColor}
              fontSize={{ base: 'lg', md: 'xl' }}
              maxW="3xl"
              mx="auto"
            >
              Be part of a dynamic team that's revolutionizing the health insurance industry.
              We offer flexible work arrangements including remote and hybrid options.
            </Text>
          </Stack>

          {/* Values Section */}
          <Stack spacing={8}>
            <Heading
              size="xl"
              textAlign="center"
              color={headingColor}
              mb={8}
            >
              Our Values
            </Heading>
            <MotionSimpleGrid
              columns={{ base: 1, md: 2, lg: 4 }}
              spacing={8}
              initial="hidden"
              animate="visible"
            >
              {values.map((value, index) => (
                <ValueCard key={index} {...value} index={index} />
              ))}
            </MotionSimpleGrid>
          </Stack>

          {/* Open Positions Section */}
          <Stack spacing={8}>
            <Heading
              size="xl"
              textAlign="center"
              color={headingColor}
              mb={8}
            >
              Open Positions
            </Heading>
            <MotionSimpleGrid
              columns={{ base: 1, md: 2 }}
              spacing={8}
              initial="hidden"
              animate="visible"
            >
              {jobs.map((job, index) => (
                <JobCard key={index} {...job} index={index} />
              ))}
            </MotionSimpleGrid>
          </Stack>

          <Box textAlign="center" py={8}>
            <Text fontSize="lg" color={textColor} mb={4}>
              Our modern office is located in the heart of Miami, Florida. We embrace a flexible work culture
              that includes both remote and hybrid work arrangements, allowing our team members to maintain
              a healthy work-life balance while delivering exceptional service to our clients.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Careers; 