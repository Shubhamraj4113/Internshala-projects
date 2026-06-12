import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <>
      <Header />

      <main className="container">

        <div className="hero">
          <div className="hero-content">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest gadgets, fashion and essentials.</p>
          </div>
        </div>
        
        <SearchBar />
        <ProductList />
      </main>
    </>
  );
}