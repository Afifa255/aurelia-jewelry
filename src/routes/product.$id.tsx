import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ShieldCheck, Truck, Award } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import { useCart, formatPrice } from "@/lib/cart";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Aurelia` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: `${loaderData.product.name} — Aurelia` },
          { property: "og:description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Piece not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-primary tracking-[0.3em] uppercase text-xs border-b border-primary/40 pb-1">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    add(product.id, qty);
    toast.success("Added to cart", { description: `${qty} × ${product.name}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
      <nav className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground mb-10 flex gap-2 items-center">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-primary">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative aspect-square bg-card overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            width={1200}
            height={1200}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl leading-tight">{product.name}</h1>
          <p className="mt-6 text-2xl text-primary font-display">{formatPrice(product.price)}</p>
          <div className="luxury-divider my-8" />
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-10 flex items-center gap-4">
            <div className="flex items-center border border-border/60">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 text-muted-foreground hover:text-primary"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-6 text-sm tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-3 text-muted-foreground hover:text-primary"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={onAdd}
              className="flex-1 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 transition-all shadow-gold"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-border/60">
            {[
              { icon: ShieldCheck, label: "Lifetime warranty" },
              { icon: Truck, label: "Free worldwide shipping" },
              { icon: Award, label: "Signed by the jeweler" },
            ].map((f) => (
              <div key={f.label} className="text-center">
                <f.icon className="h-5 w-5 mx-auto text-primary mb-2" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">More from</p>
            <h2 className="font-display text-3xl md:text-4xl">{product.category}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}