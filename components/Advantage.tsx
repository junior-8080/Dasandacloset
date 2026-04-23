"use client";

import { motion } from "framer-motion";
import RevealSection from "@/components/RevealSection";
import { fadeUp } from "@/lib/animations";
import { ADVANTAGES } from "@/lib/data";

export default function Advantage() {
  return (
    <section className="py-24 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-red/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <RevealSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Why Choose Us
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
              The Dasanda
              <br />
              <span className="brand-gradient-text">Advantage</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-brand-red/40 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-brand-glow group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}