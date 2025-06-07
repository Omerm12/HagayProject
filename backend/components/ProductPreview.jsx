import React, { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';

const api = new ApiClient();

const ProductPreview = (props) => {
  const { record } = props;
  const productId = record?.params?.product_id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      api.resourceAction({ resourceId: 'products', actionName: 'show', recordId: productId })
        .then(res => setProduct(res.data.record));
    }
  }, [productId]);

  if (!product) return <span>טוען...</span>;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <img src={product.params.image_url} alt="Product" style={{ height: 40, width: 40, objectFit: 'cover' }} />
      <span>{product.params.title}</span>
    </div>
  );
};

export default ProductPreview;
