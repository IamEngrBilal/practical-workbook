import classes from "./app.module.css";

const SuccessAlert = ({ msg }) => {
  return (
    <div className={classes.alertSuccess}>
      {msg}
    </div>
  );
};

export default SuccessAlert;
