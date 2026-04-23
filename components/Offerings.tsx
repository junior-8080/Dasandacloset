"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { fadeUp } from "@/lib/animations";
import { OFFERINGS } from "@/lib/data";

export default function Offerings() {
  return (
    <section id="shop" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <RevealSection>
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-block text-brand-red text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              What We Offer
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
              Curated for the <br />
              <span className="brand-gradient-text">Confident Woman</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {OFFERINGS.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative bg-brand-cream rounded-3xl overflow-hidden shadow-sm hover:shadow-card-hover transition-shadow duration-500 cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 bg-brand-gradient text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-bold text-brand-charcoal">
                      {item.title}
                    </h3>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <p className="text-brand-charcoal-light text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <button className="flex items-center gap-2 text-brand-red text-sm font-semibold group/btn">
                    Explore
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}