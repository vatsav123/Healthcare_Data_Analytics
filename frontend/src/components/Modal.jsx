const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className=" z-10 fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
