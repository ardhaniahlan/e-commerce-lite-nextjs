import { Product } from '../types/product.types';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const ratingValue = product.rating?.rate || 0;
  const reviewCount = product.rating?.count || 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-md border border-transparent hover:border-gray-100">
      
      <div className="relative w-full aspect-4/5 bg-gray-50 overflow-hidden p-4 flex items-center justify-center">
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

        <h3 className="text-sm text-slate-800 font-medium mb-3 line-clamp-1" title={product.title}>
          {product.title}
        </h3>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-[#0044CC]">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-500">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
            
            <span className="text-xs font-semibold text-gray-700">{ratingValue}</span>
            
            <span className="text-[10px] text-gray-400">({reviewCount})</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductCard;