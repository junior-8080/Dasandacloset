"use client";

import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

const SERVICES = [
  "Modest Clothing",
  "Bags & Jewelry",
  "Made-to-Fit",
  "Wholesale Deals",
  "Free Styling Tips",
];

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <p className="font-serif text-3xl font-bold brand-gradient-text">
                Dasanda
              </p>
              <p className="font-serif text-sm tracking-[0.25em] text-white/40 uppercase">
                Closet
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Promoting modesty and exuding power and confidence through
              clothing. Based in Ghana, dressing the globe.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-red text-sm font-semibold hover:text-brand-red-light transition-colors"
            >
              <Instagram size={16} />
              @dasandacloset
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-serif text-base font-bold mb-5 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/60 text-sm hover:text-brand-red transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-base font-bold mb-5 text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#shop"
                    className="text-white/60 text-sm hover:text-brand-red transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base font-bold mb-5 text-white">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-brand-red mt-0.5 shrink-0" />
                <a
                  href="mailto:dasandacloset87@gmail.com"
                  className="text-white/60 text-sm hover:text-brand-red transition-colors break-all"
                >
                  dasandacloset87@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-brand-red mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:+233203865161"
                    className="block text-white/60 text-sm hover:text-brand-red transition-colors"
                  >
                    020 386 5161
                  </a>
                  <a
                    href="tel:+233554078640"
                    className="block text-white/60 text-sm hover:text-brand-red transition-colors"
                  >
                    055 407 8640
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-red mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">Ghana, West Africa</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Dasanda Closet. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            Modesty · Quality · Loyalty · Creativity
          </p>
        </div>
      </div>
    </footer>
  );
}