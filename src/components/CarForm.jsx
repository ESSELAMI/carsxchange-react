import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  FormLabel,
  Input,
  Select,
  Stack,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { createCar, updateCar } from "../features/car/carSlice";

export default function CarForm({ car, isOpen, onOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: car?.id || null,
    brand: car?.brand || "",
    model: car?.model || "",
    fuel_type: car?.fuel_type || "",
    body_type: car?.body_type || "",
    mileage: car?.mileage || 0,
    year: car?.year || "",
    seats: car?.seats || "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const firstField = useRef();

  useEffect(() => {
    if (isOpen && car) {
      setFormData({
        id: car.id,
        brand: car.brand,
        model: car.model,
        fuel_type: car.fuel_type,
        body_type: car.body_type,
        mileage: car.mileage,
        year: car.year,
        seats: car.seats,
      });
    }
  }, [isOpen, car]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    // setLoading(true);
    console.log(formData);
    dispatch(createCar(formData));
    // const request = car?.id
    //   ? axiosClient.put(`/cars/${car.id}`, formData)
    //   : axiosClient.post("/cars", formData);

    // request
    //   .then(() => {
    //     setNotification(
    //       car?.id
    //         ? "Car was successfully updated"
    //         : "Car was successfully created"
    //     );

    //     if (car?.id) {
    //       setCars(
    //         (prevCars) =>
    //           prevCars.map((prevCar) =>
    //             prevCar.id === car.id ? { ...prevCar, ...formData } : prevCar
    //           ),
    //         console.log("formData =" + formData)
    //       );
    //     } else {
    //       console.log("formData =" + formData);
    //       setCars((prevCars) => [...prevCars, formData]);
    //     }

    //     onClose();
    //   })
    //   .catch((err) => {
    //     const response = err.response;
    //     if (response && response.status === 422) {
    //       setErrors(response.data.errors);
    //     }
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">
          {car?.id ? (
            <h1>
              Update Car: {car.brand} {car.model} {car.year}
            </h1>
          ) : (
            <h1>New Car</h1>
          )}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px">
            <Box>
              <FormLabel htmlFor="brand">Brand</FormLabel>
              <Input
                ref={firstField}
                id="brand"
                placeholder="Please enter brand name"
                value={formData.brand}
                onChange={(ev) =>
                  setFormData({ ...formData, brand: ev.target.value })
                }
              />
            </Box>
            <Box>
              <FormLabel htmlFor="model">Model</FormLabel>
              <Input
                id="model"
                placeholder="Please enter model name"
                value={formData.model}
                onChange={(ev) =>
                  setFormData({ ...formData, model: ev.target.value })
                }
              />
            </Box>

            <Box>
              <FormLabel htmlFor="fuel_type">Select fuel type</FormLabel>
              <Select
                id="fuel_type"
                value={formData.fuel_type}
                onChange={(ev) =>
                  setFormData({ ...formData, fuel_type: ev.target.value })
                }
              >
                <option value="Diesel">Diesel</option>
                <option value="Diesel Hybrid">Diesel Hybrid</option>
                <option value="Electric">Electric</option>
                <option value="Petrol">Petrol</option>
                <option value="Petrol Hybrid">Petrol Hybrid</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="body_type">Select body type</FormLabel>
              <Select
                id="body_type"
                value={formData.body_type}
                onChange={(ev) =>
                  setFormData({ ...formData, body_type: ev.target.value })
                }
              >
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="MUV/SUV">MUV/SUV</option>
                <option value="Coupe">Coupe</option>
                <option value="Wagon">Wagon</option>
                <option value="Van">Van</option>
                <option value="Jeep">Jeep</option>
              </Select>
            </Box>
            <Box>
              <FormLabel htmlFor="seaets">Seats number</FormLabel>
              <NumberInput
                value={formData.seats}
                min={2}
                max={10}
                onChange={(valueString) =>
                  setFormData({ ...formData, seats: parseInt(valueString) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
            <Box>
              <FormLabel htmlFor="year">Year</FormLabel>
              <NumberInput
                value={formData.year}
                min={1970}
                max={2023}
                onChange={(valueString) =>
                  setFormData({ ...formData, year: parseInt(valueString) })
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSubmit} isLoading={loading}>
            {car?.id ? "Update" : "Create"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
