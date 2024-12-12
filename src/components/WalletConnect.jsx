import { Button, Text, useToast, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Wallet, NetworkType } from '@kaspa/wallet';

const WalletConnect = ({ onConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [wallet, setWallet] = useState(null);
  const toast = useToast();

  const initializeWallet = async () => {
    try {
      const newWallet = new Wallet({
        networkType: NetworkType.Mainnet,
      });
      await newWallet.init();
      setWallet(newWallet);
    } catch (error) {
      console.error('Failed to initialize wallet:', error);
      toast({
        title: 'Wallet Initialization Failed',
        description: error.message || 'Failed to initialize Kaspa wallet',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    initializeWallet();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!wallet) {
        throw new Error('Wallet not initialized');
      }

      // Generate a new address
      const address = await wallet.generateAddress();
      setWalletAddress(address);
      onConnect(address);

      // Get balance
      const balance = await wallet.getBalance();

      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to Kaspa wallet\nBalance: ${balance.toString()} KAS`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
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
      description: 'Successfully disconnected from Kaspa wallet',
      status: 'info',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <VStack spacing={4}>
      {!walletAddress ? (
        <Button
          colorScheme="purple"
          onClick={connectWallet}
          isLoading={isConnecting}
          loadingText="Connecting..."
          isDisabled={!wallet}
        >
          Connect Kaspa Wallet
        </Button>
      ) : (
        <>
          <Text>Connected: {walletAddress}</Text>
          <Button
            colorScheme="red"
            size="sm"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </>
      )}
    </VStack>
  );
};

export default WalletConnect;
