import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  UnorderedList,
  ListItem,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

const TermsConditions = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('blue.600', 'blue.200');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const sectionHeadingColor = useColorModeValue('gray.800', 'white');
  const dividerColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box bg={bgColor} py={20}>
      <Container maxW="container.lg">
        <Stack spacing={8}>
          <Stack spacing={4} textAlign="center">
            <Heading as="h1" size="2xl" color={headingColor}>
              Terms and Conditions
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </Stack>

          <Stack spacing={8}>
            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Agreement to Terms
              </Heading>
              <Text color={textColor}>
                By accessing or using Trusted Health Rates' website, you agree to be bound by these Terms and
                Conditions. If you disagree with any part of these terms, you may not access the website
                or use our services.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Services Description
              </Heading>
              <Text color={textColor}>
                Trusted Health Rates provides an online platform to help users find and compare health
                insurance quotes. We work with various insurance providers to offer you options that
                best suit your needs. However, we do not guarantee the availability or pricing of any
                specific insurance plan.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                User Responsibilities
              </Heading>
              <Text mb={4} color={textColor}>
                When using our services, you agree to:
              </Text>
              <UnorderedList spacing={2} pl={4} color={textColor}>
                <ListItem>Provide accurate and complete information</ListItem>
                <ListItem>Maintain the confidentiality of your account information</ListItem>
                <ListItem>Not use the service for any unlawful purpose</ListItem>
                <ListItem>Not interfere with the proper functioning of the website</ListItem>
                <ListItem>Not attempt to access restricted areas of the website</ListItem>
              </UnorderedList>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Disclaimer of Warranties
              </Heading>
              <Text color={textColor}>
                Our services are provided "as is" and "as available" without any warranties of any kind,
                either express or implied. We do not guarantee the accuracy, completeness, or usefulness
                of any information on our website. Your use of our services is at your sole risk.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Limitation of Liability
              </Heading>
              <Text color={textColor}>
                Trusted Health Rates shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of or inability to use
                our services. This includes but is not limited to damages for loss of profits,
                goodwill, data, or other intangible losses.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Intellectual Property
              </Heading>
              <Text color={textColor}>
                The website and its original content, features, and functionality are owned by
                Trusted Health Rates and are protected by international copyright, trademark,
                patent, trade secret, and other intellectual property laws.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Termination
              </Heading>
              <Text color={textColor}>
                We may terminate or suspend your access to our services immediately, without prior
                notice or liability, for any reason whatsoever, including without limitation if you
                breach these Terms and Conditions.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Changes to Terms
              </Heading>
              <Text color={textColor}>
                We reserve the right to modify or replace these Terms at any time. If a revision is
                material, we will try to provide at least 30 days' notice prior to any new terms
                taking effect.
              </Text>
            </Box>

            <Divider borderColor={dividerColor} />

            <Box>
              <Heading as="h2" size="lg" mb={4} color={sectionHeadingColor}>
                Contact Information
              </Heading>
              <Text color={textColor}>
                If you have any questions about these Terms and Conditions, please contact us at:
                legal@trustedhealthrates.com
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default TermsConditions; 