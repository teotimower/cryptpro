import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Input } from '@chakra-ui/react';
import { useState } from 'react';

const TradeModal = ({ isOpen, onClose, token }) => {
  const [tradeAmount, setTradeAmount] = useState(0);

  const handleTrade = () => {
    const transactionFee = 0.02; // Transaction fee
    const totalAmount = parseFloat(tradeAmount);
    const fee = totalAmount * transactionFee;
    const netAmount = totalAmount - fee;

    // Handle trade logic here
    console.log(`Trading ${tradeAmount} of ${token.name}`);
    console.log(`Transaction Fee: ${fee}`);
    console.log(`Net Amount: ${netAmount}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Trade {token.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Enter amount to trade:</Text>
          <Input
            type="number"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
            placeholder={`Amount of ${token.symbol}`}
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleTrade}>Confirm Trade</Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TradeModal;
