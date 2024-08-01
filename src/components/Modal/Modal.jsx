'use client';

import { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import Portal from '../Portal';

import { useClickOutside } from '../../hooks';

const Modal = ({ title, modal, onClose, children }) => {
  const modalRef = useRef(null);
  useClickOutside({ ref: modalRef, callback: onClose });

  return (
    <Portal>
      <div
        className={`${
          modal === 'hidden'
            ? 'hidden'
            : modal === 'close'
            ? 'animate-on-close-chat'
            : 'animate-on-open-chat'
        } h-screen w-screen max-w-full sm:max-w-md fixed right-0 top-0`}
        onAnimationEnd={() => modal === 'close' && onClose()}
        ref={modalRef}
      >
        <div className="h-full bg-[#1e262e] text-gray-300 shadow-xl rounded-l-3xl relative">
          <div className="flex flex-col pl-6 py-6 h-full justify-between">
            <div className="flex justify-between mr-6 mb-3">
              <h2 className="text-lg font-medium text-gray-300">{title}</h2>
              <button
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={onClose}
              >
                <CloseIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default Modal;
