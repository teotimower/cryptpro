import { useState } from 'react'
import { ChakraProvider, Container, VStack, Heading, Button, HStack, Spacer } from '@chakra-ui/react'
import WalletConnect from './components/WalletConnect'
import TokenCreationModal from './components/TokenCreationModal'
import TokenList from './components/TokenList'

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleWalletConnect = (address) => {
    setWalletAddress(address);
  };

  const handleTokenCreate = async (tokenData) => {
    setTokens([...tokens, tokenData]);
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <ChakraProvider>
      <Container maxW="100%" p={0} width="100vw">
        <HStack justifyContent="space-between" mb={4} p={4} bg="gray.200" color="black" borderRadius="md" width="100vw">
          <Heading size="md">CRYPTPRO</Heading>
          <Spacer />
          {walletAddress && <Button colorScheme="purple" onClick={handleOpenModal}>Create Token</Button>}
          <WalletConnect onConnect={handleWalletConnect} />
        </HStack>
        <TokenList tokens={tokens} walletConnected={!!walletAddress} />
        <TokenCreationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onTokenCreate={handleTokenCreate}
        />
      </Container>
    </ChakraProvider>
  )
}

export default App
