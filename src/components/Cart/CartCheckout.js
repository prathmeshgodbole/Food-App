import { useRef, useState } from "react";
import classes from "./CartCheckout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const CartCheckout = (props) => {
  const [formInputsValid, setFormInputsValid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
name:enteredName,
street:enteredStreet,
postal:enteredPostal,
city:enteredCity,

    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValid.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValid.street ? "" : classes.invalid
  }`;

  const postalControlClasses = `${classes.control} ${
    formInputsValid.postal ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValid.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
    
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValid.name && <p>Please Enter Your Name</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValid.street && <p >Please Enter Your Street</p>}
      </div>

      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValid.postal && <p >Please Enter 5 digit Postal Code</p>}
      </div>


      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValid.city && <p >Please Enter Your City</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default CartCheckout;
