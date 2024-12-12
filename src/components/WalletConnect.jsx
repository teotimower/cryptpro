import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const WalletConnect = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const toast = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      // Check if Kaspa wallet is available
      if (window.kaspa) {
        // Request access to the wallet
        const accounts = await window.kaspa.requestAccounts();
        const walletAddress = accounts[0];
        setWalletAddress(walletAddress);
        onConnect(walletAddress);

        toast({
          title: 'Wallet Connected',
          description: `Successfully connected to Kaspa wallet: ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Listen for account changes
        window.kaspa.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length > 0) {
            setWalletAddress(newAccounts[0]);
            onConnect(newAccounts[0]);
          } else {
            setWalletAddress('');
            onConnect('');
          }
        });

        // Listen for network changes
        window.kaspa.on('networkChanged', (network) => {
          toast({
            title: 'Network Changed',
            description: `Connected to network: ${network}`,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        });
      } else {
        toast({
          title: 'Kaspa Wallet Not Detected',
          description: 'Please install a Kaspa wallet extension to connect.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to connect Kaspa wallet:', error);
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect to Kaspa wallet',
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
