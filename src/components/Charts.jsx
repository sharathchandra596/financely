import { Pie } from "@ant-design/charts";

// eslint-disable-next-line react/prop-types
function Charts({ transactions }) {
  // eslint-disable-next-line react/prop-types
  const data = transactions.filter((transaction) => {
    if (transaction.type == "income") {
      return {
        name: transaction.name,
        amount: transaction.amount,
      };
    }
  });
  // const data = transactions.map((transaction)=>{
  //     return {date:transaction.date, amount:transaction.amount}
  // })

  // eslint-disable-next-line react/prop-types
  const spendingData = transactions.filter((transaction) => {
    if (transaction.type == "expenses") {
      return {
        tag: transaction.tag,
        amount: transaction.amount,
      };
    }
  });

  //   const config = {
  //     data: data,
  //     xField: 'date',
  //     yField: 'amount',
  //   };
  const config = {
    data: data,
    angleField: "amount",
    colorField: "name",
  };
  const spendingconfig = {
    data: spendingData,
    angleField: "amount",
    colorField: "tag",
  };
  return (
    <main className="flex">
        <div className="w-1/2 text-center">
            <h1 className="text-2xl">Total Income</h1>
            <Pie {...config} />
        </div>
        <div  className="w-1/2 text-center">
            <h1 className="text-2xl">Total Spending</h1>
            <Pie {...spendingconfig} />
        </div>
    </main>
  );
}

export default Charts;
