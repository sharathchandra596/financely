import { useState } from "react";
// eslint-disable-next-line react/prop-types
function CurrentBalance({totalbalnce}) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className=" w-1/3 shadow-xl p-3 rounded-lg m-3 bg-zinc-200 ">
      <h1 className="text-2xl border-b border-blue-600 p-2 mb-3">
        Current Balance
      </h1>
      <p className="text-xl text-blue-700">₹{totalbalnce}</p>
      {/* modal */}
      <div>
        <div className="flex justify-center items-center">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Open Modal
          </button>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="modal overflow-y-auto rounded-lg shadow-lg bg-white max-w-sm">
                <div className="modal-header flex justify-between p-4 border-b border-gray-200">
                  <h3 className="text-xl font-medium text-gray-700">
                    Modal Title
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 focus:outline-none"
                  >
                    X
                  </button>
                </div>
                <div className="modal-body p-4 text-gray-700">
                  {/* Your modal content goes here */}
                  <p>This is the modal content.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentBalance;
