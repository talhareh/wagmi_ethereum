/* eslint-disable react/prop-types */
import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Slide,
  Typography,
  Button,
} from "@mui/material";
import { useSwitchNetwork } from "wagmi";
import { errorPng } from "../components/SmallComponents/Images";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
    boxShadow: "none",
    //   border: "5px solid black",
    borderRadius: "10px",
  },
  "& .dialoge__content__section": {
    background: "#fff!important",
    borderRadius: "10px",
    border: "1px solid transparent",
  },
  "& .MuiDialogContent-root": {
    paddingTop: "20px",
    paddingBottom: "20px",
  },
};

export default function NetworkSwitch({ open, setOpen }) {
  const { switchNetwork } = useSwitchNetwork();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={modalStyle}
      open={open}
      keepMounted
      TransitionComponent={Transition}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="dialoge__content__section">
        <Box
          borderRadius="100px"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width={{ xs: "35%", sm: "25%" }}
          >
            <Box component={"img"} width="100%" src={errorPng} alt="" />
          </Box>
          <Typography
            mt={2}
            sx={{
              fontSize: { xs: "20px", sm: "26px" },
              fontWeight: "600",
              textAlign: "center",
              fontFamily: "ProductSansRegular",
              color: "#F8922A",
            }}
          >
            Switch to BSC Mainnet Network
          </Typography>
          <Typography
            mt={2}
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "center",
              color: "#000",
              fontFamily: "ProductSansRegular",
            }}
          >
            You are currently connected to the wrong network. Kindly switch to
            the appropriate network.
          </Typography>
          <Box mt={2}>
            <Button
              sx={{
                color: "#fff",
                backgroundColor: "#F8922A",
                textTransform: "capitalize",
                fontFamily: "ProductSansRegular",
                fontWeight: 600,
                letterSpacing: "2px",
                borderRadius: "10px",
                width: "230px",
                px: 2,
                py: 1.5,
                fontSize: "16px",
                "&:hover": {
                  opacity: 0.8,
                  color: "#fff",
                  backgroundColor: "#F8922A",
                },
              }}
              onClick={() => {
                switchNetwork?.(56);
                setOpen(false);
              }}
            >
              Switch Network
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
