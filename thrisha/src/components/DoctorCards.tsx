import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const doctors = [
  {
    name: "Dr. Elena Vasquez",
    specialty: "Cardiology",
    tags: ["Heart Health", "Preventive Care", "Echocardiography"],
    quote: "Healing begins when a patient feels truly heard.",
    experience: 18,
    languages: ["🇺🇸 English", "🇪🇸 Spanish"],
    image: doctor1,
  },
  {
    name: "Dr. Arjun Patel",
    specialty: "Neurology",
    tags: ["Brain Health", "Sleep Medicine", "Migraine"],
    quote: "The brain is the universe — we've barely scratched the surface.",
    experience: 12,
    languages: ["🇺🇸 English", "🇮🇳 Hindi"],
    image: doctor2,
  },
  {
    name: "Dr. Amara Okafor",
    specialty: "Orthopedics",
    tags: ["Joint Care", "Sports Medicine", "Rehabilitation"],
    quote: "Movement is medicine. My job is to give it back.",
    experience: 22,
    languages: ["🇺🇸 English", "🇫🇷 French"],
    image: doctor3,
  },
  {
    name: "Dr. James Chen",
    specialty: "Dermatology",
    tags: ["Skin Health", "Cosmetic", "Pediatric Derm"],
    quote: "Confidence starts with how you feel in your own skin.",
    experience: 8,
    languages: ["🇺🇸 English", "🇨🇳 Mandarin"],
    image: doctor4,
  },
];

const DoctorCard = ({ doctor, index }: { doctor: typeof doctors[0]; index: number }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      className="group perspective-[1200px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div className="card-wellness p-0 overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="aspect-[3/4] overflow-hidden rounded-t-3xl">
            <img
              src={doctor.image}
              alt={`Portrait of ${doctor.name}`}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-lg font-semibold text-foreground">{doctor.name}</h3>
            <p className="font-body text-sm text-secondary uppercase tracking-wider mt-1">{doctor.specialty}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {doctor.tags.map((tag) => (
                <span key={tag} className="font-body text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-dot" />
              <span className="font-body text-xs text-secondary">Available Today</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-violet-teal text-primary-foreground p-8 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div>
            <p className="font-quote italic text-xl leading-relaxed opacity-90">"{doctor.quote}"</p>
            <p className="font-body text-sm mt-4 opacity-70">— {doctor.name}</p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <p className="font-body text-xs opacity-70">Experience</p>
                <div className="mt-1 h-1.5 rounded-full bg-primary-foreground/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary-foreground/80"
                    style={{ width: `${Math.min(doctor.experience / 25 * 100, 100)}%` }}
                  />
                </div>
                <p className="font-body text-xs mt-1 opacity-70">{doctor.experience} years</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {doctor.languages.map((lang) => (
                <span key={lang} className="font-body text-xs bg-primary-foreground/10 px-3 py-1 rounded-full">{lang}</span>
              ))}
            </div>
            <a
              href="#booking"
              className="block text-center font-body font-medium bg-surface text-primary py-3 rounded-full hover:shadow-soft transition-all duration-300"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DoctorCards = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="doctors" className="py-20 md:py-32 px-6 md:px-12" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Humans caring for <span className="italic text-primary">humans</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Every specialist was chosen not just for skill, but for heart.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, i) => (
            <DoctorCard key={doctor.name} doctor={doctor} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorCards;
