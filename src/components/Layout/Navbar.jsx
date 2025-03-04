import React from 'react';
import {
  Box,
  Flex,
  Button,
  Link,
  Image,
  useDisclosure,
  IconButton,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const BASE_URL = import.meta.env.MODE === 'production' 
  ? '/health-insurance-app' 
  : '';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverColor = useColorModeValue('blue.500', 'blue.200');

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <MotionBox
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderStyle="solid"
      borderColor={borderColor}
      boxShadow="sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Container maxW="container.xl" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <MotionFlex
            as={RouterLink}
            to="/"
            alignItems="center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Box>
              <Image
                h={{ base: "60px", md: "70px" }}
                src={`${BASE_URL}/images/output-onlinepngtools.png`}
                alt="Trusted Health Rates Logo"
                style={{
                  objectFit: "contain",
                  filter: useColorModeValue('none', 'brightness(1.2)')
                }}
              />
            </Box>
          </MotionFlex>

          <Flex alignItems="center">
            <Stack
              direction="row"
              spacing={8}
              alignItems="center"
              display={{ base: 'none', md: 'flex' }}
            >
              {navItems.map((item, index) => (
                <MotionBox
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    as={RouterLink}
                    to={item.path}
                    fontSize="md"
                    fontWeight="medium"
                    color={location.pathname === item.path ? hoverColor : textColor}
                    position="relative"
                    _after={{
                      content: '""',
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bg: hoverColor,
                      transition: 'width 0.3s ease'
                    }}
                    _hover={{
                      color: hoverColor,
                      _after: {
                        width: '100%'
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                </MotionBox>
              ))}
            </Stack>

            <MotionIconButton
              ml={4}
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              colorScheme="blue"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            />

            <MotionButton
              as={RouterLink}
              to="/quote-request"
              display={{ base: 'none', md: 'inline-flex' }}
              ml={4}
              colorScheme="blue"
              size="md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Quote
            </MotionButton>

            <MotionIconButton
              display={{ base: 'flex', md: 'none' }}
              ml={4}
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant="ghost"
              aria-label="Toggle Navigation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          </Flex>
        </Flex>

        <AnimatePresence>
          {isOpen && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              overflow="hidden"
              pb={4}
            >
              <Stack spacing={4}>
                {navItems.map((item) => (
                  <MotionBox
                    key={item.name}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      as={RouterLink}
                      to={item.path}
                      display="block"
                      py={2}
                      fontSize="md"
                      fontWeight="medium"
                      color={location.pathname === item.path ? hoverColor : textColor}
                      _hover={{ color: hoverColor }}
                    >
                      {item.name}
                    </Link>
                  </MotionBox>
                ))}
                <MotionButton
                  as={RouterLink}
                  to="/quote-request"
                  w="full"
                  colorScheme="blue"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get a Quote
                </MotionButton>
              </Stack>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </MotionBox>
  );
};

export default Navbar; 