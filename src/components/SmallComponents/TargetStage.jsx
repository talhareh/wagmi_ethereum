/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    Stack,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import { StyledInputTwo } from "./AppComponents";
  
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
      width: "850px",
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
  
  export default function TargetStage({
    open,
    setOpen,
    target,
    setTarget,
    targetHandler,
  }) {
    const handleClose = () => {
      setOpen(false);
      
    };
  
    return (
      <Dialog
        sx={modalStyle}
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth={"xs"}
        id="claim-tokens"
      >
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
               Target
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
              Set Target for presale stage 
            </Typography>
          </Box>
  
          <Stack width="100%" mt={2}>
            <StyledInputTwo
              type="text"
              bgColor={"#fff"}
              placeholder=""
              value={target}
              inputcolor="#000"
              onChange={(e) => setTarget(e.target.value)}
              // InputProps={{
              //   endAdornment: (
              //     <InputAdornment position="end" sx={{ padding: 0 }}>
              //       <Box
              //         sx={{
              //           fontFamily: "ProductSansRegular",
              //           backgroundColor: "#F8922A",
              //           py: 0.75,
              //           px: 3,
              //           borderRadius: "50px",
              //           color: "#fff",
              //           cursor: "pointer",
              //         }}
              //       >
              //         Submit
              //       </Box>
              //     </InputAdornment>
              //   ),
              // }}
            />
          </Stack>
          <Stack mt={2} alignItems={"center"}>
            <Button
              onClick={targetHandler}
              sx={{
                textTransform: "capitalize",
                py: 1,
                width: "150px",
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
              }}
            >
              {" "}
              Submit
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
  