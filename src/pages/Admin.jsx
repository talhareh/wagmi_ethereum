import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
// import Header from "../components/Header";
import PresaleStatus from "../components/SmallComponents/PresaleStatus";
import Loading from "../components/SmallComponents/loading";
import { ToastNotify } from "../components/SmallComponents/AppComponents";
import { presaleWriteFunction, fetchMetrics } from "../ConnectivityAssets/hooks";
import { AppContext } from "../utils/utils";
import PresaleStage from "../components/SmallComponents/PresaleStage";
import IncUSDRaised from "../components/SmallComponents/IncUSDRaised";
import AddTokensSold from "../components/SmallComponents/AddTokensSold";
import axios from 'axios'
import ProgIncr from "../components/SmallComponents/ProgIncr";
import TargetStage from "../components/SmallComponents/TargetStage";


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
function Admin() {
  const { account} = useContext(AppContext);
  const [openPresaleStage, setOpenPresaleStage] = useState(false);
  const [presaleStage, setPresaleStage] = useState("");
  const [openPresaleStatus, setOpenPresaleStatus] = useState(false);
  const [presaleStatus, setPresaleStatus] = useState("");
  
  const [openUsd, setOpenUsd] = useState(false)
  const [usdRaised, setUsdRaised] = useState(null)
  const [openSoldTok, setOpenSoldTok] = useState(false)
  const [soldTok, setSoldTok] = useState(null)
  const [openProg, setOpenProg] = useState(false)
  const [prog, setProg] = useState(null)
  const [target, setTarget] = useState(null)
  const [openTar, setOpenTar] = useState(false)
  const [metrics, setMetrics] = useState({})
  
  const [loading, setLoading] = useState(false);
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

  const presaleStatusHandler = async () => {
    try {
      if (!account) {
        return showAlert("Please connect your wallet");
      }
      if (!presaleStatus) {
        return showAlert("Please enter a value");
      }
      if (presaleStatus !== "true" && presaleStatus !== "false") {
        return showAlert("Please enter a valid value");
      }
      setLoading(true);
      await presaleWriteFunction("setPresaleStatus", [
        presaleStatus?.toLowerCase() === "true" ? true : false,
      ]);
      setLoading(false);
      setPresaleStatus("");
      setOpenPresaleStatus(false);
      showAlert("Success! Transaction Confirmed", "success");
    } catch (e) {
      console.log(e);
      setLoading(false);
      showAlert(e?.shortMessage, "error");
    }
  };

  const endPresaleStatusHandler = async () => {
    try {
      if (!account) {
        return showAlert("Please connect your wallet");
      }
      setLoading(true);
      await presaleWriteFunction("endPresale");
      setLoading(false);
      showAlert("Success! Transaction Confirmed", "success");
    } catch (e) {
      console.log(e);
      setLoading(false);
      showAlert(e?.shortMessage, "error");
    }
  };

  const presaleStageHandler = async () => {
    try {
      if (!account) {
        return showAlert("Please connect your wallet");
      }
      if (!presaleStage) {
        return showAlert("Please enter a value");
      }

      setLoading(true);
      await presaleWriteFunction("setCurrentStage", [+presaleStage]);
      setLoading(false);
      setPresaleStage("");
      setOpenPresaleStage(false);
      showAlert("Success! Transaction Confirmed", "success");
    } catch (e) {
      console.log(e);
      setLoading(false);
      showAlert(e?.shortMessage, "error");
    }
  };

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
      <Loading loading={loading} />
      <PresaleStatus
        open={openPresaleStatus}
        setOpen={setOpenPresaleStatus}
        presaleStatus={presaleStatus}
        setPresaleStatus={setPresaleStatus}
        presaleStatusHandler={presaleStatusHandler}
      />

      <IncUSDRaised
        open={openUsd}
        setOpen = {setOpenUsd}
        usdRaised={usdRaised}
        setUsdRaised={setUsdRaised}
        USDHandler= {updateStat}
      />

      <AddTokensSold
        open={openSoldTok}
        setOpen = {setOpenSoldTok}
        soldToken={soldTok}
        setSoldToken={setSoldTok}
        soldTokHandler= {updateStat}
      />

      <ProgIncr
        open={openProg}
        setOpen = {setOpenProg}
        progIncr={prog}
        setProgIncr={setProg}
        ProgIncrHandler= {updateStat}
      />

      <TargetStage
      open= {openTar}
      setOpen = {setOpenTar}
      target = {target}
      setTarget={setTarget}
      targetHandler={updateStat}
      />
      

      <PresaleStage
        open={openPresaleStage}
        setOpen={setOpenPresaleStage}
        presaleStage={presaleStage}
        setPresaleStage={setPresaleStage}
        presaleStageHandler={presaleStageHandler}
      />
      <Container maxWidth="lg">
        <Stack
          sx={{
            backgroundColor: "#023FBA",
            my: 3,
            py: 4,
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} sm={6} md={4} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenPresaleStatus(true)}>
                Set Presale Status
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={endPresaleStatusHandler}>
                End Presale
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenPresaleStage(true)}>
                Set Current Stage
              </Button>
            </Grid>
          </Grid>
        </Stack>
        
        
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
        
        <Stack
          sx={{
            backgroundColor: "#023FBA",
            my: 3,
            py: 4,
            borderRadius: "12px",
          }}
        >
          <Grid container spacing={2} justifyContent={"center"}>
            <Grid item xs={12} sm={6} md={3} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenUsd(true)}>
                Add USD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() =>setOpenSoldTok(true)}>
                Add Tokens Sold
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenProg(true)}>
                 Progress Bar
              </Button>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenTar(true)}>
                Set Target
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default Admin;
