import { useState } from 'react';
import {
  VStack,
  SimpleGrid,
  Checkbox,
  Button,
  ButtonGroup,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const healthConditions = [
  { id: 'aids_hiv', label: 'AIDS/HIV' },
  { id: 'diabetes', label: 'Diabetes' },
  { id: 'heartDisease', label: 'Heart Disease' },
  { id: 'hypertension', label: 'Hypertension' },
  { id: 'asthma', label: 'Asthma' },
  { id: 'cancer', label: 'Cancer' },
  { id: 'arthritis', label: 'Arthritis' },
  { id: 'stroke', label: 'Stroke' },
  { id: 'epilepsy', label: 'Epilepsy' },
  { id: 'copd', label: 'Chronic Obstructive Pulmonary Disease (COPD)' },
  { id: 'mentalHealth', label: 'Mental Health Disorders' },
  { id: 'obesity', label: 'Obesity' },
  { id: 'kidneyDisease', label: 'Kidney Disease' },
  { id: 'sleepApnea', label: 'Sleep Apnea' },
  { id: 'liverDisease', label: 'Liver Disease' },
  { id: 'alzheimer', label: "Alzheimer's Disease" },
  { id: 'glaucoma', label: 'Glaucoma' },
  { id: 'chronicPain', label: 'Chronic Pain' },
  { id: 'addisonDisease', label: "Addison's Disease" },
  { id: 'sickleCellAnemia', label: 'Sickle Cell Anemia' },
];

const HealthConditions = ({ data, onNext, onBack }) => {
  const [selectedConditions, setSelectedConditions] = useState(
    data.healthConditions || []
  );

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const subTextColor = useColorModeValue('gray.600', 'gray.300');
  const checkboxColor = useColorModeValue('blue.500', 'blue.200');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleCheckboxChange = (condition) => {
    setSelectedConditions((prev) => {
      if (prev.includes(condition)) {
        return prev.filter((c) => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ healthConditions: selectedConditions });
  };

  return (
    <Box bg={bgColor} p={8} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="lg" mb={4} color={textColor}>
              Please select any health conditions that apply to you:
            </Text>
            <Text fontSize="sm" color={subTextColor} mb={6}>
              This information helps us find the most suitable insurance plans for your needs.
              Your health information is kept strictly confidential.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {healthConditions.map((condition) => (
              <Checkbox
                key={condition.id}
                isChecked={selectedConditions.includes(condition.id)}
                onChange={() => handleCheckboxChange(condition.id)}
                size="lg"
                colorScheme="blue"
                color={textColor}
                sx={{
                  '.chakra-checkbox__control': {
                    borderColor: borderColor,
                    _checked: {
                      bg: checkboxColor,
                      borderColor: checkboxColor,
                    },
                  },
                }}
              >
                {condition.label}
              </Checkbox>
            ))}
          </SimpleGrid>

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
              Continue
            </Button>
          </ButtonGroup>
        </VStack>
      </form>
    </Box>
  );
};

export default HealthConditions; 