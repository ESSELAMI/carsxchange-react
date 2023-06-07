import { SimpleGrid, Box, Button, Text } from "@chakra-ui/react";
import Header from "../components/Header";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import noImage from "../assets/no_imager.webp";
import CarForm from "../components/CarForm";
import { useSelector, useDispatch } from "react-redux";
import { createCar, getCars, reset } from "../features/car/carSlice";
function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cars } = useSelector((state) => state.cars);
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
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      console.log(message);
    }
    dispatch(getCars());
    console.log("cars ====>", cars);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleEditClick = (car) => {
    setSelectedCar(car);
    setDrawerOpen(true);
  };
  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }
  return (
    <>
      <Header />;
      <Box p={10}>
        <Button colorScheme="blue" onClick={() => setDrawerOpen(true)}>
          Add new car {cars ? cars.length : null}
        </Button>
      </Box>
      <SimpleGrid p={10} minChildWidth={300} spacing={10}>
        {cars && cars.length > 0 ? (
          cars.map((car) => (
            <CarCard
              key={car.id}
              carInfo={car}
              latestBid={car.latestBid}
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

export default Dashboard;
