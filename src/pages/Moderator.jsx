import { Box, Button, Container, Grid, Stack, TextField, Typography,LinearProgress, Divider
       } from "@mui/material";
import { useEffect, useState } from "react";
import { ToastNotify } from "../components/SmallComponents/AppComponents";
import {  fetchMetrics } from "../ConnectivityAssets/hooks";
import CalcAmount from "../components/SmallComponents/CalcAmount";
import axios from 'axios'

import './mod.css'



const btnStyle = {
  textTransform: "capitalize",
  py: 1,
  width: { xs: "60%", sm: "10%" },
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
  const [calcUsd, setCalcUsd] = useState()
  const [load, setLoad] = useState(false)

  const handleChange = (event) => {
    const newValue = event.target.value.replace(/[^0-9\b]/g, '');
    setCalcUsd(newValue);
  };
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


  const updateAll = async () =>{
    const data = {
      usr_raised:usdRaised || 0,
      views_taken: soldTok || 0,
      average: prog || 0,
      usr_target: target || 0
    };

    try {
      await axios.post('http://app.bitcoinfansclub.com/update', data);
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
        <CalcAmount
          open={load}
          setOpen={setLoad}
          calcUsd = {calcUsd}
          updateAll={updateAll}
        />
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
            <Box 
              sx={{
                    display: 'block',
                    flexDirection: 'column', 
                     
                  }}>
                <TextField
                  sx={{
                    marginBottom: '8px',
                    backgroundColor: "#ffff"
                  }}
                  placeholder="Enter USD here"
                  autoComplete="off"
                  value={calcUsd}
                  onChange={handleChange}
                />
            </Box>
            <Button 
                  sx={btnStyle}
                  onClick={() => setLoad(true)}
                >
                  Check
                </Button>
                     
        </Container>
      
    </Box>
  );
}

export default Moderator;
