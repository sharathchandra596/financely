
import TotalexpensesForm from "./forms/TotalexpensesForm";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
function TotalExpenses({onFinish,expenses}) {
    const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className=" w-1/3 shadow-xl p-3 rounded-lg m-3 bg-zinc-200 ">
      <h1 className="text-2xl border-b border-blue-600 p-2 mb-3">
        Total Expenses
      </h1>
      <p className="text-xl text-blue-700">₹{expenses}</p>


      {/* modal */}
      <div>
        <div className="flex justify-center items-center">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Expenses
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="modal overflow-y-auto rounded-lg shadow-lg bg-white max-w-sm">
                <div className="modal-header flex justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-700">
                    Add expenses
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-black focus:outline-none font-bold"
                  >
                    X
                  </button>
                </div>
                <div className="modal-body p-4 text-gray-700">
                  {/* Your modal content goes here */}
                  <div>
                    <TotalexpensesForm closeModal={closeModal} onFinish={onFinish}/>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TotalExpenses
