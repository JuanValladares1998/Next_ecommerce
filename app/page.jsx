import Footer from "@/components/Footer";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";

const getProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
const Home = async () => {
  const products = await getProducts();

  return (
    <>
      <section className="hero h-full lg:h-[70vh]">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={products[0].images[0]}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Nuevo Producto!</h1>
            <h2 className="text-7xl font-bold text-accent">
              {products[0].title}
            </h2>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex gap-2">
              <Link
                href={`/products?id=${products[0]._id}`}
                className="btn btn-secondary btn-xl w-48"
              >
                Ver producto
              </Link>
              <button className="btn btn-accent btn-xl w-48">Comprar</button>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl p-4 flex-center w-full mx-auto flex-col">
        <h2 className="mb-6">Nuevos productos</h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
