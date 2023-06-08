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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
} from "@chakra-ui/react";
import {
  createCar,
  getCars,
  updateCar,
  deleteCar,
} from "../features/car/carSlice";

export default function CarForm({ car, isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFormSubmited, setIsFormSubmited] = useState(false);

  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.cars
  );

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
    } else if (isOpen && !car) {
      setFormData({
        id: null,
        brand: "",
        model: "",
        fuel_type: "",
        body_type: "",
        mileage: 0,
        year: "",
        seats: "",
      });
    } else if (isOpen && isFormSubmited) {
      setFormData({
        id: null,
        brand: "",
        model: "",
        fuel_type: "",
        body_type: "",
        mileage: 0,
        year: "",
        seats: "",
      });
      onClose();
      setIsFormSubmited(false);
    }
  }, [isOpen, car, isFormSubmited]);

  const onSubmit = async (ev) => {
    ev.preventDefault();

    if (car && car.id) {
      await dispatch(updateCar({ id: car.id, carData: formData }));

      onClose();
    } else {
      await dispatch(createCar(formData));
      onClose();
    }
  };

  const onDelete = async (ev) => {
    ev.preventDefault();

    if (car && car.id) {
      await dispatch(deleteCar(car.id));
      onClose();
    }
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
                <option value=""></option>
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
                <option value=""></option>
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
              <FormLabel htmlFor="seaets">Mileage </FormLabel>
              <NumberInput
                value={formData.mileage}
                min={2}
                max={999999}
                onChange={(valueString) =>
                  setFormData({ ...formData, mileage: parseInt(valueString) })
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
          <HStack>
            <Button colorScheme="blue" onClick={onSubmit} isLoading={isLoading}>
              {car?.id ? "Update" : "Create"}
            </Button>
            {car?.id ? (
              <Button
                colorScheme="red"
                onClick={onDelete}
                isLoading={isLoading}
              >
                Delete
              </Button>
            ) : (
              <Box></Box>
            )}
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
