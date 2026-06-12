import { useSelector } from "react-redux";

import useProducts from "../hooks/useProducts";
import ProductItem from "./ProductItem";

export default function ProductList() {
  const { products, loading, error } = useProducts();
  const searchTerm = useSelector((state) => state.search.searchTerm.toLowerCase());

  const filteredProducts = products.filter((product) =>
    product?.title?.toLowerCase()?.includes(searchTerm)
  );

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <section className="product-grid">
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))
      )}
    </section>
  );
}
