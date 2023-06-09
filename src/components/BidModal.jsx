import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const BidModal = ({ isOpen, onClose, car }) => {
  const handleBidSubmit = () => {
    // Handle bid submission logic here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Place a Bid</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{/* Place your bid form component here */}</ModalBody>
        <ModalFooter>
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
