import React from 'react';
import { Coffee, ShieldCheck, Heart, Sparkles, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { SITE_CONFIG } from '../data/siteConfig';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenSeoAuditor: () => void;
}

export function AboutPage({ onNavigate, onOpenSeoAuditor }: AboutPageProps) {
  return (
    <>
      <SEOHead
        title="About The Coffee Journal - Philosophy & Brewing Standards"
        description="Learn about The Coffee Journal, an independent publication dedicated to accessible coffee education, brewing science, and home barista recipes."
        canonicalPath="/about"
        type="website"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[{ label: 'About' }]}
          onNavigate={onNavigate}
        />

        {/* Page Header */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-widest text-[#8C5332]">
            Our Story & Methodology
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#241712] tracking-tight">
            About The Coffee Journal
          </h1>
          <p className="text-lg text-[#554338] leading-relaxed">
            An educational coffee publication created to bridge the gap between complex specialty coffee science and practical, budget-conscious home brewing.
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-21/9 rounded-2xl overflow-hidden bg-[#2D1E18] shadow-md border border-[#E0D3C4]">
          <img
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80"
            alt="Hand sorting roasted specialty coffee beans on a wooden cupping table"
            width={1200}
            height={514}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Mission Section */}
        <section className="space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#241712]">
            Why We Founded The Journal
          </h2>
          <div className="article-prose space-y-4 text-base text-[#4A3B32]">
            <p>
              Specialty coffee culture often feels exclusionary. Between four-figure commercial espresso gear, complex refraction curves, and intimidating cupping jargon, many beginners and college students assume that brewing delicious coffee requires a massive budget.
            </p>
            <p>
              We created <strong>The Coffee Journal</strong> to challenge that notion. Great coffee is grounded in chemistry, physics, and sensory awareness—not financial extravagance. By understanding how water temperature, particle surface area, and extraction time interact, anyone can brew café-caliber drinks with an inexpensive French press, a Moka pot, or an everyday saucepan.
            </p>
          </div>
        </section>

        {/* Our 4 Core Editorial Principles */}
        <section className="space-y-6 pt-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#241712]">
            Our Editorial & Testing Standards
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C5332]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#2D1E18]">
                1. Practical, Reproducible Recipes
              </h3>
              <p className="text-xs sm:text-sm text-[#665448] leading-relaxed">
                Every recipe and brew ratio published on The Coffee Journal is tested in a domestic kitchen environment using accessible tap water and standard home grinders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C5332]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#2D1E18]">
                2. Science-Grounded Advice
              </h3>
              <p className="text-xs sm:text-sm text-[#665448] leading-relaxed">
                We explain the "why" behind the technique—why water temperature matters at 93°C, why coffee degasses CO2, and how milk proteins denature under excessive heat.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C5332]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#2D1E18]">
                3. Origin & Cultural Respect
              </h3>
              <p className="text-xs sm:text-sm text-[#665448] leading-relaxed">
                Whether discussing Vietnamese Phin rituals or Ethiopian highlands terroir, we honor the farmers, traditions, and historical contexts that shaped global coffee heritage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#DECFC0] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C5332]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-[#2D1E18]">
                4. Student-Budget Friendly
              </h3>
              <p className="text-xs sm:text-sm text-[#665448] leading-relaxed">
                We champion low-cost hacks like French press milk frothing, mason jar cold brew steeping, and cowboy pot extraction over costly single-purpose machines.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Disclosure Callout */}
        <section className="p-6 rounded-2xl bg-[#F4EDE4] border border-[#DECFC0] space-y-3">
          <div className="flex items-center gap-2 font-editorial text-lg font-bold text-[#2D1E18]">
            <Sparkles className="w-5 h-5 text-[#8C5332]" />
            <span>Academic Project Disclosure</span>
          </div>
          <p className="text-xs sm:text-sm text-[#554338] leading-relaxed">
            This website was designed, written, and engineered for a <strong>College Technical SEO and AEO Assignment</strong>. It showcases semantic HTML architecture, Schema.org JSON-LD structured data compliance, direct-answer optimization for Google Featured Snippets, internal linking topology, XML sitemaps, and robots.txt protocols.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenSeoAuditor}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#2D1E18] text-[#FAF7F2] hover:bg-[#432D24] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              <span>Launch Live Technical SEO Audit</span>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
