import { useState } from 'react'
import { ChakraProvider, Container, VStack, Heading, Button, useDisclosure } from '@chakra-ui/react'
import WalletConnect from './components/WalletConnect'
import TokenCreationModal from './components/TokenCreationModal'
import TokenList from './components/TokenList'

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
  };

  const handleTokenCreate = async (tokenData) => {
    setTokens([...tokens, tokenData]);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center" color="purple.600">KRC-20 Token Generator</Heading>
          
          <WalletConnect onConnect={handleWalletConnect} />
          
          {walletAddress && (
            <Button colorScheme="purple" onClick={onOpen}>
              Create New Token
            </Button>
          )}
          
          <TokenList tokens={tokens} walletConnected={!!walletAddress} />
          
          <TokenCreationModal
            isOpen={isOpen}
            onClose={onClose}
            onTokenCreate={handleTokenCreate}
          />
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
