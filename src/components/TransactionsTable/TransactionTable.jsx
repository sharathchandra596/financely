import { Table } from 'antd';
import { useState } from 'react';


// eslint-disable-next-line react/prop-types
function TransactionTable({transactions}) {
    const [search , setSearch] = useState("")
   
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
      ];

      // eslint-disable-next-line react/prop-types
      let fileterdTransactions = transactions.filter((transaction)=>{
        return transaction.name.toLowerCase().includes(search.toLowerCase())
      })
      
    
  return (
    <>
    <div className='flex justify-center items-center m-3'>
    <p className=' text-xl text-blue-600 p-2'>Search By Name</p>
    <input className=' w-1/2 border border-blue-500 rounded-lg' type="text" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search By Name" />

    </div>
    <Table dataSource={fileterdTransactions} columns={columns} />
    </>
  )
}

export default TransactionTable
