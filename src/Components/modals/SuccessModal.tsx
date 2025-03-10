import React, { useState } from "react";

function SuccessModal() {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-64 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center mb-4">
          {/* <Check className="w-12 h-12 text-green-500" /> */}
        </div>
        {/* Botón para cerrar el modal */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 flex items-center"
        >
          {/* <X size={20} /> */}
          <span className="ml-1">cerrar</span>
        </button>
      </div>
    </div>
  );
}

export default SuccessModal;
