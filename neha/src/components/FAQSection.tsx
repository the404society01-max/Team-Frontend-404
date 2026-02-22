import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I book a trip with Serene Journeys?",
    a: "Simply fill out our contact form or reach out via email. Our travel consultants will work with you to understand your preferences and craft a personalized itinerary. There's no obligation until you confirm your booking.",
  },
  {
    q: "What's included in the package prices?",
    a: "Our packages typically include accommodation, guided experiences, local transfers, and select meals. International flights are usually separate. Every package page details exactly what's included — no hidden costs.",
  },
  {
    q: "Can I customize a package?",
    a: "Absolutely. Every journey can be tailored to your preferences. Want to extend your stay, add a side trip, or upgrade your accommodation? Our team will adjust the itinerary to match your vision.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We offer flexible cancellation up to 30 days before departure for a full refund. Cancellations between 15–30 days receive a 50% refund. Within 15 days, we offer a credit towards a future trip. Travel insurance is strongly recommended.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes! Groups of 4 or more receive a 10% discount on most packages. For groups of 10+, we can create entirely custom itineraries with special pricing. Contact us for a personalized quote.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking 2–3 months in advance for the best availability, especially during peak seasons. However, we occasionally have last-minute deals for spontaneous travelers.",
  },
  {
    q: "Do you provide visa assistance?",
    a: "Yes, we offer comprehensive visa assistance for all our international destinations. Our team helps with documentation, application review, and fast-track processing for over 100 countries.",
  },
  {
    q: "Is travel insurance included?",
    a: "Travel insurance is not included by default but is highly recommended. We partner with leading insurance providers to offer comprehensive coverage including medical emergencies, trip cancellation, and adventure sports.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Common questions</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Everything you need to know before embarking on your journey.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-foreground/20 transition-colors"
              >
                <AccordionTrigger className="text-left font-serif text-foreground hover:no-underline py-5 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
