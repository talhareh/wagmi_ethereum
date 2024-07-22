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
  
  export default function calcAmount({
    open,
    setOpen,
    calcUsd,
    updateAll,
  }) {
    const handleClose = () => {
      setOpen(false);
      
    };
    let price = 0.0000246
    let target = 400000
    let calcTok = (calcUsd / price).toFixed(3)
    let prog = (calcUsd / target)* 100
    
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
               Following will be updated
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
              USD Raised : {calcUsd}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography
              sx={{
                fontFamily: "ProductSansRegular",
                fontSize: "14px",
              }}
            >
              Tokens Sold : { calcTok}
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography
              sx={{
                fontFamily: "ProductSansRegular",
                fontSize: "14px",
              }}
            >
              Progress Bar : {prog}
            </Typography>
          </Box>
  
          
          <Stack mt={2} alignItems={"center"}>
            <Button
              onClick={updateAll}
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
              Update Stat
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }
  