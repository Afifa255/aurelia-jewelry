import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Aurelia" },
      { name: "description", content: "A century of fine jewelry, hand-finished in the Aurelia atelier in Paris since 1924." },
      { property: "og:title", content: "Our Story — Aurelia" },
      { property: "og:description", content: "A century of fine jewelry, hand-finished in Paris since 1924." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden -mt-20">
        <img src={heroImg} alt="Aurelia atelier" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative h-full flex items-end pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10 w-full">
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Est. 1924 · Paris</p>
            <h1 className="font-display text-5xl md:text-7xl">Our Story</h1>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 space-y-10 text-lg leading-relaxed text-muted-foreground">
          <p className="font-display text-3xl text-foreground leading-tight">
            Aurelia was founded in a single room on the Rue de la Paix by Lucien Aurelia,
            a stonecutter who believed every gem deserved a setting worthy of a century.
          </p>
          <p>
            One hundred years later, every piece we make is still hand-finished by a single
            master jeweler. We do not subcontract. We do not mass-produce. The diamonds we
            set are personally selected by our gemologists in Antwerp, the gold is poured in
            our own foundry, and the final polish is given by the same hand that began the work.
          </p>
          <div className="luxury-divider w-24" />
          <p>
            Our atelier is small by design. We make fewer than two thousand pieces a year.
            Each is signed, numbered, and accompanied by a lifetime guarantee — because an
            Aurelia is not bought for a season. It is bought for the people who will inherit it.
          </p>
          <p className="font-display text-2xl text-primary italic">
            "We do not sell jewelry. We hand you the next hundred years."
          </p>
          <p className="text-sm tracking-[0.25em] uppercase">— Hélène Aurelia, Atelier Directrice</p>
        </div>
      </section>

      <section className="py-20 bg-card/40">
        <div className="mx-auto max-w-5xl px-6 grid md:grid-cols-3 gap-12 text-center">
          {[
            { n: "1924", l: "Founded in Paris" },
            { n: "100%", l: "Hand-finished" },
            { n: "∞", l: "Lifetime guarantee" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl gradient-gold mb-3">{s.n}</p>
              <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}