import { SimpleGrid, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import noImage from "../assets/no_imager.webp";


function Dashboard() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Header />;
      <SimpleGrid p={10} minChildWidth={300} spacing={10} >
        <CarCard
          carInfo="car info"
          latestBid="3123.23"
          onBidClick={() => ({})}
        ></CarCard>
      </SimpleGrid>
    </>
  );
}

export default Dashboard;
