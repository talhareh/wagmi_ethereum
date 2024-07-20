import { Box, Button, Container, Grid, Stack, TextField, Typography,LinearProgress, Divider
       } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastNotify } from "../components/SmallComponents/AppComponents";
import {  fetchMetrics } from "../ConnectivityAssets/hooks";

import axios from 'axios'

import './mod.css'


const gridItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const btnStyle = {
  textTransform: "capitalize",
  py: 1,
  width: { xs: "60%", sm: "50%" },
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
  fontFamily: "ProductSansRegular",
  color: "#fff",
  backgroundColor: "#F8922A",
  "&:hover": {
    opacity: 0.8,
    color: "#fff",
    backgroundColor: "#F8922A",
  },
};
function Moderator() {

  const [usdRaised, setUsdRaised] = useState(null)
  const [soldTok, setSoldTok] = useState(null)
 
  const [prog, setProg] = useState(null)
  const [target, setTarget] = useState(null)

  const [metrics, setMetrics] = useState({})
  const [calcUsd, setCalcUsd] = useState(0)
  const [calcTok, setCalcTok] = useState(0)
  const [esProg, calcEsProg] = useState(0)
  const [load, setLoad] = useState(false)
  let price = 0.0000246

  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const showAlert = (message, severity = "error") => {
    setAlertState({
      open: true,
      message,
      severity,
    });
  };

  const checkingRate = () => {
    setLoad(true)
    
  }
  const updateStat = async () =>{
    const data = {
      usr_raised:usdRaised || 0,
      views_taken: soldTok || 0,
      average: prog || 0,
      usr_target: target || 0
    };

    try {
      await axios.post('http://app.bitcoinfansclub.com/update', data);
      setUsdRaised(null)
      setSoldTok(null)
      setProg(null)
      setTarget(null)
      showAlert('Values updated successfully!', 'success');
    } catch (error) {
      showAlert('There was an error updating the values!');
    }
  }

  useEffect( () =>{
    async function getData(){
      let met = await fetchMetrics()
      setMetrics(met[0])
    }
    getData()
  },[])
  
  return (
    <Box>
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="center">
            <Grid 
            item 
            xs={6} 
            sm={6} 
            pl={{ xs: 1 }}
            sx={{display:"flex"}}
            > 
                <Box
                  sx={{
                    backgroundColor: "#889de1",
                    borderRadius: "10px",
                    p: { xs: 1, sm: 2 },
                    margin:"5px"
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "10px", sm: "12px" },
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Usd Raised
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "ProductSansRegular",
                        fontSize: { xs: "15px", sm: "20px" },
                        color: "#fff",
                        wordBreak: "break-all",
                      }}
                    >
                      {metrics.usr_raised}
                    </Typography>
                    
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#889de1",
                    borderRadius: "10px",
                    p: { xs: 1, sm: 2 },
                    margin:"5px"
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "10px", sm: "12px" },
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Tokens Sold
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "ProductSansRegular",
                        fontSize: { xs: "15px", sm: "20px" },
                        color: "#fff",
                        wordBreak: "break-all",
                      }}
                    >
                      {metrics.views_taken}
                    </Typography>
                    
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#889de1",
                    borderRadius: "10px",
                    p: { xs: 1, sm: 2 },
                    margin:"5px"
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "10px", sm: "12px" },
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Progress Bar
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "ProductSansRegular",
                        fontSize: { xs: "15px", sm: "20px" },
                        color: "#fff",
                        wordBreak: "break-all",
                      }}
                    >
                      {metrics.average}
                    </Typography>
                    
                  </Box>
                </Box>

                <Box
                  sx={{
                    backgroundColor: "#889de1",
                    borderRadius: "10px",
                    p: { xs: 1, sm: 2 },
                    margin:"5px"
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "10px", sm: "12px" },
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                    Presale Target
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "ProductSansRegular",
                        fontSize: { xs: "15px", sm: "20px" },
                        color: "#fff",
                        wordBreak: "break-all",
                      }}
                    >
                      {metrics.usr_target}
                    </Typography>
                    
                  </Box>
                </Box>    
            </Grid> 
          </Grid>
            {/* Start of second Row*/ }
            
            
            <Grid item xs={12} sm={6} md={3}>
              <Box 
              sx={{
                    display: 'flex',
                    flexDirection: 'column', 
                     
                  }}>
                <TextField
                  sx={{
                    marginBottom: '8px',
                    backgroundColor: "#ffff"
                  }}
                />
                <Button 
                  sx={btnStyle}
                  onClick={checkingRate}
                >
                  Check
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Stack
                sx={{
                  my: 3,
                  py: 4,
                  borderRadius: "12px",
                  backgroundColor: "#f5f5f5",
                  padding: 2
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: 600 }}>USD</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: 600 }}>Tokens</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={{ fontWeight: 600 }}>Progress Bar</Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography>{calcUsd}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>{calcTok}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          height: 10,
                          borderRadius: 5,
                        }}
                      >
                        {esProg}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            
          
          
        </Container>
      
    </Box>
  );
}

export default Moderator;
