import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IModal } from './Modal.types';
import FocusLock from 'react-focus-lock';

export const Modal = ({
  isShowing = false,
  hide,
  modalHeader = true,
  modalHeaderContent,
  children,
  className = '',
  position = 'centered',
  fullscreen,
  selector = 'body',
  backdrop = true,
  ...props
}: IModal) => {
  const ref = useRef<Element | null>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  const modalEl: any = (
    <div
      className={`modal ${isShowing ? 'modal-open' : ''}`}
      role="dialog"
      {...props}
    >
      <FocusLock>
        <div
          className={`modal-box ${
            fullscreen ? 'w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh]' : ''
          } ${className}`}
          role="document"
        >
          {modalHeader && (
            <div className="modal-header flex">
              <div className="grow">{modalHeaderContent}</div>

              <button
                type="button"
                className="close px-2"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )}
          <div className="modal-body">{children}</div>
        </div>
      </FocusLock>
    </div>
  );

  return mounted ? createPortal(modalEl, document.body) : null;
};

export default Modal;
