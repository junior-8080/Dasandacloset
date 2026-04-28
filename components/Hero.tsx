"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const heroImages = [
  { src: "/landingPage/hero01.jpeg", alt: "Dasanda Closet — Modest Fashion" },
  { src: "/landingPage/hero02.jpeg", alt: "Dasanda Closet — Modest Fashion" },
  { src: "/landingPage/hero03.jpeg", alt: "Dasanda Closet — Modest Fashion" },
  { src: "/landingPage/hero04.jpeg", alt: "Dasanda Closet — Modest Fashion" },
];

const SLIDE_DURATION = 3000;

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-cream"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-red/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase"
            >
              <Sparkles size={12} />
              Modest Fashion House · Ghana
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-charcoal leading-[1.08] tracking-tight mb-6"
            >
              We Dress <br />
              <span className="brand-gradient-text">the Globe.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-brand-charcoal-light text-lg leading-relaxed mb-8 max-w-md"
            >
              Modest fashionable wears and free styling tips — because modesty
              is not a limitation, it&apos;s a superpower.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/shop"
                className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-7 py-3.5 rounded-full shadow-brand-glow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-sm"
              >
                Explore Collection
                <ArrowRight size={16} />
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 border border-brand-charcoal/20 text-brand-charcoal font-semibold px-7 py-3.5 rounded-full hover:border-brand-red hover:text-brand-red transition-all duration-300 text-sm"
              >
                Our Story
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-8 mt-12 pt-8 border-t border-brand-charcoal/10"
            >
              {[
                { value: "7K+", label: "Instagram Followers" },
                { value: "500+", label: "Happy Clients" },
                { value: "3+", label: "Years of Excellence" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-bold brand-gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-xs text-brand-charcoal-light mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Image Swiper */}
          <motion.div
            style={{ y }}
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: d * 60, opacity: 0, scale: 1.04 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: d * -60, opacity: 0, scale: 0.97 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -50) goTo((current + 1) % heroImages.length);
                    else if (info.offset.x > 50) goTo((current - 1 + heroImages.length) % heroImages.length);
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={heroImages[current].src}
                    alt={heroImages[current].alt}
                    fill
                    className="object-cover"
                    priority={current === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/30 via-transparent to-transparent pointer-events-none" />

              {/* Dot indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-card-hover"
            >
              <p className="text-xs font-semibold text-brand-charcoal-light uppercase tracking-wide">
                New Collection
              </p>
              <p className="font-serif text-lg font-bold text-brand-charcoal mt-0.5">
                Spring {new Date().getFullYear()}
              </p>
              <div className="flex -space-x-1 mt-2">
                {["#C0392B", "#D35400", "#E8967A", "#F0C8B0"].map((c) => (
                  <div
                    key={c}
                    className="w-5 h-5 rounded-full border-2 border-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="absolute top-6 -right-4 bg-brand-gradient text-white rounded-2xl px-4 py-3 shadow-brand-glow"
            >
              <p className="text-xs font-semibold">Free Styling</p>
              <p className="text-xs opacity-80">with every order</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}