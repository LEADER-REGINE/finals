// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.black, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.black, 0.25),
//   },
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(1),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       width: '12ch',
//       '&:focus': {
//         width: '20ch',
//       },
//     },
//   },
// }));

// export default function SearchAppBar() {

//     const style = {
//         toolCon : {
//             display : "flex",
//             flexDirection : "row",
//             justifyContent : "space-between"
//         },
//         menuCon: {
//             display : "flex",
//             flexDirection : "row",
//         },
//         menu : {
//             marginRight : "100px"
//         },
//         appbarColor : {
//             backgroundColor : "white",
//             color : "#FA3A3A",
//         }
//     }
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx = {style.appbarColor}>
//         <Toolbar sx = {style.toolCon}>
//         <Box sx = {style.menuCon}>
//           <Typography

//             component="div"
//             sx={style.menu}
//           >
//             Home
//           </Typography>
//           <Typography

//             component="div"
//             sx={style.menu}
//           >
//             Resto List
//           </Typography>
//           <Typography

//             component="div"
//             sx={style.menu}
//           >
//             Contact Us
//           </Typography>
//          </Box>
//          <Box>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//           </Box>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }





import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useHistory, NavLink } from 'react-router-dom';

import firebase from "../config/firebase";

const links = [
  {
    to: "/",
    name: "Home",
  },
  {
    to: "/list",
    name: "Resto List",
  },
  {
    to: "/contactus",
    name: "Contact Us",
  },
];

const pages = ['Home', 'Resto List', 'Contact Us'];
const settings = [ 'Logout'];

const ResponsiveAppBar = () => {
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setisLoggedIn] = React.useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    if (link) {
      history.push(link);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setisLoggedIn(true);
      // ...
    } else {
      setisLoggedIn(false);
    }
  });

  const login = (e) => {
    handleCloseUserMenu();
    history.push("/login");
  }

  const logout = (e) => {
    handleCloseUserMenu();
    firebase.auth().signOut().then(() => {
      history.push('/');
    }).catch((error) => {
      // An error happened.
    });
  } 

  return (
    <AppBar position="static" sx={{ background: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((page) => (
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.to)}>
                  <Typography textAlign="center" >{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((page) => (
              <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.to)}>
                <Typography textAlign="center" >{page.name}</Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn ? (
                settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>logout()}>{setting}</Typography>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={() => login()}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )

              }
              { }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;