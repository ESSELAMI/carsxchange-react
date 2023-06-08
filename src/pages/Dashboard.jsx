import {
  SimpleGrid,
  Box,
  Spinner,
  Button,
  Text,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import noImage from "../assets/no_imager.webp";
import CarForm from "../components/CarForm";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { deleteCar, getCars, reset } from "../features/car/carSlice";
import { AddIcon } from "@chakra-ui/icons";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);
  const [prevCars, setPrevCars] = useState([]);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.cars
  );
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    seats: 0,
    year: "",
    mileage: "",
    fuel_type: "",
    body_type: "",
  });
  const { brand, model, seats, year, mileage, fuel_type, body_type } = formData;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const toast = useToast();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    if (!isLoading && isSuccess && message) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    dispatch(getCars());

    return () => {
      dispatch(reset());
    };
  }, [user, dispatch]);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (car) => {
    dispatch(deleteCar(car.id));
  };

  return (
    <>
      <Header />
      <CarForm
        car={selectedCar}
        isOpen={isDrawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => {
          setDrawerOpen(false), setSelectedCar(null);
          setFormData([]);
        }}
        onUpdateCar={(updatedCar) => {
          // Update the car in the state
          setCars((prevCars) =>
            prevCars.map((c) => (c.id === updatedCar.id ? updatedCar : c))
          );
        }}
      />
      <Box p={8} position="relative">
        <Button
          colorScheme="blue"
          onClick={() => setDrawerOpen(true)}
          position="fixed"
          bottom={6}
          right={6}
          borderRadius="full"
          width="50px"
          height="50px"
          boxShadow="md"
        >
          <AddIcon />
        </Button>
      </Box>
      <Box
        minHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        pb={20}
      >
        {isLoading ? (
          <SimpleGrid px={10} minChildWidth={280} spacing={8} w="100%">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} height={450} borderRadius="md" />
            ))}
          </SimpleGrid>
        ) : (
          <SimpleGrid px={10} minChildWidth={280} spacing={8} w="100%">
            {cars && cars.length > 0 ? (
              cars.map((car) => (
                <CarCard
                  isOwner={
                    car.user
                      ? car.user?.id === user?.user?.id
                        ? true
                        : false
                      : false
                  }
                  key={car.id}
                  carInfo={car}
                  latestBid={car.highest_bid ? car.highest_bid.price : null}
                  onBidClick={() => ({})}
                  onEditClick={() => handleEditClick(car)} // Pass the car object to the handler
                  onDeleteClick={() => handleDeleteClick(car)}
                />
              ))
            ) : (
              <Box p={20}>
                <Text>Car list is empty!</Text>
              </Box>
            )}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}

export default Dashboard;
