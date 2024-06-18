/* eslint-disable react/prop-types */
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useContext } from "react";
import { AppContext } from "../../utils/utils";
import { Button } from "@mui/material";

export const ExampleButton = ({ width }) => {
  const { account } = useContext(AppContext);
  const { open } = useWeb3Modal();

  return (
    <Button
      sx={{
        color: "#fff",
        backgroundColor: "#F8922A",
        textTransform: "capitalize",
        fontFamily: "ProductSansRegular",
        fontWeight: 600,
        letterSpacing: "2px",
        borderRadius: "10px",
        width: width,
         
        py: 1.3,
        fontSize: "16px",
        transition: "transform 0.4s ease-out",
        "&:hover": {
          opacity: 0.8,
          color: "#fff",
          backgroundColor: "#0A3FBA",
          transform: "scale(1.1)",
        },
      }}
      onClick={async () => await open()}
    >
      {account
        ? account.slice(0, 4) + "..." + account.slice(-4)
        : "Connect Wallet"}
    </Button>
  );
};
