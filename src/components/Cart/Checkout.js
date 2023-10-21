import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

// Validation
const isEmpty = value => value.trim() === '';
const isSevenChars = value => value.trim().length === 7;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        postCode: true,
        pref: true,
        address: true
    });

  // useRefでform inputと接続する
  const nameInputRef = useRef();
  const postCodeInputRef = useRef();
  const prefInputRef = useRef();
  const addressInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPostCode = postCodeInputRef.current.value;
    const enteredPref = prefInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;

    const enteredNameValid = !isEmpty(enteredName);
    const enteredPostCodeValid = isSevenChars(enteredPostCode);
    const enteredPrefValid = !isEmpty(enteredPref);
    const enteredAddressValid = !isEmpty(enteredAddress);

    setFormInputsValidity({
        name: enteredNameValid,
        postCode: enteredPostCodeValid,
        pref: enteredPrefValid,
        address: enteredAddressValid
    })

    const formIsValid = 
    enteredNameValid && 
    enteredPostCodeValid && 
    enteredPrefValid && 
    enteredAddressValid;

    if (!formIsValid) {
        return;
    }

    // データ送信処理
    props.onConfirm({
        name: enteredName,
        postCode: enteredPostCode,
        pref: enteredPref,
        address: enteredAddress
    })
  };

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
  const postCodeControlClasses = `${classes.control} ${formInputsValidity.postCode ? '' : classes.invalid}`
  const prefControlClasses = `${classes.control} ${formInputsValidity.pref ? '' : classes.invalid}`
  const addressControlClasses = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">氏名</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>氏名を入力してください</p>}
      </div>
      <div className={postCodeControlClasses}>
        <label htmlFor="postCode">郵便番号</label>
        <input type="text" id="postCode" ref={postCodeInputRef} />
        {!formInputsValidity.postCode && <p>郵便番号は7桁の数字を入力してください</p>}
      </div>
      <div className={prefControlClasses}>
        <label htmlFor="prefectures">都道府県</label>
        <input type="text" id="prefectures" ref={prefInputRef} />
        {!formInputsValidity.pref && <p>都道府県を入力してください</p>}
      </div>
      <div className={addressControlClasses}>
        <label htmlFor="address">住所</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formInputsValidity.address && <p>住所を入力してください</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          閉じる
        </button>
        <button className={classes.submit}>確認</button>
      </div>
    </form>
  );
};

export default Checkout;
