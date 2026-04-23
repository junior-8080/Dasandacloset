"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Star, ChevronLeft, ChevronRight } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { fadeUp } from "@/lib/animations";
import { TESTIMONIALS } from "@/lib/data";

export default function SocialProof() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Social Proof
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight mb-4">
              Loved by{" "}
              <span className="brand-gradient-text">7,000+</span> Women
            </h2>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-red font-semibold text-sm hover:underline"
            >
              <Instagram size={16} />
              @dasandacloset on Instagram
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-brand-cream rounded-3xl p-8 md:p-12 text-center shadow-sm"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: TESTIMONIALS[active].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-brand-orange fill-brand-orange"
                      />
                    )
                  )}
                </div>

                <blockquote className="font-serif text-xl md:text-2xl text-brand-charcoal leading-relaxed mb-8 italic">
                  &ldquo;{TESTIMONIALS[active].text}&rdquo;
                </blockquote>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold">
                    {TESTIMONIALS[active].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-brand-charcoal text-sm">
                      {TESTIMONIALS[active].name}
                    </p>
                    <p className="text-brand-charcoal-light text-xs">
                      {TESTIMONIALS[active].location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-brand-charcoal/20 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2 bg-brand-red"
                        : "w-2 h-2 bg-brand-charcoal/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-brand-charcoal/20 flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </RevealSection>
      </div>
    </section>
  );
}