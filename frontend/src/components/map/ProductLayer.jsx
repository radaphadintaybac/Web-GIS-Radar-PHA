import React, { useMemo } from "react";
import { useSelection } from "../../context/SelectionContext";
import ProductLayerContent from "./ProductLayerContent";

/**
 * Wrapper memo cho ProductLayerContent.
 */
const ProductLayer = React.memo(() => {
  const { selections } = useSelection();
  const productName = selections.products.name;

  return useMemo(
    () => <ProductLayerContent key={productName} product={productName} />,
    [productName],
  );
});

ProductLayer.displayName = "ProductLayer";

export default ProductLayer;
