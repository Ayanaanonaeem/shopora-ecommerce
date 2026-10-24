
import React from "react";

const Card = ({
  data,
  handleAddToCart,
  itemAdded,
  showCartItem,
  handleRemoveCart,
}) => {
  const { category, description, images, title, price } = data;

  const image =
    (Array.isArray(images) && images.length > 0 && images[0]) ||
    "https://placehold.co/600x600/111827/94a3b8?text=Product";

  const categoryName =
    typeof category === "object" ? category?.name : category;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#090d1d] p-3 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-950/30">

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl bg-[#151827]">
        <img
          src={image}
          alt={title || "Product"}
          loading="lazy"
          className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full border border-white/20 bg-[#090d1d]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-200 shadow-lg backdrop-blur">
          {categoryName || "Collection"}
        </span>

        {/* Cart Status */}
        {itemAdded && !showCartItem && (
          <span className="absolute right-3 top-3 rounded-full border border-emerald-400/20 bg-emerald-500/15 px-3 py-1.5 text-[10px] font-bold text-emerald-300 shadow-sm backdrop-blur">
            IN CART ✓
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 className="line-clamp-1 text-base font-bold text-white transition group-hover:text-violet-300">
          {title || "Untitled product"}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-slate-400">
          {description || "Discover the details of this product."}
        </p>

        {/* Price and Actions */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Price
            </p>

            <p className="mt-1 text-xl font-black tracking-tight text-white">
              {price != null ? `$${Number(price).toFixed(2)}` : "N/A"}
            </p>
          </div>

          {showCartItem ? (
            <button
              onClick={handleRemoveCart}
              className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-300 transition hover:border-rose-400 hover:bg-rose-500/20"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={itemAdded}
              className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                itemAdded
                  ? "cursor-not-allowed border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                  : "bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md shadow-violet-950/30 hover:brightness-110"
              }`}
            >
              {itemAdded ? "Added ✓" : "Add to cart +"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Card;
