import {
  AppBar,
  Typography,
  Container,
  Toolbar,
  IconButton,
  Box,
  Link,
} from "@mui/material";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Header = () => {
  return (
   
      <AppBar position="sticky" sx={{width: 1200}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AppRegistrationIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          <Link href="./login">
            <Typography
              variant="h6"
              component="body2"
              color="error"
              sx={{ flexGrow: 1 }}
            >
             <LockOutlinedIcon />
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    
  );
};

export default Header;
