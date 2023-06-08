import { SimpleGrid, Box, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";
import { createCar, getCars, reset } from "../features/car/carSlice";

function MyCars() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);

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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getCars());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setDrawerOpen(true);
  };

  const userCars = cars.filter((car) => car.user.id === user?.user.id);

  console.log("bbbb", userCars);
  return (
    <>
      <Header />
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
      <SimpleGrid px={10} minChildWidth={280} spacing={8}>
        {userCars && userCars.length > 0 ? (
          userCars.map((car) => (
            <CarCard
              key={car.id}
              carInfo={car}
              latestBid={car.highest_bid ? car.highest_bid.price : null}
              onBidClick={() => ({})}
            />
          ))
        ) : (
          <Box p={20}>
            <Text>Car list is empty!</Text>
          </Box>
        )}
      </SimpleGrid>
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
    </>
  );
}

export default MyCars;
