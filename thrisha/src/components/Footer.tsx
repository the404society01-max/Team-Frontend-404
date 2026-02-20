const Footer = () => (
  <footer id="contact" className="py-16 px-6 md:px-12 bg-foreground text-primary-foreground">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <p className="font-display text-2xl font-semibold mb-4">Puls.</p>
          <p className="font-body font-light text-primary-foreground/70 max-w-sm leading-relaxed">
            Healthcare reimagined through warmth, empathy, and world-class medical expertise. Because you deserve to feel human.
          </p>
        </div>
        <div>
          <p className="font-body font-medium mb-4">Care</p>
          <div className="space-y-2">
            {["Find a Specialist", "Emergency Care", "Telehealth", "Second Opinion"].map((item) => (
              <a key={item} href="#" className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="font-body font-medium mb-4">Company</p>
          <div className="space-y-2">
            {["About Us", "Our Mission", "Careers", "Contact"].map((item) => (
              <a key={item} href="#" className="block font-body text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300">{item}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-sm text-primary-foreground/40">© 2026 Puls. All rights reserved.</p>
        <p className="font-body text-sm text-primary-foreground/40">Made with genuine care.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
