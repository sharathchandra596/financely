
import { useState } from "react";
import LogInPage from "./LogInPage";
import SignUpPage from "./SignUpPage";

function SignUpSignIn() {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <>
      {loginToggle ? (
        <LogInPage loginToggle={loginToggle} setLoginToggle={setLoginToggle} />
      ) : (
        <SignUpPage loginToggle={loginToggle} setLoginToggle={setLoginToggle}/>
      )}
    </>
  );
}

export default SignUpSignIn;
