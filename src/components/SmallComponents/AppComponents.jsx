/* eslint-disable react/prop-types */
import { Alert, Box, Snackbar, TextField } from "@mui/material";
import { Button } from "@mui/material";

export function ToastNotify({ alertState, setAlertState }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertState.open}
      autoHideDuration={10000}
      key={"top center"}
      onClose={() => setAlertState({ ...alertState, open: false })}
      className="snackbar-zindex"
    >
      <Alert
        onClose={() => setAlertState({ ...alertState, open: false })}
        severity={alertState.severity}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
}

export function StyledButton({ children, ...props }) {
  return (
    <>
      <Button
        {...props}
        sx={{
          color: "#000",
          border: "1px solid #000",
          background: "#fff",
          fontSize: "14px",
          boxShadow: "3px 3px #ff970a",
          fontFamily: "ProductSansRegular",
          borderRadius: "8px",
          height: "50px",
          width: props.width,
          "&.Mui-disabled": {
            color: "#979EA7",
          },
          "&:hover": {
            background: "#fff",
            boxShadow: "none",
            transition: "0.3s",
          },
        }}
      >
        {children}
      </Button>
    </>
  );
}

export function StyledText({ children, ...props }) {
  return (
    <>
      <Box
        {...props}
        sx={{
          color: "#000000",
          fontSize: "16px",
          fontFamily: "ProductSansRegular",
          fontWeight: "600",
          letterSpacing:1,
          mr: props.mr,
          "&:hover": {
            cursor: "pointer",
            color: "#F8922A",
            transition: "0.3s",
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}
export function StyledTitle({ children, ...props }) {
  return (
    <>
      <Box
        {...props}
        sx={{
          color: "#000000",
          fontSize: "40px",
          //   fontFamily: "Josefin Sans",
          fontWeight: "700",
          mr: props.mr,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export const StyledInput = ({ color, borderColor, ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        background: "#fff",
        borderRadius: "60px",
        border: `2px solid ${borderColor}`,
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "10px",
          pr: 0.6,
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },

        input: {
          "&::placeholder": {
            color: "#66656D !important",
            opacity: 1,
          },
          color: `${color}`,
          paddingTop: { xs: "10px", sm: "16px" },
          paddingBottom: { xs: "10px", sm: "16px" },

          fontSize: { xs: "11px", sm: "15px" },
          fontWeight: "600",
          fontFamily: "ProductSansRegular",
          lineHeight: { xs: "28px", sm: "32px" },
        },
      }}
    />
  );
};

export const StyledInputTwo = ({ inputcolor, bgColor, ...props }) => {
  return (
    <TextField
      {...props}
      sx={{
        background: bgColor,
        borderRadius: "50px",
        border: "1px solid #023FBA",
        width: "100%",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "none",
          },
        },

        input: {
          "&::placeholder": {
            color: "rgba(0,0,0,0.5) !important",
            opacity: 1,
          },
          padding: {
            xs: "10px 12px",
            sm: "10px 12px",
          },
          color: inputcolor,
          fontSize: "12px",
          fontWeight: "400",
          fontFamily: "ProductSansRegular",
        },
      }}
    />
  );
};

export const toLocalFormat = (val) => {
  return val?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
