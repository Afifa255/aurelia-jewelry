import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurelia" },
      { name: "description", content: "Reach the Aurelia atelier in Paris. Private consultations by appointment." },
      { property: "og:title", content: "Contact — Aurelia" },
      { property: "og:description", content: "Reach the Aurelia atelier. Private consultations by appointment." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please complete all fields");
      return;
    }
    toast.success("Message sent", { description: "We will reply within one business day." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-primary mb-3">Maison Aurelia</p>
        <h1 className="font-display text-5xl md:text-6xl">Contact</h1>
        <div className="luxury-divider w-24 mx-auto mt-8" />
        <p className="mt-8 max-w-xl mx-auto text-muted-foreground">
          For private consultations, bespoke commissions, or after-care, please reach out.
          A member of our atelier will respond within one business day.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className="w-full bg-card border border-border/60 px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={200}
              className="w-full bg-card border border-border/60 px-4 py-3 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
              maxLength={2000}
              className="w-full bg-card border border-border/60 px-4 py-3 text-sm focus:outline-none focus:border-primary resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-primary text-primary-foreground text-xs tracking-[0.3em] uppercase font-medium hover:bg-primary/90 shadow-gold"
          >
            Send Message
          </button>
        </form>

        <div className="space-y-10">
          <div className="bg-card border border-border/40 p-8">
            <h3 className="font-display text-2xl mb-6">The Atelier</h3>
            <div className="space-y-5 text-sm">
              <div className="flex gap-4">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground">14 Rue de la Paix</p>
                  <p className="text-muted-foreground">75002 Paris, France</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <a href="mailto:atelier@aurelia.com" className="hover:text-primary">atelier@aurelia.com</a>
              </div>
              <div className="flex gap-4">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>+33 1 42 60 24 00</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border/40 p-8">
            <h3 className="font-display text-2xl mb-4">Boutiques</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><span className="text-primary tracking-[0.2em] uppercase text-xs mr-3">Paris</span> Rue de la Paix</li>
              <li><span className="text-primary tracking-[0.2em] uppercase text-xs mr-3">New York</span> Madison Avenue</li>
              <li><span className="text-primary tracking-[0.2em] uppercase text-xs mr-3">Tokyo</span> Ginza</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}