import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // close on overlay click
    >
      <div
        className="bg-white rounded-md shadow-lg max-w-lg w-full p-6 transform transition-all duration-300 scale-95 opacity-0 animate-modal-open"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking modal content
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
