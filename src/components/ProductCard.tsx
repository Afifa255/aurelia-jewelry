import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart, formatPrice } from "@/lib/cart";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    add(product.id);
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-card border border-border/40">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={handleAdd}
          className="absolute bottom-4 left-4 right-4 py-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary/90"
        >
          Add to Cart
        </button>
      </div>
      <div className="pt-5 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">{product.category}</p>
        <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}