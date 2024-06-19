import { useContext, useState } from "react";
import {
  Container,
  useMediaQuery,
  List,
  ListItemText,
  Box,
  Drawer,
  ListItemButton,
  IconButton,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram"; // Correctly import TelegramIcon
import XIcon from '@mui/icons-material/X';
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { logo } from "./SmallComponents/Images"; // Ensure the logo is correctly imported
import { StyledText } from "./SmallComponents/AppComponents"; // Ensure these components are correctly imported
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
    icon: <TelegramIcon sx={{ fontSize: "18px", }} />,
    link: "https://t.me/bitcoinfansclubofficial",
  },

  
];

const socialArrayMobile = [
  
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
    link: "https://t.me/bitcoinfansclubofficial",
  },
];

export default function Header() {
  const { adminAddress, account } = useContext(AppContext);
  const [state, setState] = useState(false);
  const matches1 = useMediaQuery("(max-width:1279px)");
  const matches2 = useMediaQuery("(max-width:1050px)");
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <Box
      sx={{
        width: 250,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box display="flex" justifyContent="center" my={2}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box component="img" width="160px" src={logo} alt="Logo" />
        </Link>
      </Box>
      <List>
        {navArray.map(({ text, link }, index) => (
          <ListItemButton key={index + 3}>
            {text.toLowerCase() !== "whitepaper" ? (
              <HashLink
                smooth
                to={link}
                style={{ textDecoration: "none", margin: "auto" }}
              >
                <ListItemText
                  sx={{
                    textAlign: "left",
                    cursor: "pointer",
                    color: "#000",
                    ".MuiTypography-root": {
                      fontSize: "20px",
                      fontFamily: "ProductSansRegular",
                      "&:hover": {
                        color: "#15acff",
                        transition: "0.3s",
                      },
                    },
                  }}
                  primary={text}
                />
              </HashLink>
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemText
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#000",
                    ".MuiTypography-root": {
                      fontSize: "20px",
                      fontFamily: "ProductSansRegular",
                      "&:hover": {
                        color: "#15acff",
                        transition: "0.3s",
                      },
                    },
                  }}
                  primary={text}
                />
              </a>
            )}
          </ListItemButton>
        ))}
        {account?.toLowerCase() === adminAddress?.toLowerCase() && (
          <ListItemButton>
            <HashLink
              smooth
              to={"/admin"}
              style={{ textDecoration: "none", margin: "auto" }}
            >
              <ListItemText
                sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  color: "#000",
                  ".MuiTypography-root": {
                    fontSize: "20px",
                    fontFamily: "ProductSansRegular",
                    "&:hover": {
                      color: "#15acff",
                      transition: "0.3s",
                    },
                  },
                }}
                primary={"Admin"}
              />
            </HashLink>
          </ListItemButton>
        )}
      </List>
      <Box mt={1} display="flex" justifyContent="center">
        {/* <HashLink
          smooth
          to="/#buy"
          style={{ textDecoration: "none", margin: "auto" }}
        > */}
        {/* <Button
            sx={{
              color: "#fff",
              backgroundColor: "#F8922A",
              textTransform: "capitalize",
              fontFamily: "ProductSansRegular",
              fontWeight: 600,
              letterSpacing: "2px",
              borderRadius: "10px",
              px: 2,
              py: 1.5,
              fontSize: "16px",
              "&:hover": {
                opacity: 0.8,
                color: "#fff",
                backgroundColor: "#F8922A",
              },
            }}
          >
            Connect Wallet
          </Button> */}
        <ExampleButton width={"180px"} />
        {/* </HashLink> */}
      </Box>
    </Box>
  );

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
              py: { xs: 0, sm: 0.7},
              paddingRight:2,
              borderRadius: matches2 ? "25px" : "25px",
              boxShadow: "0 .125rem .25rem rgba(0, 0, 0, .075)",
              background: "#F7F7F7",
              
            }}
          >
            
            {/*box starts here */}
            
            <Box display="flex" alignItems="center" gap={6} 
              sx= {{
                  paddingTop:1.3,
                  paddingLeft:1.4
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <Box 
                  className="fade-down1"
                  component="img"
                  width={{ xs: "110px", sm: "120px" }}
                  src={logo}
                  alt="Logo"
                />
              </Link>

              {!matches2 && (
                <Stack flexDirection="row" alignItems="center" gap={8} className="fade-down2">
                  {navArray.map(({ text, link }, i) =>
                    text.toLowerCase() !== "whitepaper" ? (
                      <HashLink
                        smooth
                        key={i + 4}
                        to={link}
                        style={{ textDecoration: "none" }}
                      >
                        <StyledText >{text}</StyledText>
                      </HashLink>
                    ) : (
                      <a
                        key={i + 4}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <StyledText>{text}</StyledText>
                      </a>
                    )
                  )}
                  {account?.toLowerCase() === adminAddress?.toLowerCase() && (
                    <HashLink
                      smooth
                      to={"/admin"}
                      style={{ textDecoration: "none" }}
                    >
                      <StyledText>Admin</StyledText>
                    </HashLink>
                  )}
                </Stack>
              )}
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
                  <Box sx = {{marginRight:5}}>
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
                          backgroundColor:'transparent',
                          boxShadow:'none',
                          color: '#F8922A',
                        }
                      }}
                    >
                      {icon}
                    </IconButton>
                  ))}
                  </Box>
                  <ExampleButton width={"190px"} />
                </Stack>
              ) : (
                <>
                  <Stack flexDirection="row" gap={1} alignItems="center">
                    <Box>
                    {socialArrayMobile.map(({ icon, link }, i) => (
                      <IconButton
                        key={i + 5}
                        href={link}
                        target="_blank"
                        sx={{
                          borderRadius: "50%",
                          color: "#000",
                          
                          fontSize: "1px",
                          marginRight:1,
                          "&:hover": {
                            backgroundColor:'transparent',
                            boxShadow:'none',
                            color: '#F8922A',
                          },
                        }}
                      >
                        {icon}
                      </IconButton>
                    ))}
                    </Box>
                    <IconButton onClick={toggleDrawer(true)}>
                      <MenuIcon
                        style={{
                          fontSize: "30px",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      />
                    </IconButton>
                  </Stack>

                  <Drawer
                    anchor="left"
                    open={state}
                    onClose={toggleDrawer(false)}
                    sx={{
                      display: { xs: matches2 ? "flex" : "none" },
                      ".MuiDrawer-paper": {
                        backgroundColor: "#fafbe8",
                        borderRight: "1px solid #000",
                      },
                    }}
                  >
                    {list()}
                  </Drawer>
                </>
              )}
            </Box>
          </Box>
        
        </Container>
        
      </Box>
      
    </>
  );
}
