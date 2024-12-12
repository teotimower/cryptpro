import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const WalletConnect = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const toast = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Simulate wallet connection for now
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 42);
      setWalletAddress(mockAddress);
      onConnect(mockAddress);

      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to wallet: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect wallet',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    onConnect('');
    toast({
      title: 'Wallet Disconnected',
      description: 'Successfully disconnected from wallet',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="lg" textAlign="center">
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect your wallet to create tokens'}
      </Text>
      <Button
        colorScheme="purple"
        onClick={walletAddress ? disconnectWallet : connectWallet}
        isLoading={isConnecting}
        loadingText={walletAddress ? 'Disconnecting...' : 'Connecting...'}
      >
        {walletAddress ? 'Disconnect Wallet' : 'Connect Wallet'}
      </Button>
    </VStack>
  );
};

export default WalletConnect;
