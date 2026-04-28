"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/lib/cart-context";

const DELIVERY = 50;

type FormData = {
  name: string;
  phone: string;
  location: string;
  notes: string;
};

const STEPS = ["Cart", "Delivery", "Confirm"];

// Slide direction: +1 = forward (left→right), -1 = back
function slideVariants(dir: number) {
  return {
    enter: { x: dir > 0 ? 48 : -48, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: dir > 0 ? -48 : 48, opacity: 0 },
  };
}

export default function CheckoutPage() {
  const { items, subtotal, remove, setQty, clear } = useCart();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [form, setForm] = useState<FormData>({ name: "", phone: "", location: "", notes: "" });
  const [loading, setLoading] = useState(false);

  const total = subtotal + (items.length > 0 ? DELIVERY : 0);

  function goTo(next: number) {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      clear();
      goTo(2);
    }, 1200);
  }

  // ── Step content ─────────────────────────────────────────────────────────

  const stepCart = (
    <div className="flex flex-col gap-6">
      <h2 className="font-serif text-xl font-bold text-brand-charcoal">Your Cart</h2>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-brand-charcoal-light">
          <ShoppingBag size={44} strokeWidth={1.2} />
          <p className="text-sm">Your cart is empty.</p>
          <Link href="/shop" className="text-sm font-medium text-brand-red underline underline-offset-2">
            Go shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm"
              >
                {/* Image */}
                <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-brand-cream-dark">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <p className="font-serif text-sm font-semibold text-brand-charcoal leading-snug">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-brand-charcoal-light mt-0.5">Size: {item.size}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Qty */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQty(item.product.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-brand-cream-dark flex items-center justify-center hover:bg-brand-cream transition-colors"
                      >
                        <Minus size={11} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.product.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-brand-cream-dark flex items-center justify-center hover:bg-brand-cream transition-colors"
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-brand-red">
                        GHS {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => remove(item.product.id, item.size)}
                        className="text-brand-charcoal-light hover:text-brand-red transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-2">
            <div className="flex justify-between text-sm text-brand-charcoal-light">
              <span>Subtotal</span><span>GHS {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-charcoal-light">
              <span>Delivery</span><span>GHS {DELIVERY}</span>
            </div>
            <div className="flex justify-between font-serif text-lg font-bold text-brand-charcoal border-t border-brand-cream-dark pt-2 mt-1">
              <span>Total</span><span>GHS {total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => goTo(1)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-gradient text-white font-semibold shadow-brand-glow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Continue to Delivery <ArrowRight size={16} />
          </button>
        </>
      )}
    </div>
  );

  const stepDelivery = (
    <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
      <h2 className="font-serif text-xl font-bold text-brand-charcoal">Delivery Details</h2>

      {/* Cart mini-summary */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
        {items.map((item) => (
          <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
            <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0 bg-brand-cream-dark">
              <Image src={item.product.image} alt={item.product.name} fill sizes="40px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-brand-charcoal line-clamp-1">{item.product.name}</p>
              <p className="text-xs text-brand-charcoal-light">Size: {item.size} · Qty: {item.quantity}</p>
            </div>
            <span className="text-xs font-semibold text-brand-red shrink-0">
              GHS {(item.product.price * item.quantity).toLocaleString()}
            </span>
          </div>
        ))}
        <div className="flex justify-between font-serif font-bold text-brand-charcoal border-t border-brand-cream-dark pt-2 text-sm">
          <span>Total</span><span>GHS {total.toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest">Full Name *</label>
            <input
              required name="name" value={form.name} onChange={handleChange}
              placeholder="Amina Mensah"
              className="border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-charcoal-light/50 focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest">Phone Number *</label>
            <input
              required name="phone" value={form.phone} onChange={handleChange}
              placeholder="0XX XXX XXXX"
              className="border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-charcoal-light/50 focus:outline-none focus:border-brand-red transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest">Delivery Location *</label>
          <input
            required name="location" value={form.location} onChange={handleChange}
            placeholder="e.g. East Legon, Accra"
            className="border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-charcoal-light/50 focus:outline-none focus:border-brand-red transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest">Order Notes</label>
          <textarea
            name="notes" value={form.notes} onChange={handleChange} rows={3}
            placeholder="Special instructions, measurements, or requests…"
            className="border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-charcoal placeholder:text-brand-charcoal-light/50 focus:outline-none focus:border-brand-red transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button" onClick={() => goTo(0)}
          className="flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-brand-cream-dark text-sm font-medium text-brand-charcoal hover:bg-brand-cream transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <button
          type="submit" disabled={loading}
          className="flex-1 py-3.5 rounded-full bg-brand-gradient text-white font-semibold shadow-brand-glow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order…" : "Place Order"}
        </button>
      </div>
    </form>
  );

  const stepConfirm = (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex flex-col items-center text-center gap-6 py-10"
    >
      <CheckCircle size={72} className="text-green-500" strokeWidth={1.3} />
      <div>
        <h2 className="font-serif text-3xl font-bold text-brand-charcoal mb-2">Order Received!</h2>
        <p className="text-brand-charcoal-light max-w-sm leading-relaxed">
          Thank you, <strong>{form.name}</strong>. We&apos;ll reach out to{" "}
          <strong>{form.phone}</strong> to confirm your delivery details.
        </p>
      </div>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-3.5 rounded-full shadow-brand-glow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        Continue Shopping
      </Link>
    </motion.div>
  );

  const panels = [stepCart, stepDelivery, stepConfirm];

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-28 pb-16">
        {/* Back to shop */}
        {step < 2 && (
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-brand-charcoal-light hover:text-brand-red transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        )}

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-brand-red text-white"
                      : "bg-brand-cream-dark text-brand-charcoal-light"
                  }`}
                >
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    i === step ? "text-brand-charcoal" : "text-brand-charcoal-light"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-colors duration-500 ${
                    i < step ? "bg-green-500" : "bg-brand-cream-dark"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Animated step panel */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants(dir)}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {panels[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </>
  );
}