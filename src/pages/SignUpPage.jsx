import Header from "../components/Header";
import * as yup from "yup";
import KerrorMessage from "../components/KerrorMessage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, doc, setDoc } from "../firebase/firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
import createDoc from "../functions/createDoc";


// eslint-disable-next-line react/prop-types
function SignUpPage({ setLoginToggle, loginToggle }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = yup.object({
    name: yup.string().required("Name is required!"),
    email: yup
      .string()
      .email("Invalid email")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Invalid email")
      .required(),
    // eslint-disable-next-line no-useless-escape
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required(),
    CONFpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  // createdoc function
  //  async function createDoc(user) {
  //   if (!user) return;

  //   const userRef = doc(db, "users", user.uid);
  //   const userData = await getDoc(userRef);

  //   if (!userData.exists()) {
  //     try {
  //       await setDoc(doc(db, "users", user.uid), {
  //         name: user.displayName ? user.displayName : name,
  //         photoURL: user.photoURL ? user.photoURL : "",
  //         createdAt: new Date(),
  //         email: user.email,
  //       });
  //       toast.success("doc created successfully");
  //     } catch (error) {
  //       toast.error(error.message);
  //     }
  //   } else {
  //     toast.error("user already exists");
  //   }
  // }

  
  return (
    <section>
      <Header />
      <main className="gap-2 bg-gray-200  shadow-2xl max-w-[400px] m-auto border mt-10 flex flex-col justify-center rounded-xl ">
        {" "}
        <h1 className=" text-center text-3xl bg-blue-500 p-2">
          SingUp and LogIn
        </h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: "",
            email: "",
            password: "",
            CONFpassword: "",
          }}
          onSubmit={(values) => {
            // *******************  [sign up with email or auth with email with fire base]  ****************************************

            setLoading(true);
            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                // Signed up
                const user = userCredential.user;

                console.log("created user>>>>>", user);
                toast.success("account created successfully");
                values.name = "";
                values.email = "";
                values.password = "";
                values.CONFpassword = "";
                setLoading(false);
                // createDoc(user);
                  createDoc(user);
                navigate("/dashboard");

                // ...
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorCode);
                toast.error(errorMessage);
                setLoading(false);
                // ..
              });
          }}
        >
          <Form className="p-2 flex flex-col gap-1">
            {/* name */}
            <h1>Name</h1>
            <Field type="text" name="name" className=" w-full h-8" />
            <ErrorMessage name="name" component={KerrorMessage} />

            {/* email */}
            <h1>Email</h1>
            <Field type="email" name="email" className=" w-full" />
            <ErrorMessage name="email" component={KerrorMessage} />
            {/* password */}
            <h1>password</h1>
            <Field type="password" name="password" className="h-8" />
            <ErrorMessage name="password" component={KerrorMessage} />

            {/* conform password */}
            <h1>confirm password</h1>
            <Field type="password" name="CONFpassword" className="h-8" />
            <ErrorMessage name="CONFpassword" component={KerrorMessage} />

            {/* sign up with email */}
            <button
              disabled={loading}
              type="submit"
              className=" bg-blue-700 h-8 hover:bg-blue-800"
            >
              {loading ? "loading..." : "Signup with Email and Password"}
            </button>

            

        
            {/* link to log in page */}
            <h1 className="text-center">
              already having account plase{" "}
              <span
                onClick={() => setLoginToggle(!loginToggle)}
                className=" text-blue-700 hover:bg-blue-600 hover:text-black cursor-pointer "
              >
                login
              </span>{" "}
            </h1>
          </Form>
        </Formik>
        
      </main>
       
    </section>
  );
}

export default SignUpPage;
