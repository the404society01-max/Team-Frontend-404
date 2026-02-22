import { Link } from "react-router-dom";
import { UtensilsCrossed, Instagram, Facebook, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed className="h-6 w-6 text-accent" />
            <span className="font-display text-xl font-bold">Savoria</span>
          </div>
          <p className="text-background/60 text-sm leading-relaxed mb-5">
            Where every plate tells a story. Experience culinary artistry crafted with passion and the finest ingredients.
          </p>
          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[["Menu", "/menu"], ["Reservation", "/reservation"], ["Offers", "/offers"], ["Gallery", "/gallery"], ["Blog", "/blog"]].map(([label, href]) => (
              <li key={label}>
                <Link to={href} className="text-background/60 text-sm hover:text-accent transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-3">
            {[
              [MapPin, "123 Gourmet Lane, Foodville, CA 90210"],
              [Phone, "+1 (555) 234-5678"],
              [Mail, "hello@savoria.com"],
            ].map(([Icon, text], i) => (
              <li key={i} className="flex items-start gap-2 text-background/60 text-sm">
                <Icon className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                {text as string}
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-background/60">
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" />Mon–Fri: 11am – 10pm</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" />Saturday: 10am – 11pm</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-accent" />Sunday: 10am – 9pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-6 text-center text-background/40 text-xs">
        © 2026 Savoria. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
