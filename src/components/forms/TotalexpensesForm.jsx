import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import KerrorMessage from "../KerrorMessage";

// eslint-disable-next-line react/prop-types
function TotalIncomeForm({closeModal,onFinish}) {
    const validationSchema = yup.object({
        name: yup.string().required("Name is required!"),
        amount: yup.number().required("Amount is required!"),
        date: yup.date().required("Date is required!"),
        tag: yup.string().required("Tag is required!"),
    })
  return (
    <div>

      <Formik
        validationSchema={validationSchema}
        onSubmit={(values) => 
            {
              onFinish(values,"expenses")
              closeModal();
              values.name=''
              values.amount=0
              values.date=''
              values.tag=''
            }
        }
        initialValues={{
          name: "",
          amount: 0,
          date: "",
          tag: ""
        }}
      >
        <Form>
          <div className="flex flex-col m-3">
            <h1 className="text-xl text-blue-600 ">Name</h1>
            <Field type="text" name="name"  className="border border-black w-[300px]"/>
            <ErrorMessage name="name" component={KerrorMessage} />
          </div>

          <div className="flex flex-col m-3">
            <h1 className="text-xl text-blue-600 ">Amount</h1>
            <Field type="number" name="amount"  className="border border-black w-[300px]" />
            <ErrorMessage name="amount" component={KerrorMessage} />
          </div>

          <div className="flex flex-col m-3">
            <h1 className="text-xl text-blue-600 ">Date</h1>
            <Field type="date" name="date"  className="border border-black w-[300px]"/>
            <ErrorMessage name="date" component={KerrorMessage} />
          </div>

          <div className="flex flex-col m-3">
            <h1 className="text-xl text-blue-600 ">tag</h1>
            <Field type="text" name="tag"  className="border border-black w-[300px]"/>
            <ErrorMessage name="tag" component={KerrorMessage} />
          </div>
        <div className="text-center  p-2 text-black text-md">
            <button type="submit" className="bg-blue-600 w-full" >Add expenses</button>
        </div>

        </Form>
      </Formik>
    </div>
  );
}

export default TotalIncomeForm;
