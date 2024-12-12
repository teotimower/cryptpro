import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box
} from '@chakra-ui/react';
import { useState } from 'react';

const TokenCreationModal = ({ isOpen, onClose, onTokenCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    totalSupply: '',
    description: '',
  });
  const [isCreating, setIsCreating] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      // Simulate token creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Include fee address from environment variable
      const feeAddress = process.env.REACT_APP_FEE_ADDRESS;
      const creationAddress = process.env.REACT_APP_CREATION_ADDRESS;
      const tokenData = {
        ...formData,
        feeAddress,
        creationAddress,
      };
      onTokenCreate(tokenData);
      toast({
        title: 'Token Created',
        description: 'Successfully created new token',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setFormData({
        name: '',
        symbol: '',
        totalSupply: '',
        description: '',
      });
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: error.message || 'Failed to create token',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Token</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Box maxW="500px" mx="auto" p={4}>
              <FormControl isRequired mb={4}>
                <FormLabel>Token Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="My Token"
                />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Token Symbol</FormLabel>
                <Input
                  name="symbol"
                  value={formData.symbol}
                  onChange={handleChange}
                  placeholder="MTK"
                />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Total Supply</FormLabel>
                <Input
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleChange}
                  type="number"
                  placeholder="1000000"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your token"
                />
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button
              colorScheme="purple"
              type="submit"
              isLoading={isCreating}
              loadingText="Creating..."
            >
              Create Token
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default TokenCreationModal;
