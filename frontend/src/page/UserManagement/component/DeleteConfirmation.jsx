/* eslint-disable react/prop-types */
const DeleteConfirmation = ({ show, patient, onClose, onConfirm }) => {
  if (!show || !patient) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Confirm Delete Patient</h2>
          <p>Are you sure you want to delete thepatient: {patient.name}?</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
