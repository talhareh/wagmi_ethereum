import { Box, Button, Container, Grid, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import Header from "../components/Header";
import PresaleStatus from "../components/SmallComponents/PresaleStatus";
import Loading from "../components/SmallComponents/loading";
import { ToastNotify } from "../components/SmallComponents/AppComponents";
import { presaleWriteFunction } from "../ConnectivityAssets/hooks";
import { AppContext } from "../utils/utils";
import PresaleStage from "../components/SmallComponents/PresaleStage";
import IncUSDRaised from "../components/SmallComponents/IncUSDRaised";

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
  const { account } = useContext(AppContext);
  const [openPresaleStage, setOpenPresaleStage] = useState(false);
  const [presaleStage, setPresaleStage] = useState("");
  const [openPresaleStatus, setOpenPresaleStatus] = useState(false);
  const [presaleStatus, setPresaleStatus] = useState("");
  const [openUsd, setOpenUsd] = useState(false)
  const [usdRaised, setUsdRaised] = useState(0)
  const [openSoldTok, setOpenSoldTok] = useState(false)
  
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

  const USDHandler = () =>{
    console.log('Setting usd raised $$$' , usdRaised)

    setTimeout(() =>{
      setOpenUsd(false)
    }, 4000)
  }



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
        USDHandler= {USDHandler}
      />

      <AddTokensSold
        open={openUsd}
        setOpen = {setOpenUsd}
        usdRaised={usdRaised}
        setUsdRaised={setUsdRaised}
        USDHandler= {USDHandler}
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
              <Button sx={btnStyle} onClick={() => setOpenUsd(true)}>
                Add USD
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={endPresaleStatusHandler}>
                Add Tokens Sold
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={gridItemStyle}>
              <Button sx={btnStyle} onClick={() => setOpenPresaleStage(true)}>
                Increase Progress Bar
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}

export default Admin;
