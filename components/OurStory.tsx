"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { fadeUp } from "@/lib/animations";

const VALUES = [
  { label: "Modesty" },
  { label: "Quality" },
  { label: "Loyalty" },
  { label: "Creativity" },
];

export default function OurStory() {
  return (
    <section id="story" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <RevealSection>
            <motion.div variants={fadeUp} className="relative h-[520px]">
              <div className="absolute top-0 left-0 w-64 h-80 rounded-3xl overflow-hidden shadow-card-hover">
                <Image
                  src="/landingPage/ourStory.jpeg"
                  alt="Dasanda style"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-72 rounded-3xl overflow-hidden shadow-card-hover">
                <Image
                  src="/landingPage/ourStoryDress.jpeg"
                  alt="Dasanda style 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-5 shadow-card-hover text-center w-44 z-10">
                <p className="font-serif text-4xl font-bold brand-gradient-text">
                  3+
                </p>
                <p className="text-xs text-brand-charcoal-light font-medium mt-1">
                  Years of Modest Fashion Excellence
                </p>
              </div>
            </motion.div>
          </RevealSection>

          {/* Text */}
          <RevealSection>
            <motion.div variants={fadeUp} className="space-y-6">
              <span className="inline-block text-brand-red text-xs font-semibold tracking-[0.2em] uppercase">
                Our Story
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brand-charcoal leading-tight">
                Power & Confidence
                <br />
                <span className="brand-gradient-text">Through Modesty</span>
              </h2>
              <p className="text-brand-charcoal-light leading-relaxed">
                Dasanda Closet was born from a simple but powerful belief: that
                modest fashion should never mean sacrificing style, power, or
                confidence. Based in Ghana, we curate and craft pieces that
                celebrate the modern modest woman.
              </p>
              <p className="text-brand-charcoal-light leading-relaxed">
                From our signature made-to-fit collections to our curated
                accessories and free styling tips, everything we do is in
                service of one mission — helping you look and feel extraordinary.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {VALUES.map((v) => (
                  <div key={v.label} className="flex items-center gap-2">
                    <span className="text-brand-red text-xs">✦</span>
                    <span className="font-semibold text-brand-charcoal text-sm">
                      {v.label}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-7 py-3.5 rounded-full shadow-brand-glow hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm mt-2"
              >
                Shop the Collection
                <ArrowRight size={16} />
              </a>
            </motion.div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}