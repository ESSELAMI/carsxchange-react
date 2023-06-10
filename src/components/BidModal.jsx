import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";

const BidModal = ({ isOpen, onClose, car }) => {
  const [bidPrice, setBidPrice] = useState(car?.highest_bid?.price || 0);

  const handleBidSubmit = () => {
    if (bidPrice > car.highest_bid?.price && bidPrice > 0) {
      // Handle bid submission logic here
    } else {
      // Display an error message if the bid is not higher than the current bid
      alert("Please enter a bid higher than the current bid.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="md">
        <ModalHeader textAlign="center" fontSize="2xl">
          Place a Bid
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text fontSize="lg" textAlign="center" mb={4}>
              Current Bid: {car?.highest_bid?.price || "No bids yet"}
            </Text>
            <FormControl>
              <FormLabel htmlFor="price" fontWeight="bold">
                Your Bid
              </FormLabel>
              <NumberInput
                value={bidPrice}
                min={car?.highest_bid?.price || 0}
                onChange={(valueString) => setBidPrice(parseInt(valueString))}
              >
                <NumberInputField borderRadius="md" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Box>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleBidSubmit}>
            Place Bid
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BidModal;
