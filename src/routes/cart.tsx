import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Aurelia" },
      { name: "description", content: "Review the pieces in your Aurelia shopping bag." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Your Bag</p>
        <h1 className="font-display text-5xl">Shopping Bag</h1>
        <div className="luxury-divider w-24 mx-auto mt-8" />
      </div>

      {detailed.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-8">Your bag is empty.</p>
          <Link
            to="/shop"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary/90"
          >
            Shop the collection
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {detailed.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.id}
                className="grid grid-cols-[100px_1fr_auto] md:grid-cols-[140px_1fr_auto] gap-6 items-center bg-card p-4 md:p-6 border border-border/40"
              >
                <Link to="/product/$id" params={{ id: product.id }} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">
                    {product.category}
                  </p>
                  <Link
                    to="/product/$id"
                    params={{ id: product.id }}
                    className="font-display text-lg md:text-xl hover:text-primary block"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">{formatPrice(product.price)}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center border border-border/60">
                      <button
                        onClick={() => setQty(product.id, quantity - 1)}
                        className="p-2 text-muted-foreground hover:text-primary"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 text-sm tabular-nums">{quantity}</span>
                      <button
                        onClick={() => setQty(product.id, quantity + 1)}
                        className="p-2 text-muted-foreground hover:text-primary"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(product.id)}
                      className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-destructive flex items-center gap-1"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right font-display text-lg text-primary">
                  {formatPrice(lineTotal)}
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-card p-8 border border-border/40 h-fit sticky top-28">
            <h2 className="font-display text-2xl mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Items</span>
                <span>{count}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-primary">Complimentary</span>
              </div>
            </div>
            <div className="luxury-divider my-6" />
            <div className="flex justify-between font-display text-xl">
              <span>Total</span>
              <span className="text-primary">{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-8 block text-center py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary/90 shadow-gold"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              className="mt-3 block text-center py-3 text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-primary"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}