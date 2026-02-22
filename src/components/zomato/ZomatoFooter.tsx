import { MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  "About Zomato": ["Who We Are", "Blog", "Work With Us", "Investor Relations", "Report Fraud"],
  "Zomaverse": ["Zomato", "Blinkit", "Feeding India", "Hyperpure", "Zomaland"],
  "For Restaurants": ["Partner With Us", "Apps For You", "Restaurant Widgets"],
  "Learn More": ["Privacy", "Security", "Terms", "Sitemap"],
};

const ZomatoFooter = () => (
  <footer className="bg-secondary border-t border-border" aria-label="Footer">
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <span className="text-primary font-extrabold text-2xl">zomato</span>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Better food for more people.
          </p>
          <div className="flex gap-2 mt-4">
            {[Instagram, Facebook, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors" aria-label="Social link">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link Groups */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold text-foreground text-sm mb-3">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* App Download */}
      <div className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t border-border">
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-foreground rounded-lg flex items-center gap-2 cursor-pointer">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="white"/></svg>
            <div>
              <p className="text-[8px] leading-tight" style={{ color: 'rgba(255,255,255,0.7)' }}>Download on the</p>
              <p className="text-xs font-semibold" style={{ color: 'white' }}>App Store</p>
            </div>
          </div>
          <div className="px-4 py-2 bg-foreground rounded-lg flex items-center gap-2 cursor-pointer">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3.61 1.81L13.43 12 3.61 22.19c-.36-.35-.61-.84-.61-1.4V3.21c0-.56.25-1.06.61-1.4zm1.46-.46L16.43 8.2l-2.62 2.62L5.07 1.35zm11.37 6.85l2.88 1.67c.73.42.73 1.13 0 1.55l-2.88 1.67-2.89-2.89 2.89-2zm-3.35 3.35l-2.62 2.62L5.07 22.65l11.37-6.85-3.35-3.25z" fill="white"/></svg>
            <div>
              <p className="text-[8px] leading-tight" style={{ color: 'rgba(255,255,255,0.7)' }}>GET IT ON</p>
              <p className="text-xs font-semibold" style={{ color: 'white' }}>Google Play</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008-2026 © Zomato™ Ltd. All rights reserved.
      </div>
    </div>
  </footer>
);

export default ZomatoFooter;
