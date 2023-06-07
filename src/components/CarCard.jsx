import {
  Box,
  Image,
  Text,
  Stack,
  Button,
  Flex,
  HStack,
} from "@chakra-ui/react";
import noImage from "../assets/no_imager.webp";

const CarCard = ({ carInfo, onBidClick }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      maxH={320}
      maxW={300}
    >
      <Image
        src={noImage}
        alt="Car"
        borderRadius="lg"
        width="100%"
        height={150}
      />

      <Box p="4">
        <Stack spacing="2">
          <Text fontSize="xl" fontWeight="semibold">
            {carInfo.brand} {carInfo.model}
          </Text>
          <Text color="gray.500">{carInfo.year}</Text>
        </Stack>
      </Box>

      <Box p="4" borderTopWidth="1px" borderTopColor="gray.200">
        <Flex justify="space-between" alignItems="center">
          <HStack>
            <Text fontSize="sm" color="gray.500">
              Latest Bid:
            </Text>
            <HStack justifyItems={"center"}>
              <Text fontWeight={"bold"} fontSize="md">
                {carInfo.highest_bid ? carInfo.highest_bid.price : null}
              </Text>
              <Text fontWeight={"medium"} fontSize="sm">
                AED
              </Text>
            </HStack>
          </HStack>

          <Button colorScheme="blue" size="sm" onClick={onBidClick}>
            Place a Bid
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CarCard;
