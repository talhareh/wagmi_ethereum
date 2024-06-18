/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppContext } from "../../utils/utils";

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

export default function ClaimTokens({
  open,
  setOpen,
  presaleStatus,
  claimTokensFunction,
}) {
  const { account } = useContext(AppContext);
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
            Claim Your Tokens
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
            Participants can claim their allocated $BTCFANS tokens at the end of
            the presale. We appreciate your patience and look forward to your
            successful participation
          </Typography>
        </Box>
        <Box mt={2}>
          <Button
            onClick={claimTokensFunction}
            disabled={account && presaleStatus ? false : true}
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
      </DialogContent>
    </Dialog>
  );
}
