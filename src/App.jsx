
import { useEffect, useState } from "react";
import { getAllProducts } from "./utils/Products";
import Card from "./components/Card";

const App = () => {
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  const [showCartItem, setShowCartItem] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) return prev;

      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const displayedProducts = showCartItem ? cartItems : products;

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#050714] text-white">

      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#080b19]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <button
            onClick={() => setShowCartItem(false)}
            className="text-2xl font-black tracking-tight"
          >
            shop<span className="text-violet-400">ora.</span>
          </button>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-400 md:flex">
            <button
              onClick={() => setShowCartItem(false)}
              className={!showCartItem ? "text-violet-300" : "transition hover:text-white"}
            >
              Discover
            </button>

            <a href="#products" className="transition hover:text-violet-300">
              Products
            </a>
          </div>

          <button
            onClick={() => setShowCartItem((prev) => !prev)}
            className={`flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
              showCartItem
                ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                : "border-white/10 bg-white/[0.05] hover:border-violet-400/40 hover:bg-violet-500/10"
            }`}
          >
            <span>My Cart</span>

            <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 px-2 text-xs font-extrabold text-white">
              {cartItems.length}
            </span>
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8">

        {/* Hero Section */}
        {!showCartItem && (
          <section className="relative isolate mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#090c20] px-7 py-12 sm:px-12 sm:py-16 lg:py-20">

            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_20%,rgba(124,58,237,0.38),transparent_35%),radial-gradient(ellipse_at_65%_110%,rgba(217,70,239,0.15),transparent_40%)]" />

            <div className="absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative max-w-2xl">

              <span className="inline-flex rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-widest text-violet-200">
                YOUR EVERYDAY FINDS
              </span>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-6xl">
                Find your next
                <span className="block bg-gradient-to-r from-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                  favorite thing.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
                Good products. Great choices. Discover something you’ll love,
                all in one place.
              </p>

              <a
                href="#products"
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-violet-100"
              >
                Explore collection
                <span className="text-violet-600">↗</span>
              </a>
            </div>

            {/* Decorative Glow */}
            <div className="pointer-events-none absolute -bottom-24 right-10 -z-10 h-64 w-64 rounded-full border border-violet-400/20" />
            <div className="pointer-events-none absolute right-24 top-10 -z-10 h-40 w-40 rounded-full border border-white/10" />
          </section>
        )}

        {/* Products / Cart Heading */}
        <section id="products">

          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
                {showCartItem ? "YOUR SELECTION" : "CURATED FOR YOU"}
              </p>

              <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
                {showCartItem ? "Your shopping cart" : "Explore products"}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {showCartItem
                  ? `${cartItems.length} item${cartItems.length === 1 ? "" : "s"} in your cart`
                  : "Discover something worth adding to your collection."}
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-300">
              {showCartItem
                ? "Your cart"
                : `${products.length} products`}
            </span>
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse rounded-2xl border border-white/10 bg-[#090d1d] p-3"
                >
                  <div className="h-56 rounded-xl bg-white/10" />
                  <div className="mt-5 h-4 w-2/3 rounded bg-white/10" />
                  <div className="mt-3 h-4 w-1/3 rounded bg-white/10" />
                  <div className="mt-5 h-10 rounded-xl bg-white/10" />
                </div>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (

            /* Empty State */
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] px-6 py-20 text-center">
              <div className="text-5xl">🛍️</div>

              <h3 className="mt-5 text-xl font-bold text-white">
                {showCartItem ? "Your cart is empty" : "No products found"}
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                {showCartItem
                  ? "Explore our collection and add something you love."
                  : "Please try again in a moment."}
              </p>

              {showCartItem && (
                <button
                  onClick={() => setShowCartItem(false)}
                  className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white transition hover:brightness-110"
                >
                  Explore products
                </button>
              )}
            </div>
          ) : (

            /* Product Grid */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => (
                <Card
                  key={product.id}
                  data={product}
                  itemAdded={cartItems.some(
                    (item) => item.id === product.id
                  )}
                  showCartItem={showCartItem}
                  handleAddToCart={() => addToCart(product)}
                  handleRemoveCart={() => removeFromCart(product.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Cart Summary */}
        {showCartItem && cartItems.length > 0 && (
          <section className="mt-8 rounded-2xl border border-white/10 bg-[#090d1d] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Order summary
                </p>
                <h3 className="mt-2 text-xl font-black">Subtotal</h3>
              </div>

              <p className="text-3xl font-black text-violet-300">
                ${subtotal.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => setShowCartItem(false)}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3.5 text-sm font-bold text-white transition hover:brightness-110 sm:w-auto"
            >
              Continue Shopping →
            </button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#080b19]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-lg font-black text-white">
            shop<span className="text-violet-400">ora.</span>
          </p>

          <p>Discover more. Shop better.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
