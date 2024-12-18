import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isDeleting: boolean; 

}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, message, isDeleting }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-customBgLight2 p-6 w-1/3 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">Confirmação</h2>
        <p className="text-base text-orange-700">{message}</p>
        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="mr-4 bg-customBgLight3 font-semibold px-6 py-2 text-orange-700 rounded hover:border border-orange-700">
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-customBgLight3 text-red-700 rounded  font-semibold px-6 py-2 hover:border border-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center space-x-1">
                <span className="animate-bounce">•</span>
                <span className="animate-bounce">•</span>
                <span className="animate-bounce">•</span>
              </span>
            ) : (
              'Deletar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};


export default Modal;
