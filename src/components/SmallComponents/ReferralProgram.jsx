/* eslint-disable react/prop-types */
import { useContext, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Grid,
  Button,
  InputAdornment,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Dollar } from "./Images";
import { StyledInputTwo, ToastNotify } from "./AppComponents";
import { AppContext } from "../../utils/utils";
import { isAddress } from "viem";
import { presaleReadFunction } from "../../ConnectivityAssets/hooks";

const modalStyle = {
  "& .MuiDialog-root": {
    zIndex: "1301 !important",
  },
  "&.MuiDialog-container": {
    overflowY: "hidden !important",
  },
  "& .MuiDialog-paperScrollPaper": {
    backgroundColor: "#fff",
    height: "auto",
    borderRadius: "10px",
  },
  "& .dialoge__content__section": {
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid transparent",
  },
  "& .MuiDialogContent-root": {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
};

export default function ReferralProgram({
  open,
  setOpen,
  copiedText,
  setCopiedText,
  userClaimableTokens,
  userTotalReward,
  claimTokensFunction,
  setShowAff
}) {
  const { account } = useContext(AppContext);
  const [showRemove, setShowRemove]= useState(false)
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
  const handleClose = () => {
    setOpen(false);
  };

  const handleCopy = () => {
    if (!account) {
      return;
    }
    try {
      navigator.clipboard.writeText(account);
      showAlert("Referral code copied", "success");
    } catch (err) {
      console.error("Failed to copy contents: ", err);
    }
  };

  const clearReferral = () => {
    setCopiedText('');
    setShowAff(false)
    setShowRemove(false);
  };

  const checkRefCode = useCallback(async () => {    
    try {
        const userData = await presaleReadFunction("users", [copiedText]);
        if (userData[10]) {
            showAlert("Referral Code Accepted", "success");
            setShowAff(true);
            setShowRemove(true)
        } else {
            showAlert("Referral Code is Not Eligible");
        }
    } catch (e) {
        showAlert("Something Went Wrong. Please Contact Support")
        console.log(e);
    }
  }, [copiedText, setShowAff]);

  return (
    <Dialog
      sx={modalStyle}
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={"xs"}
      id="referral-program"
    >
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <DialogContent className="dialoge__content__section">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "ProductSansRegular",
              textTransform: "uppercase",
              color: "#365acb",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            BTCFANS Affliate Program
          </Typography>
          <CloseIcon
            onClick={handleClose}
            sx={{ color: "#365acb", cursor: "pointer" }}
          />
        </Box>
        <Box mt={1}>
          <Typography
            sx={{
              fontFamily: "ProductSansRegular",
              fontSize: "14px",
            }}
          >
            Earn 2.5% for referring others, 5% for being referred. To activate the referral code, 
            a minimum purchase of $20 worth of BTCFANS Tokens is required. Rewards are given in the 
            same currency (BNB/USDT) used for the purchase.
          </Typography>
        </Box>
        <Grid container mt={1.5}>
          <Grid item xs={6} pr={{ xs: 1 }}>
            <Box
              sx={{
                backgroundColor: "#889de1",
                borderRadius: "10px",
                p: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "ProductSansRegular",
                  fontSize: "10px",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Unclaimed Rewards
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Box component="img" mr={0.5} src={Dollar} alt=""sx={{
                    width: { xs: "18px", sm: "22px" },
                  }} />
                <Typography
                  sx={{
                    fontFamily: "ProductSansRegular",
                    fontSize: { sx: "10px", sm: "16px" },
                    color: "#fff",
                    wordBreak: "break-all",
                  }}
                >
                  {userClaimableTokens}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} pl={{ xs: 1 }}>
            <Box
              sx={{
                backgroundColor: "#889de1",
                borderRadius: "10px",
                p: { xs: 1, sm: 2 },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "ProductSansRegular",
                  fontSize: "10px",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Total Rewards
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Box 
                  component="img" 
                  mr={0.5} 
                  src={Dollar} 
                  alt="" 
                  sx={{
                    width: { xs: "18px", sm: "22px" },
                  }} />
                <Typography
                  sx={{
                    fontFamily: "ProductSansRegular",
                    fontSize: { sx: "10px", sm: "16px" },
                    color: "#fff",
                    wordBreak: "break-all",
                  }}
                >
                  {Math.trunc(userTotalReward*100)/100}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={1}>
          <Button
            onClick={claimTokensFunction}
            disabled={account ? false : true}
            sx={{
              color: "#fff",
              width: "100%",
              backgroundColor: "#F8922A",
              "&.Mui-disabled": {
                color: "#fff",
                backgroundColor: "#939392",
              },

              borderRadius: "50px",
              textTransform: "capitalize",
              fontFamily: "ProductSansRegular",
              "&:hover": {
                backgroundColor: "#F8922A",
                opacity: 0.8,
              },
            }}
          >
            Claim
          </Button>
        </Box>
        <Box my={1.75}>
          <hr />
        </Box>

      <Box>  
      <Typography
        sx={{
          fontFamily: 'ProductSansRegular',
          textTransform: 'uppercase',
          color: '#365acb',
          fontSize: '12px',
          fontWeight: 600,
          mb: 0.5,
        }}
      >
        Enter Your Referral Code
      </Typography>
      <Stack width="100%">
        <StyledInputTwo
          type="text"
          placeholder="Enter Your Referral Code"
          value={copiedText}
          inputcolor="#000"
          onChange={(e) => setCopiedText(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" sx={{ padding: 0.1 }}>
                {!showRemove ? (
                  <Box
                    sx={{
                      fontFamily: 'ProductSansRegular',
                      backgroundColor: '#F8922A',
                      py: 0.75,
                      px: 3,
                      borderRadius: '50px',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (!account) {
                        return showAlert('Please Connect Your Wallet');
                      }
                      if (!copiedText) {
                        return showAlert('Please Enter Your Referral Code');
                      }
                      if (!isAddress(copiedText)) {
                        return showAlert('Please Enter Valid Referral Code');
                      }
                      checkRefCode();
                      // handleClose();
                    }}
                  >
                    Apply
                  </Box>
                ) : (
                  <Box
                    sx={{
                      fontFamily: 'ProductSansRegular',
                      backgroundColor: '#F8922A',
                      py: 0.75,
                      px: 3,
                      borderRadius: '50px',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={clearReferral}
                  >
                    Remove
                  </Box>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Box>
        <Box my={1.75}>
          <hr />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "ProductSansRegular",
              textTransform: "uppercase",
              color: "#365acb",
              fontSize: "12px",
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            Share Your Referral Code to Your Friend
          </Typography>
          <Stack width="100%">
            <StyledInputTwo
              bgColor={"#023FBA"}
              type="text"
              placeholder="Enter Your Referral Code"
              value={account ? account : "Connect Wallet To View Code"}
              inputcolor="#fff"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end" sx={{ padding: 0 }}>
                    <Box
                      sx={{
                        fontFamily: "ProductSansRegular",
                        backgroundColor: "#F8922A",
                        py: 0.75,
                        px: 3,
                        borderRadius: "50px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                      
                      onClick={() => {
                        if (!account) {
                          return showAlert("Please Connect Your Wallet");
                        }else{
                          handleCopy()
                        }
                      
                      }}
                    >
                      Share
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
