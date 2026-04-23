"use client";

import { motion } from "framer-motion";
import { Instagram, ArrowRight } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { fadeUp } from "@/lib/animations";

export default function CTABanner() {
  return (
    <section className="py-20 bg-brand-gradient relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
      </div>
      <RevealSection className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div variants={fadeUp} className="space-y-6">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Dress <br />
            with Confidence?
          </h2>
          <p className="text-white/80 text-lg max-w-md mx-auto">
            Explore our latest collection and get free styling tips with every
            order.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 bg-white text-brand-red font-bold px-8 py-4 rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              Shop Now <ArrowRight size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300"
            >
              <Instagram size={16} /> Follow Us
            </a>
          </div>
        </motion.div>
      </RevealSection>
    </section>
  );
}