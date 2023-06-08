import { SimpleGrid, Box, Spinner, Button, Text } from "@chakra-ui/react";
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import noImage from "../assets/no_imager.webp";
import CarForm from "../components/CarForm";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createCar, getCars, reset } from "../features/car/carSlice";
import { AddIcon } from "@chakra-ui/icons";
function MyCars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);
  const [prevCars, setPrevCars] = useState([]);
  const { isLoading, isError, message } = useSelector((state) => state.cars);
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
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
  const userCars = cars.filter((car) => car.user.id === user?.user.id);

  return (
    <>
      <Header />;
      <CarForm
        car={selectedCar}
        isOpen={isDrawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
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
      >
        {isLoading ? (
          <Spinner size="xl" color="blue.500" />
        ) : (
          <SimpleGrid px={10} minChildWidth={280} spacing={8} w="100%">
            {userCars && userCars.length > 0 ? (
              userCars.map((car) => (
                <CarCard
                  isOwner={true}
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

export default MyCars;
