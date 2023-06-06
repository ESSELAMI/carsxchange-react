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

const CarCard = ({ carInfo, latestBid, onBidClick }) => {
  const { imageUrl, make, model, year } = carInfo;

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      maxH={350}
      maxW={350}
    >
      <Image src={noImage} alt="Car" borderRadius="lg" width="100%" />

      <Box p="4">
        <Stack spacing="2">
          <Text fontSize="xl" fontWeight="semibold">
            {make} {model}
          </Text>
          <Text color="gray.500">{year}</Text>
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
                {latestBid}
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
