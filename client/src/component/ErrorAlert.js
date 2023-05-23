import classes from "./app.module.css";

const ErrorAlert = ({ msg }) => {
  return <div className={classes.alert}>{msg}</div>;
};

export default ErrorAlert;
