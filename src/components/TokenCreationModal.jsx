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
  NumberInput,
  NumberInputField,
  useToast,
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

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      // Here we'll implement the KRC-20 token creation logic
      const tokenData = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        price: 0,
        available: formData.totalSupply,
      };
      
      await onTokenCreate(tokenData);
      toast({
        title: 'Token Created',
        description: `Successfully created ${formData.name} (${formData.symbol})`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
      setFormData({ name: '', symbol: '', totalSupply: '', description: '' });
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create KRC-20 Token</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Token Name</FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="My Token"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Token Symbol</FormLabel>
            <Input
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              placeholder="MTK"
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Total Supply</FormLabel>
            <NumberInput min={0}>
              <NumberInputField
                value={formData.totalSupply}
                onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
                placeholder="1000000"
              />
            </NumberInput>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Token description"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="purple"
            onClick={handleCreate}
            isLoading={isCreating}
            loadingText="Creating..."
          >
            Create Token
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TokenCreationModal;
