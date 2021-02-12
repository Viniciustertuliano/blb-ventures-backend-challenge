import * as React from 'react';
import './confirm-remove-product-dialog.css';

interface ConfirmRemoveProductDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmRemoveProductDialog: React.FC<ConfirmRemoveProductDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <div className={`modal${open ? ' open' : ''}`}>
      <div className="overlay" onClick={onClose} />
      <div className="dialog">
        <div className="confirm-remove-dialog-title">Remover produto</div>
        <span>Você realmente deseja remover este produto?</span>
        <div className="dialog-actions">
          <button className="btn outlined-btn" onClick={onClose}>
            Manter
          </button>
          <button className="btn danger-btn" onClick={onConfirm}>
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
