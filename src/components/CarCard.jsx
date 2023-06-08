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
import { useSelector } from "react-redux";

const CarCard = ({
  carInfo,
  onBidClick,
  isOwner,
  onEditClick,
  onDeleteClick,
}) => {
  const { isLoading, isError, message } = useSelector((state) => state.cars);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      maxH={450}
      maxW={280}
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
          <Text color="gray.500">Fuel : {carInfo.fuel_type}</Text>
          <Text color="gray.500">Type : {carInfo.body_type}</Text>
          <Text color="gray.500">Seats : {carInfo.seats}</Text>
          <Text color="gray.500">Year : {carInfo.year}</Text>
          <Text color="gray.500">Mileage : {carInfo.mileage}</Text>
        </Stack>
      </Box>
      {isOwner ? (
        <Box
          p="4"
          borderTopWidth="1px"
          borderTopColor="gray.200"
          justifyItems="center"
        >
          <Flex justify="center" alignItems="center">
            <Button
              colorScheme="orange"
              size="sm"
              onClick={onEditClick}
              px={20}
            >
              Edit
            </Button>
          </Flex>
        </Box>
      ) : (
        <Box p="4" borderTopWidth="1px" borderTopColor="gray.200">
          <Flex justify="space-between" alignItems="center">
            <HStack>
              <Text fontSize="sm" color="gray.500">
                Bid:
              </Text>
              {carInfo.highest_bid ? (
                <HStack justifyItems={"center"}>
                  <Text fontWeight={"bold"} fontSize="md" color={"teal"}>
                    {carInfo.highest_bid ? carInfo.highest_bid.price : null}
                  </Text>
                  <Text fontWeight={"medium"} fontSize="sm" color={"teal"}>
                    AED
                  </Text>
                </HStack>
              ) : (
                <Text fontWeight={"medium"} fontSize="sm" color={"red.500"}>
                  no bids yet
                </Text>
              )}
            </HStack>

            <Button colorScheme="blue" size="sm" onClick={onBidClick}>
              Place a Bid
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default CarCard;
