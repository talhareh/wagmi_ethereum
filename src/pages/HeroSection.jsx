//import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Header";
import { Elon } from "../components/SmallComponents/Images";
import PresaleBox from "../components/SmallComponents/PresaleBox";
import "../components/Header.css"



function HeroSection() {
  //const [amount, setAmount] = useState("");
  const mobileMatches = useMediaQuery("(max-width:390px)");
  const matches1 = useMediaQuery("(max-width:700px)");

  const openPDF = () => {
    window.open('./whitepaper.pdf', '_blank');
  };

  return (
    <>
      <Header />
      <Box 
        component="section" 
        maxWidth={"100%"} 
        py={{ xs: 0.5, sm: 1 }}
        sx={{
          margin: { xs: "5px 0 0 0", sm: "0px 60px 0px 55px", md: "0px 60px 0px 55px", lg: "0px 60px 0px 55px" },
        }}
        >
        <Container 
          maxWidth="xl" 
          sx={{ 
                px: { xs: 1, md: 3 },
                 
            }}>
          <Grid
            container
            sx={{ 
                backgroundColor: "#023FBA", borderRadius: "25px" }}
          >
            <Grid
              item
              xs={12}
              md={12}
              lg={6.5}
              sx={{
                p: 7,
                px: { xs: 2, sm: matches1 ? 3 : 7 },
                py: { xs: 3, sm: 7 },
                
              }}
              position={"relative"}
              minHeight={{
                xs: "140px",
                sm: matches1 ? "250px" : "450px",
                md: "600px",
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "Guardians",
                  fontSize: {
                    xs: mobileMatches ? "10px" : "12px",
                    sm: "16px",
                    md: "30px",
                  },
                  fontWeight: 700,
                  color: "#fff",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                STEP INTO THE FANS
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  mt: 1,
                  fontFamily: "Guardians",
                  fontSize: {
                    xs: mobileMatches ? "16px" : "20px",
                    sm: "30px",
                    md: "65px",
                  },
                  fontWeight: 700,
                  color: "#F8922A",
                  position: "relative",
                  zIndex: 3,
                
                }}
              >
                REVOLUTION
              </Typography>
              <Typography
                sx={{
                  fontFamily: "ProductSansRegular",
                  color: "#fff",
                  fontSize: {
                    xs: mobileMatches ? "8px" : "10px",
                    sm: "14px",
                    md: "18px",
                  },
                  position: "relative",
                  zIndex: 3,
                }}
              >
                Step into the fans revolution. Join this presale journey
                <br />
                to be part of reshaping the intersection of
                <br />
                technology and finance.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: " start",
                  alignItems: "center",
                  position: { xs: "relative", lg: "absolute" },
                  bottom: { xs: "unset", lg: "40%" },
                  zIndex: 3,
                  mt: { xs: 2, lg: 0 },
                }}
              >
                <Button
                  sx={{
                    textTransform: "capitalize",
                    py: { xs: 0.3, sm: 1 },
                    px: { xs: mobileMatches ? 0.5 : 1.5, sm: 3 },
                    fontSize: {
                      xs: mobileMatches ? "9px" : "12px",
                      sm: "16px",
                    },
                    fontFamily: "ProductSansRegular",
                    color: "#fff",
                    backgroundColor: "#365ACB",
                    mr: 1,
                    "&:hover": {
                      backgroundColor: "#F8922A",
                    },
                  }}
                >
                  Audit Report
                </Button>
                <Button
                  onClick= {openPDF}
                  sx={{
                    textTransform: "capitalize",
                    py: { xs: 0.3, sm: 1 },
                    px: { xs: mobileMatches ? 0.5 : 1.5, sm: 3 },
                    fontSize: {
                      xs: mobileMatches ? "9px" : "12px",
                      sm: "16px",
                    },
                    fontFamily: "ProductSansRegular",
                    color: "#fff",
                    backgroundColor: "#365ACB",
                    "&:hover": {
                      backgroundColor: "#F8922A",
                    },
                  }}
                >
                  Whitepaper
                </Button>
              </Box>
            
              <Box
                component="img"
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  maxWidth: { xs: "130px", sm: matches1 ? "250px" : "414px" },
                  zIndex: 1,
                  userDrag:"none"
                }}
                src={Elon}
                alt=""
              />
              
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              mx={{ xs: 0, md: "auto", lg: 0 }}
              lg={4.5}
              px={{ xs: 0, sm: 3.5 }}
              py={{ xs: 2, sm: 3.5 }}
              pt={{ xs: 0, lg: 3.5 }}
            >
              <PresaleBox />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default HeroSection;
