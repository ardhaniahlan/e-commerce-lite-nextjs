import Link from "next/link";
import { Product } from "../types/product.types";
import { useWishlistStore } from "../stores/wishlistStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const ratingValue = product.rating?.rate || 0;
  const reviewCount = product.rating?.count || 0;

  const { items, addToWishlist, removeFromWishlist } = useWishlistStore();
  const isWishlisted = items.some((item) => item.id === product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-100">
        <div className="relative w-full aspect-4/5 bg-gray-50 overflow-hidden p-4 flex items-center justify-center">
          <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm transition-colors ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            aria-label="Wishlist button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>

          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 flex flex-col grow">
          <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">
            {product.category}
          </span>

          <h3
            className="text-sm text-slate-800 font-medium mb-3 line-clamp-1"
            title={product.title}
          >
            {product.title}
          </h3>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-[#0044CC]">
              ${product.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-amber-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>

              <span className="text-xs font-semibold text-gray-700">
                {ratingValue}
              </span>

              <span className="text-[10px] text-gray-400">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
