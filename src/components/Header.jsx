/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars*/
import  { useContext, useState } from "react";
import {
  Container,
  useMediaQuery,
  
  ListItemText,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram"; 
import XIcon from '@mui/icons-material/X';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { logo } from "./SmallComponents/Images"; 
import { StyledText } from "./SmallComponents/AppComponents"; 
import { ExampleButton } from "./SmallComponents/StyledWalletButton";
import { AppContext } from "../utils/utils";
import './Header.css'


const navArray = [
  {
    text: "Home",
    link: "https://bitcoinfansclub.com/",
  },
  {
    text: "Blog",
    link: "https://bitcoinfansclub.com/blogs",
  },
];

const socialArray = [
  {
    icon: <XIcon sx={{ fontSize: "18px" }} />,
    link: "https://x.com/bitcoinfansclub",
  },
  {
    icon: <InstagramIcon sx={{ fontSize: "18px" }} />,
    link: "https://www.instagram.com/bitcoinfansclub",
  },
  {
    icon: <TelegramIcon sx={{ fontSize: "18px" }} />,
    link: "https://t.me/bitcoinfansclub",
  },
];

export default function Header() {
  const { adminAddress, account } = useContext(AppContext);
  const matches1 = useMediaQuery("(max-width:1279px)");
  const matches2 = useMediaQuery("(max-width:1050px)");

  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Box
        component="section"
        maxWidth={"100%"}
        py={0.5}
        sx={{
          margin: { xs: "5px 0 0 0", sm: "0px 60px 0px 55px", md: "0px 60px 0px 55px", lg: "0px 60px 0px 55px" },
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 1, md: 3 } }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              px: 0,
              py: { xs: 0, sm: 0.7 },
              paddingRight: 2,
              borderRadius: matches2 ? "25px" : "25px",
              boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075)",
              background: "#F7F7F7",
            }}
          >
            <Box display="flex" alignItems="center" gap={6} 
              sx={{
                  paddingTop:1.3,
                  paddingLeft:1.4
              }}
            >
              <Link to="https://bitcoinfansclub.com/" style={{ textDecoration: "none" }}>
                <Box
                  className="fade-down1"
                  component="img"
                  width={{ xs: "130px", sm: "150px" }}
                  sx={{
                    marginTop:"-5px"
                  }}
                  src={logo}
                  alt="Logo"
                />
              </Link>
            </Box>
            <Box
              display="flex"
              justifyContent={matches1 ? "end" : ""}
              alignItems="center"
              className="fade-down3"
            >
              {!matches2 ? (
                <Stack
                  flexDirection="row"
                  gap={1}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ marginRight: 5 }}>
                    {socialArray.map(({ icon, link }, index) => (
                      <IconButton
                        key={index + 2}
                        href={link}
                        target="_blank"
                        sx={{
                          borderRadius: "50%",
                          color: '#000',
                          fontSize: "16px",
                          px: 3,
                          width: "30px",
                          height: "30px",
                          '&:hover': {
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            color: '#F8922A',
                          }
                        }}
                      >
                        {icon}
                      </IconButton>
                    ))}
                  </Box>
                  <ExampleButton paddingRight/>
                </Stack>
              ) : (
                <>
                  <Stack flexDirection="row" gap={1} alignItems="center" >
                    <Box>
                      {socialArray.map(({ icon, link }, i) => (
                        <IconButton
                          key={i + 5}
                          href={link}
                          target="_blank"
                          sx={{
                            borderRadius: "50%",
                            color: "#000",
                            fontSize: "1px",
                            marginRight: 1,
                            "&:hover": {
                              backgroundColor: 'transparent',
                              boxShadow: 'none',
                              color: '#F8922A',
                            },
                          }}
                        >
                          {icon}
                        </IconButton>
                      ))}
                    </Box>
                    
                    <ExampleButton 
                        width={"10px"}
                        
                    />
                    
                  </Stack>
                </>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
