import { useState } from 'react';
import { ModalDialog } from './basic-modal-dialog';

export const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const dialog = isOpen ? <ModalDialog onClose={close} /> : null;

  return { isOpen, open, close, dialog };
};
