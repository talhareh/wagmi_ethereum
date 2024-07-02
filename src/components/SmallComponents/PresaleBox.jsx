/* eslint-disable no-unused-vars*/
import React, { useCallback, useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  IconButton,
  Tooltip
} from "@mui/material";
import { Token, Dollar, Elon, Usdt, Bnb } from "./Images";
import { StyledInput, ToastNotify, toLocalFormat } from "./AppComponents";
import ReferralProgram from "./ReferralProgram";
import ClaimTokens from "./ClaimTokens";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { AppContext } from "../../utils/utils";
import Loading from "./loading";
import {
  presaleReadFunction,
  presaleWriteFunction,
  tokenReadFunction,
  usdtReadFunction,
  usdtWriteFunction,
} from "../../ConnectivityAssets/hooks";
import { formatUnits, isAddress, parseUnits } from "viem";
import { presaleAddress } from "../../ConnectivityAssets/environment";
import Skeleton from '@mui/material/Skeleton';
import affliate from '../../assets/affliate.png'
import "../Header.css"

function PresaleBox() {
  const { account, usdRaisedg, soldTok } = useContext(AppContext);
  const { open } = useWeb3Modal();
  const mobileMatches = useMediaQuery("(max-width:390px)");
  const [showAff, setShowAff] = useState(false)
  const [openReferralProgram, setOpenReferralProgram] = useState(false);
  const [openClaimTokens, setOpenClaimTokens] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [buyWith, setBuyWith] = useState("BNB");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [receiveToken, setReceiveToken] = useState(0);
  const [currentStage, setcurrentStage] = useState(0);
  const [tokenPerUSDT, settokenPerUSDT] = useState(0);
  const [tokenPerETH, settokenPerETH] = useState(0);
  const [preSaleEndedStatus, setPresaleEndedStatus] = useState(false);
  const [recivedTokens, setRecivedTokens] = useState(0);
  const [tokenPrice, settokenPrice] = useState(0);
  const [amountRaisedForAll, setamountRaisedForAll] = useState(0);
  const [totalSoldTokens, setTotalSoldTokens] = useState(0);
  const [progressBarForAll, setprogressBarForAll] = useState(0);
  const [userPurchasedTokens, setuserPurchasedTokens] = useState(0);
  const [userClaimableRefTokens, setuserClaimableRefTokens] = useState(0);
  const [userReward, setUserReward] = useState(0);
  const [callFunction, setCallFunction] = useState(true);
  const [copiedText, setCopiedText] = useState("");
  const [fullRaised, setFullRaised] = useState(false)
  const [fullGains, setFullGains]= useState(false)
  const [priceFetched, setPriceFetched] = useState(false)
  const [metrics, setMetrics] = useState([]);
  
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
  

  const handleClickOpen = () => {
    setOpenReferralProgram(true);
  };
  const handleClickOpenPopup = () => {
    setOpenClaimTokens(true);
  };

  const handleInputChange = (event) => {
    const input = event.target.value;
    const newValue = input?.replace(/[^0-9.]/g, "");
    setAmount(newValue);
  };

  const initVoidSigner = async () => {
    try {
      let dec = await tokenReadFunction("decimals");
      dec = +dec?.toString();
      let stage = await presaleReadFunction("currentStage");
      setcurrentStage(+stage?.toString());
      let usdtToToken = await presaleReadFunction("usdtToToken", [
        "1000000000000000000",
        stage?.toString(),
      ]);
      settokenPerUSDT(+formatUnits(usdtToToken?.toString(), dec));
      let ethToToken = await presaleReadFunction("nativeToToken", [
        "1000000000000000000",
        stage?.toString(),
      ]);
      settokenPerETH(+formatUnits(ethToToken?.toString(), dec));
      let presaleData = await presaleReadFunction("phases", [
        +stage?.toString(),
      ]);
      // setEndTime(+presaleData[1]?.toString());
      settokenPrice(+formatUnits(presaleData[0]?.toString(), dec));
      setPriceFetched(true)

      let totalRaisedAmount = await presaleReadFunction("amountRaisedOverAll");
      totalRaisedAmount = +formatUnits(totalRaisedAmount?.toString(), 18);

      let totalTokeSoldContract = await presaleReadFunction("soldToken");
      totalTokeSoldContract = +parseFloat(
        formatUnits(totalTokeSoldContract?.toString(), dec)
      )?.toFixed(0);

      let toSellAmount = 0;

      for (let index = 0; index <= +stage?.toString(); index++) {
        let presaleData = await presaleReadFunction("phases", [+index]);
        toSellAmount += +parseFloat(
          +formatUnits(presaleData[1]?.toString(), dec)
        ).toFixed(0);
      }
      // let totRaised = parseFloat(totalRaisedAmount)?.toFixed(2); 
      // console.log('raised', metrics[0]?.usr_raised || 0)
      // totRaised = parseFloat(totRaised) +metrics[0].usr_raised ; 
      let totRaised = toLocalFormat(parseFloat(totalRaisedAmount)?.toFixed(2)); 
      setamountRaisedForAll(
        totRaised
      );
      setFullRaised(true)
      setTotalSoldTokens(toLocalFormat(+totalTokeSoldContract));
      setFullGains(true)
      // let progForAll = (+totalTokeSoldContract / 99612258802) * 100;
      let progForAll = (+totalTokeSoldContract / +toSellAmount) * 100;
      
      setprogressBarForAll(+progForAll);
      const preSaleStatusContract = await presaleReadFunction("isPresaleEnded");
      setPresaleEndedStatus(preSaleStatusContract);
      setCallFunction(false);
    } catch (error) {
      console.log(error, "ERROR VoidSigner Data");
    }
  };
  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('http://localhost:5000/metrics');
        if (!response.ok) {
          showAlert('User Metrics not fetched');
        }
        const data = await response.json();
        
        const decodedMetrics = data.map(row => ({
          usr_raised: parseInt(atob(row.usr_raised)),
          views_taken: parseInt(atob(row.views_taken)),
          average: parseInt(atob(row.average))
        }));
        //console.log("dec",decodedMetrics)
        setMetrics(decodedMetrics);
        //console.log("dec",decodedMetrics)
        initVoidSigner();
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    }

    fetchMetrics();
  }, [callFunction]); 

  // useEffect(() => {
  //   // console.log('len',metrics.length)
  //   // if(metrics.length === 0){
  //   //   setTimeout(()=>{console.log('waiting 1')},1000)
  //   // }
  //   //initVoidSigner();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [callFunction]);

  useEffect(() => {
    const calculatorUSDT = async () => {
      try {
        if (buyWith === "USDT") {
          let tokenUSDT = +tokenPerUSDT * +amount;
          setRecivedTokens(tokenUSDT?.toFixed(2));
        } else {
          let tokenETH = +tokenPerETH * +amount;
          setRecivedTokens(tokenETH?.toFixed(2));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (+amount > 0) {
      calculatorUSDT();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, buyWith]);

  const userAssetFunction = useCallback(async () => {
    try {
      let bnbLatestPrice = await presaleReadFunction("getLatestPrice");
      bnbLatestPrice = formatUnits(bnbLatestPrice?.toString(), 8);
      let dec = await tokenReadFunction("decimals");
      dec = +dec?.toString();
      const userData = await presaleReadFunction("users", [account]);
      setuserPurchasedTokens(
        parseFloat(formatUnits(userData[9]?.toString(), dec))?.toFixed(2)
      );

      let usdRewardContract = +formatUnits(userData[3]?.toString(), 18);
      let bnbRewardContract =
        +formatUnits(userData[4]?.toString(), 18) * +bnbLatestPrice;
      let totalRewardContract = usdRewardContract + bnbRewardContract;
      let usdClaimedRewardContract = +formatUnits(userData[7]?.toString(), 18);
      let bnbClaimedRewardContract =
        +formatUnits(userData[8]?.toString(), 18) * +bnbLatestPrice;
      let totalClaimedRewardContract =
        usdClaimedRewardContract + bnbClaimedRewardContract;

      setUserReward(
        parseFloat(totalRewardContract + totalClaimedRewardContract)?.toFixed(2)
      );
      

      setuserClaimableRefTokens(parseFloat(totalRewardContract)?.toFixed(2));
    } catch (e) {
      console.log(e);
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      userAssetFunction();
    }
  }, [account, userAssetFunction]);

  const buyHandler = async () => {
    if (!account) {
      return showAlert("Error! Please connect your wallet.");
    }
    if (!amount || amount <= 0) {
      return showAlert("Error! Please enter amount to buy.");
    }
    try {
      const refAddress =
        copiedText && isAddress(copiedText)
          ? copiedText
          : "0x0000000000000000000000000000000000000000";

      setLoading(true);
      if (buyWith === "USDT") {
        const usdtDecimal = await usdtReadFunction("decimals");

        await usdtWriteFunction("approve", [
          presaleAddress,
          parseUnits(amount.toString(), +usdtDecimal?.toString()).toString(),
        ]);
        await presaleWriteFunction("buyTokenUSDT", [
          parseUnits(amount.toString(), +usdtDecimal?.toString()).toString(),
          refAddress,
        ]);
      } else {
        await presaleWriteFunction(
          "buyToken",
          [refAddress],
          parseUnits(amount.toString(), 18).toString()
        );
      }
      setAmount("");
      setCopiedText("");
      setRecivedTokens(0);
      initVoidSigner();
      userAssetFunction();
      setLoading(false);
      showAlert("Success! Transaction Confirmed", "success");
    } catch (error) {
      setLoading(false);
      showAlert(error?.shortMessage);
    }
  };

   
  const claimTokensHandler = async () => {
    if (account) {
      try {
        setLoading(true);
        await presaleWriteFunction("claimTokens");
        initVoidSigner();
        userAssetFunction();
        setLoading(false);
        showAlert("Success! Transaction Confirmed", "success");
      } catch (error) {
        setLoading(false);
        showAlert(error?.shortMessage);
      }
    } else {
      setAlertState({
        open: true,
        message: `Error! Please connect your wallet.`,
        severity: "error",
      });
    }
  };

  const claimRefHandler = async () => {
    if (account) {
      try {
        setLoading(true);
        await presaleWriteFunction("claimRefReward");
        initVoidSigner();
        userAssetFunction();
        setOpenReferralProgram(false);
        setLoading(false);
        showAlert("Success! Transaction Confirmed", "success");
      } catch (error) {
        setLoading(false);
        showAlert(error?.shortMessage);
      }
    } else {
      setAlertState({
        open: true,
        message: `Error! Please connect your wallet.`,
        severity: "error",
      });
    }
  };
  
  return ( 
  
    <>
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Loading loading={loading} />
      <Box
        sx={{
          backgroundColor: {xs:'#365acb', sm:"#365acb6f"},
          mr: "auto",
          borderRadius: "20px",
          px: mobileMatches ? 1.5 : 3,
          py: mobileMatches ? 2.5 : 4,
          opacity:{xs:1, sm :1}
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "ProductSansRegular",
              fontSize: { xs: "18px", sm: "24px" },
            }}
          >
            BUY BTCFANS TOKENS
          </Typography>
          
          <Box
            className="pulsate"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              backgroundColor: "#F8922A",
              px: 1.5,
              py: 0.2,
              position:"relative",
              zIndex:1,
              
            }}
          >
            
            <Box
              sx={{
                backgroundColor: preSaleEndedStatus ? "#ff0000" : "#22ee71",
                height: "5px",
                width: "5px",
                borderRadius: "50%",
                mr: 0.5,
              }}
            />

              <Box
                sx={{
                  color: "#fff",
                  fontFamily: "ProductSansRegular",
                  fontSize: "12px",
                }}
              >
                {preSaleEndedStatus ? "Completed" : "Live"}
              </Box>
            
          </Box>
        </Box>
        <Box mt={{ xs: 0.5, sm: 1 }}>
          <Stack
            sx={{
              height: { xs: "18px", sm: "20px" },
              background: "#fff",
              mt: 1.2,
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Stack
              height={"100%"}
              alignItems={"start"}
              justifyContent={"center"}
              position={"relative"}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${progressBarForAll}%`,
                  borderRadius: "20px",
                  background: "#F8922A",
                  zIndex: 0,
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#ffff",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  zIndex: 1,
                  pl: 1.2,
                  textAlign: "right",
                  width: `${progressBar - 6.5}%`,
                  fontFamily: "ProductSansRegular",
                }}
              >
                {  parseFloat(progressBarForAll)?.toFixed(0)*0.7465}%
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 1, sm: 2 },
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: "#fff",
                fontFamily: "ProductSansRegular",
              }}
            >
              ROUND 1 PRICE  
              <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}>
                  {!priceFetched? 
                  (<Skeleton animation="wave" height={10} width={50} />)
                    :
                  (<span className="spacer"> $
                  {+tokenPrice > 0
                    ? parseFloat(1 / +tokenPrice).toFixed(7)
                    : "0.00"}
                    </span>)
                  }
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: "#889de1",
              height: "5px",
              width: "5px",
              borderRadius: "50%",
              mx: 2,
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px" },
                color: "#fff",
                fontFamily: "ProductSansRegular",
              }}
            >
              LISTING PRICE  <span className="spacer"> $0.000030</span>
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 1, sm: 2 },
          }}
        >
          <Grid item xs={6} sm={6} pr={{ xs: 1 }}>
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
                  fontSize: { xs: "10px", sm: "12px" },
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Token Sold
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
                  src={Token}
                  alt=""
                  sx={{
                    width: { xs: "18px", sm: "22px" },
                  }}
                />
                {!fullGains?(
                  <Skeleton animation="wave" width={90} height ={30} />
                )
                :(<Typography
                  sx={{
                    fontFamily: "ProductSansRegular",
                    fontSize: { xs: "15px", sm: "18px" },
                    color: "#fff",
                    wordBreak: "break-all",
                  }}
                >
                  {totalSoldTokens}
                </Typography>)}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} pl={{ xs: 1 }}>
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
                    width: {xs:"18px",sm:"22px"},
                    marginLeft:"-1px"
                  }}
                />

                {!fullRaised ?
                  (
                    
                    <Skeleton animation="wave" width={100} height={30} />

                  )
                  :
                  (
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "15px", sm: "20px" },
                      color: "#fff",
                      wordBreak: "break-all",
                    }}
                  >
                    {amountRaisedForAll}
                  </Typography>
                  )
                }
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={{ xs: 1, sm: 2 }}>
          <Stack
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              my: 1,
            }}
          >
            <Box
              sx={{
                marginLeft:{xs:"12px", sm:"15px"},
                height: { xs: "1px", sm: "1.5px" },
                background: "#fff",
                flexGrow: 1,
              }}
            />

            <Typography
              variant="subtitle2"
              sx={{
                fontSize: { xs: "0.800rem", sm: "0.875rem" },
                textAlign: "center",
                fontWeight: "400",
                color: "#ffff",
                mx: 2,
                fontFamily: "ProductSansRegular",
                letterSpacing:1.2
              }}
            >
              {account ? "BUY NOW" : "CONNECT WALLET"}
            </Typography>

            <Box
              sx={{
                marginRight:{xs:"12px", sm:"15px"},                
                height: { xs: "1px", sm: "1.5px" },
                flexGrow: 1,
                background: "#fff",
              }}
            />
          </Stack>
        </Box>
        {account && (
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: { xs: 1, sm: 2 },
            }}
          >
            <Grid item xs={6} sm={6} pr={{ xs: 1 }}>
              <Box
                onClick={handleClickOpenPopup}
                sx={{
                  cursor:"pointer",
                  backgroundColor: "#889de1",
                  borderRadius: "10px",
                  p: { xs: 1, sm: 2 },
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
                  Your Holdings
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
                    src={Token}
                    alt=""
                    sx={{
                      width: { xs: "18px", sm: "22px" },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "15px", sm: "20px" },
                      color: "#fff",
                    }}
                  >
                    {toLocalFormat(userPurchasedTokens)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6} pl={{ xs: 1 }}>
              <Box
                onClick={handleClickOpen}

                sx={{
                  cursor:"pointer",
                  backgroundColor: "#889de1",
                  borderRadius: "10px",
                  p: { xs: 1, sm: 2 },
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
                  Rewards Earned
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
                      width: {xs:"18px", sm:"22px"},
                      marginLeft:"-2px"
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "ProductSansRegular",
                      fontSize: { xs: "15px", sm: "20px" },
                      color: "#fff",
                    }}
                  >{Math.trunc(userReward)}
                  
                    
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        {/* start of buy buttons */}

        <Box mt={{ xs: 1.5, sm: 2 }}>
          <Stack
            my={{ xs: 0.5, sm: 1 }}
            sx={{
              
              borderRadius: "12px",
              flexDirection: "row",
              background: "transparent",
              boxShadow: "#EA1D24",
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                gap: "12px",
              }}
            >
              {[
                {
                  text: "BNB",
                  img: Bnb,
                },
                {
                  text: "USDT",
                  img: Usdt,
                },
              ].map(({ text, img }) => (
                <Stack
                  onClick={() => setBuyWith(text)}
                  key={text}
                  sx={{
                    cursor: "pointer",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 1,
                    width: "50%",
                    py: { xs: 1, sm: 1.4 },
                    boxShadow: buyWith === text ? "#EA1D24" : "none",
                    fontFamily: "ProductSansRegular",
                    border: buyWith === text ? "2px solid #F8922A" : "2px solid #fff",
                    borderRadius: "60px",
                    background: buyWith === text ? "#fff" : "#fff",
                  }}
                >
                  <Box
                    component={"img"}
                    alt=""
                    src={img}
                    width={{ xs: "18px", sm: "22px" }}
                    ml={{sm:'14px', xs: "10px"}}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#000",
                      fontSize: { xs: "11px", sm: "12px" },
                      fontWeight: "600",
                      fontFamily: "ProductSansRegular",
                      letterSpacing:1.1,
                      marginLeft:"-3px"
                    }}
                  >
                    {`BUY WITH ${text}`}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>
        
        

         {/* second row  box */}
  
        <Box mt={{ xs: 1, sm: 2 }}>
          <Stack
            sx={{
              flexDirection: { xs: "row", sm: "row" },
              gap: { xs: 1, sm: 2 },
              my: { xs: 1, sm: 2 },
            }}
          >
            <Box sx={{ width: "100%"}}>
              <StyledInput
                type="text"
                placeholder="Enter Amount"
                color="#000"
                borderColor='#FFF'
                sx={{
                  marginRight:"12px"
                }}
                
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Box
                        component={"img"}
                        alt=""
                        src={buyWith === "BNB" ? Bnb : Usdt}
                        sx={{
                          width: { xs: "18px", sm: "22px" },
                          marginLeft: {xs: "-10px",  sm:"-8px"},
                          marginRight: { xs: "8px", sm: "10px" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
                value={amount}
                onChange={handleInputChange}
              />
            </Box>
            
            <Box 
            sx={{ 
              width: "100%",
              marginRight:"4px"
              }}>
              <StyledInput
                type="text"
                placeholder="or Enter Here"
                color="#000"
                borderColor='#FFF'
                value={amount > 0 ? recivedTokens : "0"}
                InputProps={{
                  
                  startAdornment: (
                    <InputAdornment position="end">
                      <Box
                        component={"img"}
                        alt=""
                        src={Token}
                        sx={{
                          width: { xs: "18px", sm: "22px" },
                          marginLeft: {xs:"-11px",sm:"-7px"},
                          marginRight: { xs: "8px", sm: "10px" },
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Stack>
        </Box>



{/* 
         Referral and claims */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            onClick={handleClickOpenPopup}
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              fontFamily: "ProductSansRegular",
              color: "#fff",
              cursor: "pointer",
              marginLeft:"15px"
            }}
          >
            Claim your BTCFANS
          </Typography>
          <Typography
            onClick={handleClickOpen}
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
              fontFamily: "ProductSansRegular",
              color: "#fff",
              cursor: "pointer",
              marginRight:"15px"
            }}
          >
            View Referral Program
          </Typography>
          
        </Box>
        
        <Box 
          mt={{ xs: 1, sm: 2 }}
          sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}
        >
          <Button
            sx={{
              fontFamily: "ProductSansRegular",
              color: "#fff",
              backgroundColor: "#F8922A",
              fontSize: { xs: "16px", sm: "18px" },
              width: "100%",
              textTransform: "uppercase",
              borderRadius: "50px",
              py: 1,
              
              "&:hover": {
                color: "#fff",
                backgroundColor: "#F8922A",
              },
            }}
            onClick={account ? () => buyHandler() : async () => await open()}
          >
            {account ? "Buy BTCFANS" : "Connect Wallet"}
          </Button>
          {showAff && (
            <Tooltip 
              title="Referral Code has been applied" 
              arrow
              sx= {{}}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  px: 1, 
                  borderRadius: '50px',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'right', 
                }}
                
              >
                <img
                  src={affliate} 
                  alt="App"
                />
              </IconButton>
          </Tooltip>
        )}
        </Box>
      </Box>
      <ReferralProgram
        open={openReferralProgram}
        setOpen={setOpenReferralProgram}
        copiedText={copiedText}
        setCopiedText={setCopiedText}
        userClaimableTokens={userClaimableRefTokens}
        userTotalReward={userReward}
        claimTokensFunction={claimRefHandler}
        setShowAff =  {setShowAff}
      />
      <ClaimTokens
        open={openClaimTokens}
        setOpen={setOpenClaimTokens}
        presaleStatus={preSaleEndedStatus}
        claimTokensFunction={claimTokensHandler}
      />
    </>
  );
}

export default PresaleBox;
