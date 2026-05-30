import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Aurelia" }, { name: "description", content: "Complete your Aurelia order." }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { detailed, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", country: "" });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      toast.error("Please complete all required fields");
      return;
    }
    setPlaced(true);
    clear();
    toast.success("Order placed", { description: "A confirmation has been sent to your email." });
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary mb-6" />
        <h1 className="font-display text-5xl mb-4">Merci.</h1>
        <p className="text-muted-foreground mb-10">
          Your order has been received. A member of our atelier will be in touch within 24 hours
          to confirm your engraving and shipping details.
        </p>
        <Link
          to="/shop"
          className="inline-block px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary/90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl mb-6">Your bag is empty</h1>
        <button
          onClick={() => navigate({ to: "/shop" })}
          className="px-10 py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase hover:bg-primary/90"
        >
          Shop the collection
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
      <div className="text-center mb-12">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Checkout</p>
        <h1 className="font-display text-5xl">Complete Your Order</h1>
        <div className="luxury-divider w-24 mx-auto mt-8" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
          <h2 className="font-display text-2xl">Shipping Details</h2>
          {[
            { k: "name", label: "Full name", type: "text", required: true },
            { k: "email", label: "Email", type: "email", required: true },
            { k: "address", label: "Address", type: "text", required: true },
            { k: "city", label: "City", type: "text", required: false },
            { k: "country", label: "Country", type: "text", required: false },
          ].map((f) => (
            <div key={f.k}>
              <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
                {f.label}{f.required && " *"}
              </label>
              <input
                type={f.type}
                value={form[f.k as keyof typeof form]}
                onChange={onChange(f.k as keyof typeof form)}
                maxLength={200}
                className="w-full bg-card border border-border/60 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 shadow-gold"
          >
            Place Order — {formatPrice(subtotal)}
          </button>
        </form>

        <aside className="bg-card p-8 border border-border/40 h-fit">
          <h2 className="font-display text-2xl mb-6">Your Bag</h2>
          <div className="space-y-4 mb-6">
            {detailed.map(({ product, quantity, lineTotal }) => (
              <div key={product.id} className="flex gap-3 text-sm">
                <img src={product.image} alt={product.name} className="h-16 w-16 object-cover" loading="lazy" />
                <div className="flex-1 min-w-0">
                  <p className="truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {quantity}</p>
                </div>
                <p className="text-primary">{formatPrice(lineTotal)}</p>
              </div>
            ))}
          </div>
          <div className="luxury-divider my-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span><span className="text-primary">Free</span>
          </div>
          <div className="mt-3 flex justify-between font-display text-xl">
            <span>Total</span><span className="text-primary">{formatPrice(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}