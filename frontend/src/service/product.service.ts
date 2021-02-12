export interface Product {
  id: number;
  name: string;
  price: string;
  image_url: string;
}

const endpoint = 'http://localhost:5000';

export const getProducts = async (): Promise<Product[]> =>
  await fetch(`${endpoint}/products`).then(res => res.json());

export const createProduct = async (product: {
  name: string;
  price: string;
  image: File;
}): Promise<Product> => {
  const fd = new FormData();
  fd.append('name', product.name);
  fd.append('price', product.price);
  fd.append('image', product.image);
  return await fetch(`${endpoint}/products`, {
    body: fd,
    method: 'POST',
  }).then(res => res.json());
};

export const deleteProduct = async (productId: number) =>
  await fetch(`${endpoint}/products/${productId}`, {
    method: 'DELETE',
  });
