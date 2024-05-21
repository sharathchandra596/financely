import { useAuthState } from "react-firebase-hooks/auth";
import CurrentBalance from "../components/CurrentBalance";
import Header from "../components/Header";
import TotalExpenses from "../components/TotalExpenses";
import TotalIncome from "../components/TotalIncome";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import TransactionTable from "../components/TransactionsTable/TransactionTable";
import Charts from "../components/Charts";


function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [totalbalnce, setTotalbalnce] = useState(0);
  const onFinish = (values, type) => {
    // console.log(values, ">>>", type);

    const newTransaction = {
      name: values.name,
      amount: values.amount,
      date: values.date,
      // date:moment(values.date).format(),  if needed we need to chnage
      tag: values.tag,
      type: type,
    };
    console.log(newTransaction, ">>>> new tranction");

    addTransaction(newTransaction);
  };
  // **********    addTransaction to the firestore for user loged in *********
  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);

      toast.success("Transaction Added!");
      let newArr=transactions
      newArr.push(transaction)
      setTransactions(newArr)
      calculateBalance()
      
    } catch (e) {
      console.error("Error adding document: ", e);

      toast.error("Couldn't add transaction");
    }
  }

  // ********** feching all trnsaction  from collection  *********
  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  //************ */ calculating all the income and expenses and kepp in cards **********


  useEffect(()=>{
    calculateBalance()
  
  },[transactions])
  function calculateBalance() 
  {
    let totalIncome=0
    let totalExpenses=0

    transactions.map((transaction)=>{
      if(transaction.type==="income")
        {
          totalIncome+=transaction.amount
        }
      else
        {
          totalExpenses+=transaction.amount
        }
    })

    setIncome(totalIncome)
    setExpenses(totalExpenses)
    setTotalbalnce(totalIncome-totalExpenses)

  }
 

  return (
    <div>
      <Header />
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-wrap ">
            <CurrentBalance totalbalnce={totalbalnce}  />
            <TotalIncome onFinish={onFinish} income={income} />
            <TotalExpenses onFinish={onFinish} expenses={expenses} />
          </div>
        )}
      </>
      {transactions.length !=0 ?<>
        <Charts transactions={transactions} />
      <TransactionTable transactions={transactions}/>
      </>: 
      <div className="flex flex-col justify-center items-center">
      <img className=" h-[50vh]  w-80" src="public\Credit card-rafiki.png" alt="img"/>
      <p className="text-2xl text-blue-600">No Transactions available</p>
      </div>

      }
    </div>
  );
}

export default Dashboard;
