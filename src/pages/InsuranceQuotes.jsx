import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Image,
  Badge,
  Divider,
  useColorModeValue,
  ScaleFade,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon, StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaHospital, 
  FaPrescription, 
  FaUserMd, 
  FaPercentage, 
  FaUsers, 
  FaHeart,
  FaStar,
  FaChartLine,
  FaDollarSign
} from 'react-icons/fa';

const MotionBox = motion(Box);

// Add BASE_URL constant at the top of the file
const BASE_URL = import.meta.env.MODE === 'production' 
  ? '/health-insurance-app' 
  : '';

// Insurance company data
const insuranceCompanies = {
  marketplace: {
    name: 'Healthcare Marketplace',
    logo: `${BASE_URL}/images/healthcare-logo.webp`,
    description: 'Affordable plans for lower-income households',
    website: 'https://www.healthcare.gov',
    features: ['Government subsidies available', 'Wide network coverage', 'Essential health benefits'],
    bestFor: ['Low income', 'Families', 'Self-employed']
  },
  aetna: {
    name: 'Aetna',
    logo: `${BASE_URL}/images/aetna-logo.jpg`,
    description: 'Low-cost health coverage for families',
    website: 'https://www.aetna.com',
    features: ['Large provider network', 'Digital health tools', '24/7 nurse line'],
    bestFor: ['Families', 'Employers', 'Medicare eligible']
  },
  bluecross: {
    name: 'Blue Cross Blue Shield',
    logo: `${BASE_URL}/images/bluecross-logo.jpg`,
    description: 'Comprehensive health insurance solutions',
    website: 'https://www.bcbs.com',
    features: ['Nationwide coverage', 'Wellness programs', 'Telehealth services'],
    bestFor: ['Chronic conditions', 'Nationwide coverage', 'Large families']
  },
  kaiser: {
    name: 'Kaiser Permanente',
    logo: `${BASE_URL}/images/kaiser-logo.svg`,
    description: 'Integrated healthcare system',
    website: 'https://www.kp.org',
    features: ['Integrated care model', 'Online health services', 'Mental health support'],
    bestFor: ['Integrated care', 'Mental health needs', 'Preventive care']
  },
  cigna: {
    name: 'Cigna',
    logo: `${BASE_URL}/images/cigna-logo.jpg`,
    description: 'Global health service company',
    website: 'https://www.cigna.com',
    features: ['International coverage', 'Pharmacy benefits', 'Behavioral health'],
    bestFor: ['International coverage', 'Prescription needs', 'Business travelers']
  },
  unitedhealth: {
    name: 'UnitedHealthcare',
    logo: `${BASE_URL}/images/unitedhealth-logo.jpg`,
    description: 'Innovative health benefits',
    website: 'https://www.uhc.com',
    features: ['Virtual visits', 'Medicare plans', 'Dental & vision options'],
    bestFor: ['Medicare eligible', 'Virtual care', 'Comprehensive coverage']
  },
  humana: {
    name: 'Humana',
    logo: `${BASE_URL}/images/humana-logo.jpg`,
    description: 'Specialized Medicare and wellness plans',
    website: 'https://www.humana.com',
    features: ['Medicare Advantage plans', 'Wellness rewards', 'Senior care focus'],
    bestFor: ['Seniors', 'Medicare eligible', 'Wellness focused']
  },
  anthem: {
    name: 'Anthem',
    logo: `${BASE_URL}/images/anthem-logo.png`,
    description: 'Innovative healthcare solutions',
    website: 'https://www.anthem.com',
    features: ['Large network', 'Digital-first experience', 'Personalized care'],
    bestFor: ['Young professionals', 'Digital natives', 'Families']
  },
  molina: {
    name: 'Molina Healthcare',
    logo: `${BASE_URL}/images/molina.jpg`,
    description: 'Quality healthcare for all',
    website: 'https://www.molinahealthcare.com',
    features: ['Medicaid plans', 'Community focus', 'Culturally sensitive care'],
    bestFor: ['Medicaid eligible', 'Low income', 'Diverse communities']
  },
  centene: {
    name: 'Centene',
    logo: `${BASE_URL}/images/centene-logo.jpg`,
    description: 'Local care, national reach',
    website: 'https://www.centene.com',
    features: ['Local providers', 'Government programs', 'Specialized care'],
    bestFor: ['Government programs', 'Local care', 'Special needs']
  }
};

