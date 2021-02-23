import React from "react";

import DefaultModal from "react-modal";

interface ModalProp {
  className?: string;
  visible: boolean;
  onCloseRequest: () => void;
  children?: JSX.Element;
}

function Modal({
  className = "",
  visible,
  onCloseRequest,
  children,
}: ModalProp) {
  DefaultModal.setAppElement("#app-root");

  return (
    <DefaultModal
      isOpen={visible}
      onRequestClose={onCloseRequest}
      shouldFocusAfterRender={false}
      htmlOpenClassName="ReactModal__Body--open"
      overlayClassName={"modal"}
      className={"modal-card " + className}
    >
      {children}
    </DefaultModal>
  );
}

export default Modal;
