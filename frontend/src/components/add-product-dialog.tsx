import * as React from 'react';
import './add-product-dialog.css';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; price: string; image: File }, reset: () => void) => void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onSubmit }) => {
  const form = React.useRef<HTMLFormElement>(null);
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [image, setImage] = React.useState<FileWithPath | null>(null);
  const onDrop = React.useCallback(accepted => setImage(accepted[0]), [setImage]);
  const { getRootProps, getInputProps, open: openFile } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop,
  });
  const reset = () => {
    setName('');
    setPrice('');
    setImage(null);
  };
  return (
    <div className={`modal${open ? ' open' : ''}`}>
      <div className="overlay" onClick={onClose} />
      <div className="dialog">
        <form ref={form}>
          <div className="add-dialog-title">Adicionar produto</div>
          <div className="form-control">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <img src="/upload-icon.png" />
              <p>Clique em selecionar imagem ou arraste-a aqui</p>
              <span className="select-image" onClick={openFile}>
                Selecionar imagem
              </span>
            </div>
            {image != null ? <div className="accepted-files">{image.path}</div> : null}
          </div>
          <div className="form-control">
            <div className="form-label">Nome</div>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-control">
            <div className="form-label">Preço</div>
            <input type="tel" name="price" value={price} onChange={e => setPrice(e.target.value)} />
          </div>
          <div
            className="editing-add-btn submit-add-btn"
            onClick={() => {
              if (image != null) {
                onSubmit({ name, price, image }, reset);
              }
            }}
          >
            Adicionar
          </div>
        </form>
      </div>
    </div>
  );
};
