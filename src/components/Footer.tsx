import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.18em]">AURELIA</div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
            Fine jewelry, hand-finished in our Parisian atelier since 1924.
            Designed to be inherited.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary mb-4">Maison</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link to="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link to="/categories" className="hover:text-primary">Collections</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary mb-4">Care</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Lifetime warranty</li>
            <li>Complimentary engraving</li>
            <li>Worldwide shipping</li>
            <li>30-day returns</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Aurelia Jewelry. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Paris · New York · Tokyo</span>
        </div>
      </div>
    </footer>
  );
}