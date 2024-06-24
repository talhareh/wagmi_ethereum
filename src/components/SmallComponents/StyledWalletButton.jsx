/* eslint-disable react/prop-types */
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useContext } from "react";
import { AppContext } from "../../utils/utils";
import { Button,  Tooltip} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const ExampleButton = ({ width , fontSize, letterSpacing, paddingLeft,paddingRight}) => {
  const { account } = useContext(AppContext);
  const { open } = useWeb3Modal();

  return (
    <Button
      sx={{
        color: "#F8922A",
        //backgroundColor: account ? "#F8922A" : "#939392",
        textTransform: "capitalize",
        fontFamily: "ProductSansRegular",
        fontWeight: 600,
        letterSpacing: letterSpacing,
        borderRadius: "10px",
        width: width,
        paddingLeft:paddingLeft,
        paddingRight:paddingRight,
        py: 1.3,
        
        fontSize: fontSize,
        transition: "transform 0.4s ease-out",
        "&:hover": {
          opacity: 1,
          color: "#0A3FBA",
          //backgroundColor: "#0A3FBA",
          transform: "scale(1.05)",
        },
      }}
      
      onClick={async () => await open()}
    >
      {account
        ? <AccountCircleIcon 
        sx={{
          fontSize:{xs:"38px", sm:"48px"}, 
          color:'#F8922A',
          

          }} 
      />
        : <Tooltip 
        title="Connect Wallet" 
        arrow
        
      > 
          <AccountCircleIcon 
              sx={{
                fontSize:{xs:"38px"}, 
                color:'#939392',
                marginRight:{xs:"-20px"}
              }} 
            />
            </Tooltip>
      }
    </Button>
  );
};