const InsuranceQuotes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, insuranceOptions } = location.state || {};
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!formData || !insuranceOptions) {
      navigate('/quote-request');
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [formData, insuranceOptions, navigate]);

  if (!formData || !insuranceOptions) {
    return null;
  }

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const planTextColor = useColorModeValue('gray.700', 'gray.100');
  const planDetailsColor = useColorModeValue('gray.600', 'gray.300');
  const badgeBg = useColorModeValue('blue.50', 'blue.900');

  // Calculate recommended companies based on form data
  const getRecommendedCompanies = () => {
    const recommendations = [];
    const income = formData.income;
    const age = formData.age;
    const hasHealthConditions = formData.healthConditions.length > 0;
    const familySize = formData.familyMembers || 1;

    // Low income recommendations
    if (income === 'below_25000' || income === '25000_49999') {
      recommendations.push('marketplace', 'molina');
    }

    // Middle income recommendations
    if (income === '50000_74999' || income === '75000_99999') {
      recommendations.push('anthem', 'aetna');
    }

    // High income recommendations
    if (income === 'above_100000') {
      recommendations.push('cigna', 'unitedhealth');
    }

    // Age-based recommendations
    if (age >= 60) {
      recommendations.push('humana', 'kaiser');
    } else if (age >= 40) {
      recommendations.push('bluecross', 'anthem');
    } else {
      recommendations.push('anthem', 'aetna');
    }

    // Health condition recommendations
    if (hasHealthConditions) {
      recommendations.push('bluecross', 'kaiser', 'unitedhealth');
    }

    // Family size recommendations
    if (familySize > 3) {
      recommendations.push('bluecross', 'aetna');
    }

    // Special program eligibility
    if (income === 'below_25000' && familySize > 1) {
      recommendations.push('centene', 'molina');
    }

    // Remove duplicates and limit to top recommendations
    const uniqueRecommendations = [...new Set(recommendations)];
    return uniqueRecommendations.slice(0, 6); // Show top 6 recommendations
  };

  const getMatchScore = (company, formData) => {
    let score = 0;
    const { age, income, healthConditions, familyMembers } = formData;

    // Age match
    if (age >= 60 && company.bestFor.includes('Seniors')) score += 25;
    if (age < 30 && company.bestFor.includes('Young professionals')) score += 25;

    // Income match
    if (income === 'below_25000' && company.bestFor.includes('Low income')) score += 25;
    if (income === 'above_100000' && company.bestFor.includes('Comprehensive coverage')) score += 25;

    // Health conditions match
    if (healthConditions.length > 0 && company.bestFor.includes('Chronic conditions')) score += 25;

    // Family size match
    if (familyMembers > 3 && company.bestFor.includes('Families')) score += 25;

    return Math.min(100, score);
  };

  const handlePlanSelection = (option) => {
    const planDetails = {
      planName: option.name,
      monthlyPremium: option.monthlyPremium,
      coverage: option.coverage
    };

    // Show confirmation dialog
    if (window.confirm(`Would you like to proceed with the ${option.name} plan?\n\nMonthly Premium: $${option.monthlyPremium}\nDeductible: ${option.coverage.deductible}\nOut of Pocket Max: ${option.coverage.outOfPocketMax}`)) {
      // Navigate to a new enrollment page or show enrollment modal
      navigate('/enrollment', { 
        state: { 
          planDetails,
          userInfo: formData
        }
      });
    }
  };

  const CompanyCard = ({ company, matchScore }) => {
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const headingColor = useColorModeValue('blue.600', 'blue.200');
    const textColor = useColorModeValue('gray.600', 'gray.400');

    return (
      <MotionBox
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        p={6}
        bg={cardBg}
        borderColor={borderColor}
        position="relative"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
          transition: 'all 0.3s ease'
        }}
      >
        {matchScore >= 75 && (
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="purple"
            variant="solid"
            rounded="full"
            px={3}
            py={1}
          >
            Best Match
          </Badge>
        )}

        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Image
              src={company.logo}
              alt={company.name}
              height="40px"
              objectFit="contain"
            />
            <Tooltip label="Match score based on your profile">
              <Box textAlign="right">
                <Text fontSize="sm" mb={1}>Match Score</Text>
                <Progress
                  value={matchScore}
                  size="sm"
                  colorScheme={matchScore >= 75 ? "green" : matchScore >= 50 ? "blue" : "gray"}
                  borderRadius="full"
                />
              </Box>
            </Tooltip>
          </HStack>

          <VStack align="start" spacing={2}>
            <Heading size="md" color={headingColor}>
              {company.name}
            </Heading>
            <Text color={textColor} fontSize="sm">
              {company.description}
            </Text>
          </VStack>

          <Divider />

          <Text fontWeight="semibold" mb={2}>Key Features:</Text>
          <List spacing={3}>
            {company.features.map((feature, idx) => (
              <ListItem key={idx} display="flex" alignItems="center">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                <Text fontSize="sm">{feature}</Text>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Text fontWeight="semibold" mb={2}>Best For:</Text>
          <Flex wrap="wrap" gap={2}>
            {company.bestFor.map((category, idx) => (
              <Tag
                key={idx}
                size="md"
                variant="subtle"
                colorScheme="blue"
                borderRadius="full"
              >
                <TagLeftIcon as={FaUsers} />
                <TagLabel>{category}</TagLabel>
              </Tag>
            ))}
          </Flex>

          <HStack spacing={2} mt={4}>
            <Button
              as="a"
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="blue"
              flex="1"
              leftIcon={<Icon as={FaShieldAlt} />}
            >
              Visit Website
            </Button>
            <Tooltip label="Contact an agent">
              <Button
                colorScheme="green"
                variant="outline"
                leftIcon={<PhoneIcon />}
                onClick={() => window.location.href = 'tel:1-800-INSURANCE'}
              >
                Call
              </Button>
            </Tooltip>
          </HStack>
        </VStack>
      </MotionBox>
    );
  };

  const recommendedCompanies = getRecommendedCompanies().map(companyId => ({
    ...insuranceCompanies[companyId],
    matchScore: getMatchScore(insuranceCompanies[companyId], formData)
  })).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.50', 'gray.900')}
      pt={{ base: '20', md: '28' }}
      pb={10}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} className="fade-in">
          <ScaleFade initialScale={0.9} in={true}>
            <VStack spacing={4} textAlign="center" mb={8}>
              <Heading
                color={headingColor}
                fontSize={{ base: '2xl', md: '4xl' }}
              >
                Your Personalized Insurance Recommendations
              </Heading>
              <Text
                color={textColor}
                fontSize={{ base: 'md', md: 'lg' }}
                maxW="2xl"
              >
                Based on your profile, we've analyzed and ranked the best insurance options for you,{' '}
                {formData.firstName}. Our matching algorithm considers your age, income, health conditions, and family size.
              </Text>
            </VStack>
          </ScaleFade>

          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            width="100%"
            onChange={setSelectedTab}
            className="scale-in"
          >
            <TabList justifyContent="center" mb={8}>
              <Tab>
                <HStack>
                  <Icon as={FaHeart} />
                  <Text>Recommended Companies</Text>
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <Icon as={FaChartLine} />
                  <Text>Coverage Plans</Text>
                </HStack>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  spacing={8}
                  className="slide-in"
                >
                  {recommendedCompanies.map((company, index) => (
                    <CompanyCard
                      key={company.name}
                      company={company}
                      matchScore={company.matchScore}
                    />
                  ))}
                </SimpleGrid>
              </TabPanel>

              <TabPanel>
                <SimpleGrid
                  columns={{ base: 1, md: 3 }}
                  spacing={8}
                  className="slide-in"
                >
                  {insuranceOptions.map((option, index) => (
                    <MotionBox
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      p={6}
                      bg={cardBg}
                      borderRadius="xl"
                      boxShadow="xl"
                      border="1px"
                      borderColor={borderColor}
                      position="relative"
                      _hover={{
                        transform: 'translateY(-4px)',
                        boxShadow: '2xl',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {option.id === 'premium' && (
                        <Badge
                          position="absolute"
                          top={-3}
                          right={-3}
                          colorScheme="purple"
                          variant="solid"
                          rounded="full"
                          px={3}
                          py={1}
                        >
                          Best Value
                        </Badge>
                      )}

                      <VStack spacing={4} align="stretch">
                        <Heading
                          size="lg"
                          color={headingColor}
                        >
                          {option.name}
                        </Heading>
                        
                        <HStack justify="space-between" align="baseline">
                          <Text
                            fontSize="3xl"
                            fontWeight="bold"
                            color={useColorModeValue('gray.800', 'white')}
                          >
                            ${option.monthlyPremium}
                          </Text>
                          <Text color={textColor}>per month</Text>
                        </HStack>

                        <Divider />

                        <List spacing={3}>
                          <ListItem>
                            <HStack>
                              <Icon as={FaDollarSign} color="blue.500" />
                              <Text color={planDetailsColor}>Deductible: {option.coverage.deductible}</Text>
                            </HStack>
                          </ListItem>
                          <ListItem>
                            <HStack>
                              <Icon as={FaPercentage} color="blue.500" />
                              <Text color={planDetailsColor}>Out of Pocket Max: {option.coverage.outOfPocketMax}</Text>
                            </HStack>
                          </ListItem>
                          <ListItem>
                            <HStack>
                              <Icon as={FaUserMd} color="blue.500" />
                              <Text color={planDetailsColor}>Primary Care: {option.coverage.primaryCare}</Text>
                            </HStack>
                          </ListItem>
                          <ListItem>
                            <HStack>
                              <Icon as={FaHospital} color="blue.500" />
                              <Text color={planDetailsColor}>Specialists: {option.coverage.specialists}</Text>
                            </HStack>
                          </ListItem>
                          <ListItem>
                            <HStack>
                              <Icon as={FaPrescription} color="blue.500" />
                              <Text color={planDetailsColor}>Prescription: {option.coverage.prescription}</Text>
                            </HStack>
                          </ListItem>
                        </List>

                        <Button
                          colorScheme="blue"
                          size="lg"
                          mt={4}
                          leftIcon={<Icon as={FaShieldAlt} />}
                          onClick={() => handlePlanSelection(option)}
                        >
                          Select Plan
                        </Button>
                      </VStack>
                    </MotionBox>
                  ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Box className="fade-in" pt={8}>
            <HStack spacing={4} justify="center">
              <Button
                variant="ghost"
                onClick={() => navigate('/quote-request')}
                size="lg"
                leftIcon={<InfoIcon />}
              >
                Start New Quote
              </Button>
              <Button
                variant="ghost"
                colorScheme="blue"
                size="lg"
                leftIcon={<EmailIcon />}
                onClick={() => window.location.href = 'mailto:support@trustedhealthrates.com'}
              >
                Email Support
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default InsuranceQuotes; 