import { ErrorMessage, Field, Form, Formik } from "formik";
import Header from "../components/Header";
import KerrorMessage from "../components/KerrorMessage";
import * as yup from "yup";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import createDoc from "../functions/createDoc";

// eslint-disable-next-line react/prop-types
function LogInPage({ loginToggle, setLoginToggle }) {
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Invalid email")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
      .required(),
    password: yup.string().required("Password is required!"),
  });
  return (
    <>
      <Header />
      <div>
        <main className="m-auto mt-11 border border-black max-w-[300px] shadow-lg rounded">
          <h1 className="bg-blue-600 text-xl text-center p-1">Log In</h1>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values) => {
              setLoading(true);
              signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user);
                  toast.success("Successfully Logged In");
                  values.email=""
                  values.password=""
                  setLoading(false);
                  
                  navigate("/dashboard")
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  toast.error(errorMessage);
                  toast.error(errorCode);
                  setLoading(false);
                });
            }}
          >
            <Form className="flex flex-col p-2 gap-2 bg-gray-100">
              {/* email */}
              <h1>Email</h1>
              <Field type="email" name="email" palceholder="email" />
              <ErrorMessage name="email" component={KerrorMessage} />

              {/* password */}
              <h1>password</h1>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component={KerrorMessage} />
              {/* submit */}
              {/* sign up with email */}
              <button
                disabled={loading}
                type="submit"
                className=" bg-blue-700 h-8 hover:bg-blue-800"
              >
                {loading ? "loading..." : "Log In with Email"}
              </button>

              <h1
                onClick={() => setLoginToggle(!loginToggle)}
                className=" cursor-pointer text-blue-500"
              >
                New to Financely? Create an account
              </h1>
            </Form>
          </Formik>
        </main>
      </div>
    </>
  );
}

export default LogInPage;
