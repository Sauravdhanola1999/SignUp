import React from 'react';

interface PopUpProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ message, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default PopUp;
