import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

const TokenList = ({ tokens, walletConnected }) => {
  const [processingTx, setProcessingTx] = useState(null);
  const toast = useToast();
  const FEE = 0.02;

  const handleTransaction = async (tokenId, type) => {
    setProcessingTx(tokenId);
    try {
      // Here we'll implement the buy/sell logic
      // This is a placeholder for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: `${type} Successful`,
        description: `Successfully ${type.toLowerCase()}ed token`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${type} Failed`,
        description: error.message || `Failed to ${type.toLowerCase()} token`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setProcessingTx(null);
    }
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th>Total Supply</Th>
            <Th>Available</Th>
            <Th>Price (KAS)</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map((token) => (
            <Tr key={token.id}>
              <Td>{token.name}</Td>
              <Td>{token.symbol}</Td>
              <Td>{token.totalSupply}</Td>
              <Td>{token.available}</Td>
              <Td>{token.price} KAS</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="green"
                  mr={2}
                  isLoading={processingTx === token.id}
                  isDisabled={!walletConnected}
                  onClick={() => handleTransaction(token.id, 'Buy')}
                >
                  Buy
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  isLoading={processingTx === token.id}
                  isDisabled={!walletConnected}
                  onClick={() => handleTransaction(token.id, 'Sell')}
                >
                  Sell
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Text fontSize="sm" mt={2} color="gray.600">
        Transaction Fee: {FEE} KAS
      </Text>
    </Box>
  );
};

export default TokenList;
