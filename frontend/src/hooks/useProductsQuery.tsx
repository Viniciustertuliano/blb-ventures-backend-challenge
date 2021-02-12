import * as React from 'react';
import { getProducts, Product } from '../service/product.service';

export const useProductsQuery = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Product[]>([]);
  const fetch = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      console.log('GET RES', res);
      setData(res);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetch();
  }, []);
  return {
    data,
    loading,
    refetch: fetch,
  };
};
