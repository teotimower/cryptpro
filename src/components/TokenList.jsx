import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
} from '@chakra-ui/react';

const TokenList = ({ tokens, walletConnected }) => {
  if (!walletConnected) {
    return (
      <Box textAlign="center" py={4}>
        <Text>Connect your wallet to view tokens</Text>
      </Box>
    );
  }

  if (tokens.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Text>No tokens created yet</Text>
      </Box>
    );
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Symbol</Th>
          <Th>Total Supply</Th>
          <Th>Description</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tokens.map((token, index) => (
          <Tr key={index}>
            <Td>{token.name}</Td>
            <Td>{token.symbol}</Td>
            <Td>{token.totalSupply}</Td>
            <Td>{token.description}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TokenList;
