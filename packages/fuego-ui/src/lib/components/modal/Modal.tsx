import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';
import FocusTrap from 'focus-trap-react';
import { AnimatePresence, motion } from 'framer-motion';
export interface IModal {
  isShowing?: boolean;
  hide?: any;
  position?: string;
  className?: string;
  modalHeader?: boolean;
  modalHeaderContent?: any;
  children?: React.ReactElement;
  fullscreen?: boolean;
  selector?: string;
  backdrop?: boolean;
  offset?: number;
}

const ModalWrapper = styled.div<IModal>`
  ${({ offset }) => offset && `height: calc(100vh - ${offset}) !important;`}
`;

export const ModalCmp = ({
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
    <AnimatePresence exitBeforeEnter>
      {isShowing && (
        <motion.div
          key="modal"
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
        >
          <div>
            {backdrop && <ModalBackdrop onClick={hide}></ModalBackdrop>}
            <FocusTrap>
              <ModalWrapper
                className={`modal ${className}`}
                tabIndex={-1}
                role="dialog"
                {...props}
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content flex flex-col">
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
                    <div className="modal-body relative p-4">{children}</div>
                  </div>
                </div>
              </ModalWrapper>
            </FocusTrap>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(modalEl, document.body) : null;
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const centeredModal = css`
  min-height: calc(100% - 3.5rem);
`;

const fullscreenModal = css`
  width: 100vw;
  max-width: none;
  height: 100%;
  margin: 0;

  .modal-content {
    height: 100%;
    border: 0;
    border-radius: 0;
  }

  .modal-body {
    height: 100%;
  }
`;

export const Modal = styled(ModalCmp)<IModal>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;

  .modal-dialog {
    display: flex;
    align-items: center;
    position: relative;
    width: auto;
    max-width: 500px;
    margin: 1.75rem auto;

    ${({ position }) => position === 'centered' && centeredModal}
    ${({ fullscreen }) => fullscreen && fullscreenModal}
  }

  .modal-content {
    position: relative;
    width: 100%;
    pointer-events: auto;
    background-clip: padding-box;
    outline: 0;
    overflow: scroll;
    background-color: ${({ theme }) => theme.palette && theme.primary};
    color: ${({ theme }) => theme && theme.accent};
  }

  .modal-header {
    background-color: ${({ theme }) => theme && theme.primary};
    min-height: 40px;

    .close {
      font-size: 2rem;
      line-height: 1;
      background-color: transparent;
      border: 0;
      color: ${({ theme }) => theme && theme.accent};

      &:hover,
      &:focus {
        color: ${({ theme }) => theme && theme.secondary};
      }

      &:focus-visible {
        outline: 1px dashed #000;
        outline-offset: -2px;
      }
    }
  }

  .modal-body {
    background-color: ${({ theme }) => theme && theme.background};
  }
`;
