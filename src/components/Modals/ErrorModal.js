import Modal from './Modal';
import ModalHeader from './ModalHeader';
import React from 'react';

export default function ErrorModal({ title = 'Error', description, onToggle }) {
  return (
    <Modal>
      <ModalHeader className="bg-danger">{title}</ModalHeader>
      <div className="p-4">{description}</div>
      <div className="flex p-4">
        <button className="ml-auto text-white btn bg-danger" onClick={onToggle}>
          <i className="mr-2 fas fa-times"></i> Close
        </button>
      </div>
    </Modal>
  );
};
