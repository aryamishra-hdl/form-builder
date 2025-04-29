import React, { useRef } from "react";
import useElementsSelectors from "../utils/useElementsSelectors";

const LoginPage = () => {
  const [emailRef, getEmailSelectors] = useElementsSelectors();
  const [passwordRef, getPasswordSelectors] = useElementsSelectors();
  const [buttonRef, getButtonSelectors] = useElementsSelectors();
  const [selectRef, getSelectSelectors] = useElementsSelectors();
  const handleSubmit = (e) => {
    e.preventDefault();
    const res = {
      login_url: window.location.href,
      login_username: getEmailSelectors(),
      login_password: getPasswordSelectors(),
      login_button: getButtonSelectors(),
      login_select: getSelectSelectors(),
    };

    // const loginRes = {
    //   login_url: window.location.href,
    //   mail: res.login_username.value,
    //   password: res.login_password.value,
    //   login_username: {
    //     xpath: res.login_username.xpath,
    //     css_selector: res.login_username.css_selector,
    //   },
    //   login_password: {
    //     xpath: res.login_password.xpath,
    //     css_selector: res.login_password.css_selector,
    //   },
    //   login_submit: {
    //     xpath: res.login_button.xpath,
    //     css_selector: res.login_button.css_selector,
    //   },
    // };
    console.log(res);
  };
  return (
    <div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex gap-2">
          <label htmlFor="">Email</label>
          <input ref={emailRef} className="border-2" type="text" name="email" />
        </div>
        <div className="flex gap-2">
          <label htmlFor="">Password</label>
          <input ref={passwordRef} type="text" className="border-2" name="password" id="" />
        </div>
        <select ref={selectRef} name="abc" id="">
          <option value="a">a</option>
          <option value="b">b</option>
          <option value="c">c</option>
        </select>
        <input type="date" />
        <button ref={buttonRef} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
