import React from 'react';
import logo from './logo.svg';
import './App.css';
import Switch from 'react-switch';
import { AddProductDialog } from './components/add-product-dialog';
import { ConfirmRemoveProductDialog } from './components/confirm-remove-product-dialog';
import { useProductsQuery } from './hooks/useProductsQuery';
import { createProduct, deleteProduct } from './service/product.service';

function App() {
  // States
  const [editMode, setEditMode] = React.useState(false);
  const [addDialogOpen, setAddDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<null | number>(null);

  // Custom Service Hook
  const productsQ = useProductsQuery();

  // Memos
  const products = React.useMemo(
    () =>
      productsQ.data.map(it => (
        <div className="product-item" key={it.id}>
          <img src={`http://localhost:5000/${it.image_url}`} alt="" />
          <p className="product-name">{it.name}</p>
          <p className="product-price">R$ {it.price}</p>
          <div className="product-add-btn">ADD R$ {it.price}</div>
          <div className="product-delete-btn" onClick={() => setSelectedProduct(it.id)}>
            X
          </div>
        </div>
      )),
    [productsQ.data]
  );

  // Handlers
  const handleAddProduct = async (
    values: { name: string; price: string; image: File },
    reset: () => void
  ) => {
    try {
      const res = await createProduct(values);
      if (res.id != null) {
        reset();
        setAddDialogOpen(false);
        productsQ.refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleRemove = async () => {
    if (selectedProduct == null) {
      return;
    }
    try {
      const res = await deleteProduct(selectedProduct);
      if (res.status === 204) {
        setSelectedProduct(null);
        productsQ.refetch();
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={`app${editMode ? ' app-editing' : ''}`}>
      <header className="header">
        <img src={logo} className="app-logo" alt="logo" />
        <div className="edit-mode-btn">
          <Switch
            onChange={(checked: boolean) => setEditMode(checked)}
            checked={editMode}
            className="react-switch"
            onColor="#419F4F"
            onHandleColor="#fff"
            offColor="#fff"
            handleDiameter={24}
            uncheckedIcon={false}
            checkedIcon={false}
            height={30}
            width={52}
          />
          Modo Edição
        </div>
      </header>
      <main>
        <div className="product-list">{products}</div>
      </main>
      <div className="editing-bar">
        <div>Modo de edição ativo</div>
        <div>
          <button className="editing-close-btn" onClick={() => setEditMode(false)}>
            Fechar
          </button>
          <button className="editing-add-btn" onClick={() => setAddDialogOpen(true)}>
            Adicionar Produto
          </button>
        </div>
      </div>
      <AddProductDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={handleAddProduct}
      />
      <ConfirmRemoveProductDialog
        open={selectedProduct != null}
        onClose={() => setSelectedProduct(null)}
        onConfirm={handleRemove}
      />
    </div>
  );
}

export default App;
