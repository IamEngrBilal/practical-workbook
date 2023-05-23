import { AppBar, Typography, Container } from "@mui/material";
import classes from "./app.module.css";
import FormatListBulletedSharpIcon from "@mui/icons-material/FormatListBulletedSharp";

const NavBar = () => {
    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Typography variant="h3" component="h3">
          <FormatListBulletedSharpIcon sx={{ m: 1 }} fontSize="large" />
          TODO APPLICATION
        </Typography>
      </AppBar>
    );
}

export default NavBar;