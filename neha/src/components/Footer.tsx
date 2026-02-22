const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif text-lg text-foreground">Serene Journeys</p>
          <div className="flex gap-8">
            {["Destinations", "Packages", "Services", "Philosophy", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 Serene Journeys
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
