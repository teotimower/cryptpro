import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import TradeModal from './TradeModal';

const TokenList = ({ walletConnected }) => {
  const [selectedToken, setSelectedToken] = useState(null);
  const [isTradeModalOpen, setTradeModalOpen] = useState(false);
  const [tokens, setTokens] = useState([]);

  const openTradeModal = (token) => {
    setSelectedToken(token);
    setTradeModalOpen(true);
  };

  useEffect(() => {
    if (walletConnected) {
      // Fetch tokens from the specified URL
      fetch('https://example.com/api/tokens') // Replace with your actual URL
        .then((response) => response.json())
        .then((data) => {
          // Assuming data is an array of tokens
          setTokens(data);
        })
        .catch((error) => {
          console.error('Error fetching tokens:', error);
        });
    }
  }, [walletConnected]);

  if (!walletConnected) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No tokens generated yet.</Text>
      </Box>
    );
  }

  if (tokens.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No tokens generated yet.</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" width="100%">
      <Box overflowX="auto" width="100%">
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Symbol</Th>
              <Th>Total Supply</Th>
              <Th>Description</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokens.map((token, index) => (
              <Tr key={index}>
                <Td>{token.name}</Td>
                <Td>{token.symbol}</Td>
                <Td>{token.totalSupply}</Td>
                <Td>{token.description}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => openTradeModal(token)} mr={2}>Trade</Button>
                  <Button colorScheme="green" mr={2}>Buy</Button>
                  <Button colorScheme="red">Sell</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <TradeModal
          isOpen={isTradeModalOpen}
          onClose={() => setTradeModalOpen(false)}
          token={selectedToken}
        />
      </Box>
    </Flex>
  );
};

export default TokenList;
