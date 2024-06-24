//import { useState } from "react";
/* eslint-disable no-unused-vars*/
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
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DescriptionIcon from '@mui/icons-material/Description';
import './hero.css'



function HeroSection() {
  //const [amount, setAmount] = useState("");
  const mobileMatches = useMediaQuery("(max-width:390px)");
  const matches1 = useMediaQuery("(max-width:700px)");

  const openPDF = () => {
    window.open('https://bitcoinfansclub.com/assets/btcfans_whitepaper.pdf', '_blank');
  };

  const openAudit = () => {
    window.open('https://bitcoinfansclub.com/assets/btcfans-auditreport.pdf', '_blank');
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
          <div className= "mainHero">
          <Grid
            container
            sx={{ 
              backgroundColor: {xs:"#023FBA", sm :'#023FBA00'},
              borderRadius: "25px", opacity: {xs:1, sm:1} }}
          >
            
            <Grid
              item
              xs={12}
              md={12}
              lg={7}
              sx={{
                p: 7,
                px: { xs: 3, sm: matches1 ? 3 : 7 },
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
                  wordSpacing:{sm:-20.5, xs: -10}
                }}
              >
                JOIN THE WORLD OF
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
                #BITCOINISM
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
                 Engage with the revolution and connect with a community of passionate <br/>Bitcoin enthusiasts. 
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: " start",
                  alignItems: "center",
                  position: "relative",

                  zIndex: 3,
                  mt: { xs: 2, lg: 2 },
                }}
              >
                <Button
                  onClick= {openAudit}
                  startIcon={<VerifiedUserIcon
                                
                              />}
                  sx={{
                    textTransform: "capitalize",
                    py: { xs: 0.5, sm: 1 },
                    px: { xs: mobileMatches ? 0.5 : 1.5, sm: 2 },
                    fontSize: {
                      xs: mobileMatches ? "9px" : "12px",
                      sm: "16px",
                    },
                    fontFamily: "ProductSansRegular",
                    color: "#fff",
                    backgroundColor: "#365ACB",
                    borderRadius:"50px",
                    mr: 1,
                    
                    "&:hover": {
                      backgroundColor: "#F8922A",
                    },
                  }}
                >
                  Audit
                </Button>
                <Button
                  onClick= {openPDF}
                  startIcon={<DescriptionIcon/>}
                  sx={{
                    textTransform: "capitalize",
                    py: { xs: 0.5, sm: 1 },
                    px: { xs: mobileMatches ? 0.5 : 1.5, sm: 2 },
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
                    borderRadius:"50px"
                  }}
                >
                  Whitepaper
                </Button>
              </Box>
            
              
              
            </Grid>
            <Grid
              item
              xs={12}
              md={10}
              mx={{ xs: 0, md: "auto", lg: 0 }}
              lg={5}
              px={{ xs: 0, sm: 3.5 }}
              py={{ xs: 0, sm: 3.5 }}
              pt={{ xs: 0, lg: 3.5 }}
            >
              <PresaleBox />
            </Grid>
          </Grid>
          </div>  
        </Container>
        
      </Box>
      
    </>
  );
}

export default HeroSection;
